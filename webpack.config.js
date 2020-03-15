var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	"mode" : "development",
	"entry"  : './frontend/index.js',
	"output" : {
		"path"     : __dirname + "/dist",
		"filename" : "bundle.js"
	},
	"plugins": [new HtmlWebpackPlugin({"title":"Prince Duals"})],
	"module" : {
		"rules" : [{
			"test" : /\.css$/,
			"use"  : ['style-loader', 'css-loader']
		},{
			"test"   : /\.(png|gif|woff|woff2|eot|ttf|svg)$/,
			"loader" : 'url-loader?limit=100000' 
		},{
			"test" : /\.html$/,
			"use" : ['raw-loader']
		}]
	}, 
	"resolve": {
		"alias": {
		  'vue$': 'vue/dist/vue.esm.js'
		}
	}
};