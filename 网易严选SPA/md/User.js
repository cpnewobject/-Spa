//引入用户中心的scss文件
import "./../scss/user.scss";

import Login from "./Login";
import Register from "./Register";
//
var User = {
	loadHeaderFn(){
		console.log("加载User头部");
		$("#header").load("./views/user.html #userHeader");
	},
	loadContentFn(){
		console.log("加载User内容区域");
		$("#content").load("./views/user.html #userContent",function(){
			$("#logout").on('tap', function() {
				localStorage.setItem("isLogin","0");
				Login.loadHeaderFn();
				Login.loadContentFn();
			});
		});
	}
};

export default User;