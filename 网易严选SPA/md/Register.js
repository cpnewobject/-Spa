import "./../scss/register.scss";
import "./../scss/common.scss";

import Login from "./Login";
import Home from "./Home";
import Kind from "./Kind";
import Toast from "./Toast";
import MyAjax from "./MyAjax";

var Register = {
	loadHeaderFn(a){
		console.log('加载头部');
		console.log(a);
		$("#header").load("./views/register.html #registerHeader",function(){
			$("#back").on('tap',function() {
				switch (a) {
					case "Login":
						Login.loadHeaderFn();
						Login.loadContentFn();
						break;
					case "Home":
						Home.loadHeaderFn();
						Home.loadContentFn();
						Home.loadListDate();
						break;
					case "Kind":
						Kind.loadHeaderFn();
						Kind.loadContentFn();
						break;
				}
			});
		});
	},
	loadContentFn(){
		console.log('加载内容');
		$("#content").load("./views/register.html #registerContent",function(){
			var $userID = $("#userID");
			var $password = $("#password");
			$("#registerBtn").on('tap',function(){
				var userID = $userID.val();
				var password = $password.val();
				 var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
				console.log(userID);
				console.log(password);
				//正则验证
				if (userID == "" || password == "") {
					Toast.makeText("用户名和密码不能为空！",2000)
				}else if (!reg.test(userID)) {
					Toast.makeText("请输入正确的邮箱格式！",2000)
				}else{
					$("#registerBtn").attr("disabled","disabled");
					$("#registerBtn").val("正在注册...");
					var url = "http://datainfo.duapp.com/shopdata/userinfo.php?status=register&userID="+userID+"&password="+password;

					MyAjax.fetch(url,function(data){
						console.log(data);

						$("#registerBtn").removeAttr("disabled");
						$("#registerBtn").val("注册");

						switch (data) {
							case 0:
								Toast.makeText("该用户已存在",2000);
								break;
							case 1:
								Toast.makeText("注册成功",3000);
								setTimeout(function(){
									Login.loadHeaderFn("register");
									Login.loadContentFn("register",userID);
								},3000)
								break;
							case 2:
								Toast.makeText("注册失败，请重新注册",2000);
								break;
						}
						$userID.val("");
						$password.val("");
					},function (err) {
						$("#registerBtn").removeAttr("disabled");
						$("#registerBtn").val("注册");
						console.log(err);
					})
				}
			})
		});
	}
};

export default Register;