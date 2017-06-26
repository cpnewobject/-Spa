import "./../scss/login.scss";
import Register from "./Register";
import Header from "./Header";
import User from "./User";
import Toast from "./Toast";
import MyAjax from "./MyAjax";

var Login = {
	loadHeaderFn(){
		console.log('加载Login头部');
		Header.loadheaderFn();
	},
	loadContentFn(type,userID){
		console.log('加载Login内容');
		$("#content").load("./views/login.html #loginContent",function() {
			//加载注册组件
			$("#goToregister").on('click',function(){
				console.log('1');
				Register.loadHeaderFn("Login");
				Register.loadContentFn();
			});

			var $userID = $("#userID");
			var $password = $("#password");
			var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

			$userID.val(userID);
			$("#loginBtn").on('tap',function() {
				var userID = $userID.val();
				var password = $password.val();
				if(userID == "" || password == ""){
					Toast.makeText("用户名或者密码不能为空",2000);
				}else if (!reg.test(userID)) {
					Toast.makeText("请输入正确的邮箱格式！",2000)
				}else {
					var url = "http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID="+userID+"&password="+password;
					$("#loginBtn").attr("disabled","disabled");
					$("#loginBtn").val("正在登录...");

					MyAjax.fetch(url,function (data) {
						console.log(data);
						$("#loginBtn").removeAttr("disabled");
						$("#loginBtn").val("登录");

						if (data == 0) {
							Toast.makeText("用户名不存在",2000);
						}else if (data == 2) {
							Toast.makeText("密码错误",2000);
						}else {
							localStorage.setItem("userID",userID);
							localStorage.setItem("isLogin","1");
							// else if () {
							User.loadHeaderFn();
							User.loadContentFn()
							// }
							Toast.makeText("登录成功",2000);
						}
					},function(err) {
						console.log(err);
						$("#loginBtn").removeAttr("disabled");
						$("#loginBtn").val("登录");
					})
				}
			});
		});
	}
};

export default Login;