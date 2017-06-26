import Home from "./Home";
import Kind from "./Kind";
import Cart from "./Cart";
import Topic from "./Topic";
import User from "./User";
import Login from "./Login";
import "./../scss/header.scss";

var Header = {
	loadheaderFn(){
		console.log('header11');
		var flag = true;
		$("#header").load("./views/header.html #t-Tabbar",function(){
			$("#dropdownBtn").on('tap',function(){
				console.log('下拉菜单！');
				if(flag){
					$("#dropdown").addClass('dropdown-show');
					flag = false;
				}else{
					$("#dropdown").removeClass('dropdown-show');
					flag = true;
				}
			});
			$("#dropdown").find('li').on('tap',function(){
				var index = $(this).index();
				console.log(index);
				switch (index) {
					case 0:
						Home.loadHeaderFn();
						Home.loadContentFn();
						Home.loadListDate();
						break;
					case 1:
						Topic.loadHeaderFn();
						Topic.loadContentFn();
						break;
					case 2:
						Kind.loadHeaderFn();
						Kind.loadContentFn()
						break;
					case 3:
						if (localStorage.getItem("isLogin") == "1") {
						User.loadHeaderFn();
						User.loadContentFn()
					}else {
						Login.loadHeaderFn();
						Login.loadContentFn();
					}
						break;
					default:
						break;
				}
			});
		});
	}
}

export default Header;