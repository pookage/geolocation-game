const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './client/index.html',
	filename: 'index.html',
	inject: 'body'
})

module.exports = {
	entry: [
		"babel-polyfill",
		'./client/index.js'
	],
	output: {
		path: './dist',
		filename: 'index_bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
			{
				test: /\.css$/,
				loader: 'style-loader',
				exclude: /node_modules/
			}, {
				test: /\.css$/,
				loader: 'css-loader',
				query: {
					modules: true,
					localIdentName: '[name]__[local]___[hash:base64:5]'
				},
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		root: [
			path.resolve("./client"),
			path.resolve("./node_modules")
		]
	},
	plugins: [HtmlWebpackPluginConfig]
}
