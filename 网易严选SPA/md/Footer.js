import Home from "./Home";
import Kind from "./Kind";
import Cart from "./Cart";
import User from "./User";
import Topic from "./Topic";
import Register from "./Register";
import Login from "./Login";

var Footer = {
	loadFooterFn(activeIndex){
			$("#footer").load("views/footer.html",function(){
			$("#tabBar").find('li').eq(activeIndex).addClass("active").siblings().removeClass("active");
			$("#tabBar").find('li').on("tap",function(){
				var index = $(this).index();
				$(this).addClass('active').siblings().removeClass('active');
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
						Cart.loadHeaderFn();
						Cart.loadContentFn();
						break;
					case 4:
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

export default Footer;