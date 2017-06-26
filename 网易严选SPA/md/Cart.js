import "./../scss/cart.scss";
import Home from "./Home";
import Footer from "./Footer";
import Login from "./Login";
import MyAjax from "./MyAjax";
import Toast from "./Toast";
var Cart = {
	loadHeaderFn(){
		console.log('加载Cart头部');
		$("#header").load("./views/cart.html #cartHeader");
	},
	loadContentFn(){
		console.log('加载Cart区域');
		$("#content").load("./views/cart.html #cartContent",function(){


			if (localStorage.getItem("isLogin") == "0") {
				Login.loadHeaderFn();
				Login.loadContentFn("cart");
			}else{
				var url = "http://datainfo.duapp.com/shopdata/getCar.php?userID="+localStorage.getItem("userID");
				MyAjax.fetchJsonp(url,function (data) {
					console.log(data);
					if (data == "0") {
						$("#noshop").show();
						$("#shops").hide();
					}else{
						$("#noshop").hide();
						$("#shops").show();
						var TotalPrice = 0;
						for(var item of data){
							$("#shops").append('<li id="item'+item.goodsID+'">'+
								'<img src="'+item.goodsListImg+'" style="width: 60px;height: 60px;"/>'+
								'<p class="goodsname">'+item.goodsName+'￥'+item.price+'</p>'+
								'<button class="reduceNum" price="'+item.price+'" goodsID="'+item.goodsID+'">-</button>'+
								'<input type="text" readonly name="num" id="num'+item.goodsID+'" value="'+item.number+'" />'+
								'<button class="addNum" goodsID="'+item.goodsID+'" price="'+item.price+'">+</button><button class="deleteItem" price="'+item.price+'" goodsID="'+item.goodsID+'">删除</button>'+
							'</li>')
							TotalPrice += item.number * item.price;
						}

						$("#total").html("￥"+TotalPrice)


						$(".reduceNum").on("tap",function(){
							var goodsID = $(this).attr("goodsID");
							var price = $(this).attr("price");
							changeNum('reduce',goodsID,price);
						})
						$(".addNum").on("tap",function(){
							var goodsID = $(this).attr("goodsID");
							var price = $(this).attr("price");
							changeNum('add',goodsID,price);
						})
						$(".deleteItem").on("tap",function(){
							var goodsID = $(this).attr("goodsID");
							var price = $(this).attr("price");
							deleteItem(goodsID,price);
						})
						function deleteItem(goodsID,price){
							var deleteUrl = "http://datainfo.duapp.com/shopdata/updatecar.php?userID="+localStorage.getItem("userID")+"&goodsID="+goodsID+"&number=0";
							MyAjax.fetch(deleteUrl,function(data){
								console.log(data)
								if(data == 0){
									Toast.makeText("删除失败",500);
								}else{
									Toast.makeText("删除成功",500);
									//更改总价
									var deleteprice = $("#num"+goodsID).val() * 1 * (price * 1);
									console.log("deleteprice",$("#num"+goodsID).val())
									TotalPrice = TotalPrice - deleteprice;
									$("#total").html(TotalPrice);
									$("#item"+goodsID).remove();
									//注意判断还有没有数据，如果没有了，就显示空空如也
									MyAjax.fetchJsonp(url,function(data){
										if(data == "0"){
											$("#noshop").show();
											$("#shops").hide();
										}
									},function(err){
										console.log(err)
									})
								}
							},function(err){
								console.log(err)
							})
						}

						function changeNum(type,goodsID,price){
							var num = $("#num"+goodsID).val();
							console.log(goodsID+"-----"+num)
							if(type == 'reduce'){
								if(num == 1){
									Toast.makeText("数量不能少于1",1500);
								}else{
									num = num - 1;
									$("#num"+goodsID).val(num);
									//总价减去一个产品的价格
									TotalPrice = TotalPrice - price;
									$("#total").html("￥" + TotalPrice)
								}
							}else{
								num = num - (-1);
								$("#num"+goodsID).val(num);
								//总价增加一个产品的价格
								TotalPrice = TotalPrice - (-price);
								$("#total").html("￥" + TotalPrice)
							}

							var cartUrl = "http://datainfo.duapp.com/shopdata/updatecar.php?userID="+localStorage.getItem("userID")+"&goodsID="+goodsID+"&number="+num;
							MyAjax.fetch(cartUrl,function(data){
								console.log(data)
								if(data == 0){
									Toast.makeText("更新失败",500);
								}else{
									Toast.makeText("更新成功",500);
								}
							},function(err){
								console.log(err)
							})
					}
				}
			},function (err) {
				console.log(err)
			})
		}
		});
	}
}
export default Cart;