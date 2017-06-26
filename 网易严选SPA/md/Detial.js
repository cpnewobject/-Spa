//定义了Detial模块
import Home from "./Home";
import Kind from "./Kind";
import Footer from "./Footer";
import Register from "./Register";

import MyAjax from "./MyAjax";

var Detial = {
	loadHeaderFn(a){
		console.log("加载Detial头部");
		Register.loadHeaderFn(a);
	},

	loadContentFn(goodsID){
		console.log("加载Detial内容区域");
		$("#content").load("./views/detial.html #detailContent",function(){
			var url = "http://datainfo.duapp.com/shopdata/getGoods.php?goodsID="+goodsID;
			MyAjax.fetchJsonp(url,function(data){
				console.log(data)
				$("#img").attr("src",data[0].goodsListImg);
				$("#name").html(data[0].goodsName);
			},function (err) {
				console.log(err);
			})
		})
	}
};

export default Detial;