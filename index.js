var express = require("express");
var bodyParser = require("body-parser");
var Game = require('./Game.js');
var Player = require('./Player.js');
var morgan = require("morgan");
var expressWs = require('express-ws');

(async function main(){
	try{
		await new Promise(function startServer(resolve, reject){
			var app = express();
			app.use(express.static('dist'));
			var webSocketServer = expressWs(app).getWss();
			app.use(morgan("tiny"));
			app.use(bodyParser.json());
			var player = new Player(app, webSocketServer);
			var game = new Game(app, webSocketServer, player);
			app.listen(3000, resolve).on("error", reject);
		});

		console.log("Server started.");

	}catch(error){
		console.error(error);
		process.exit(-1);
	}
})();