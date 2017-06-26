import "./../scss/kind.scss";
import MyAjax from "./MyAjax";
//定义了分类模块
var Kind = {
	loadHeaderFn(){
		console.log("加载Kind头部");
		$("#header").load("./views/kind.html #kindHeader");
	},
	loadContentFn(){
		console.log("加载Kind内容区域");
		$("#content").load("./views/kind.html #kindContent",function(){
			var url = "http://datainfo.duapp.com/shopdata/getclass.php";
			MyAjax.fetch(url,function(data){
				for(var item of data){
					$("#classlist").append('<li>'+item.className+'</li>');
				}
			},function (err) {
				console.log(err);
			});
		});
	}
};

export default Kind;