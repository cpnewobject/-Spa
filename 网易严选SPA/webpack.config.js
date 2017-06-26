module.exports = {
	entry:"./app.js",//入口文件
	output:{//输出目录及文件
		path:__dirname,
		filename:"bundle.js"
	},
	devtool:"source-map",//调试工具
	module:{
		loaders:[
		//如果项目中没有使用es6，不需要加载这个loader
			{
				test:/\.js$/,
				loader:"babel-loader",
				query: {
			        presets: ['es2015']
			    }
			},
			{
				test:/\.scss$/,
				loader:"style-loader!css-loader!sass-loader"
			},
			{
				test:/\.(jpg|png|gif)$/,
				loader:"url-loader?limit=102400"
			},
			{
				test:/\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
				loader:'file-loader?name=[name].[ext]'
			}
		]
	}
}
