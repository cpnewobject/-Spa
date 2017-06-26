//定义了专题模块
var Topic = {
	loadHeaderFn(){
		console.log("加载Topic头部");
		$("#header").load("./views/topic.html #topicHeader");
	},
	loadContentFn(){
		console.log("加载Topic内容区域");
		$("#content").load("./views/topic.html #topicContent");
	}
};

export default Topic;