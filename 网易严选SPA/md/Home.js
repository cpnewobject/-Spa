import "./../scss/home.scss";

import MyAjax from "./MyAjax";
import Detial from "./Detial";
import Login from "./Login";
import Toast from "./Toast";


var Home = {
	loadHeaderFn(){
		console.log('加载首页头部');
		$("#header").load("./views/home.html #homeHeader");
	},
	loadContentFn(){
		console.log('加载内容区域');
		$("#content").load("./views/home.html #homeContent",function(){
			//数据接口地址
			var bannerUrl = "http://datainfo.duapp.com/shopdata/getBanner.php";
			//请求数据
			//加载中显示
			MyAjax.fetchJsonp(bannerUrl,function(data){
				console.log(data);
				for(var item of data){
					var imgSrc = JSON.parse(item.goodsBenUrl)[0];
					$("#homeBanner").append('<div class="swiper-slide">'+
			        	'<img src="'+imgSrc+'" alt="" />'+
			        '</div>')
				}
				var mySwiper = new Swiper(".swiper-container",{
					pagination:".swiper-pagination",
					loop:true,
					autoplay:3000,
					autoplayDisableOnInteraction:false
			});
			},function(err){
				console.log(err);
			})
		});
	},

	loadListDate(){
		var url = "http://datainfo.duapp.com/shopdata/getGoods.php";
		MyAjax.fetchJsonp(url,function(data){
			console.log(data);

			//循环遍历
			for(var item of data){
				$("#proList").append('<li class="proItem" goodsID="'+item.goodsID+'">'+
			'<a href="#">'+
				'<div class="hd">'+
					'<div class="proimg">'+
						'<img src="'+item.goodsListImg+'">'+
					'</div>'+
				'</div>'+
				'<div class="bt">'+
					'<p class="proName">'+
						item.goodsName +
					'</p>'+
					'<span class="price">'+
						'￥'+item.price +
					'</span>'+
					'<button class="addCart" goodsID = "'+item.goodsID+'">加入购物车</button>'+
				'</div>'+
			'</a>'+
		'</li>');
			}

			$(".addCart").on("tap",function (event) {
				event.stopPropagation();
				var goodsID = $(this).attr("goodsID");
				console.log(goodsID);


				if (localStorage.getItem("isLogin") == "0") {
					Login.loadHeaderFn("index");
					Login.loadContentFn("index");
				}else{
					var userID = localStorage.getItem("userID");
					var url = "http://datainfo.duapp.com/shopdata/updatecar.php?userID="+userID+"&goodsID="+goodsID+"&number=1";
					$(this).html("正在加入购物车");
					console.log(data);
					var $that = $(this);
					MyAjax.fetch(url,function (data) {
						$that.html("加入购物车")
						console.log(data);
						if (data == "0"){
							Toast.makeText("加入购物车失败",1500);
						}else{
							Toast.makeText("加入购物车成功",500);
						}
					},function (err) {
						console.log(err);
					})
				}
				});

			$(".proItem").on("tap",function(){
				var goodsID = $(this).attr("goodsID");
				console.log(goodsID);
				Detial.loadHeaderFn("Home");
				Detial.loadContentFn(goodsID);
			})
			},function (err) {
				console.log(err);
			});
		},
};
export default Home;