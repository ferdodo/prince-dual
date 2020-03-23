var express = require("express");
var Game = require('./lib/Game.js');
var Player = require('./lib/Player.js');
var WsServer = require('./lib/WsServer.js');

(async function main(){
	try{
		await new Promise(function startServer(resolve, reject){
			var app = express();
			app.use(express.static('dist'));
			var wsServer = new WsServer(app);
			var player = new Player(app);
			var game = new Game(app, wsServer, player);
			app.listen(3000, resolve).on("error", reject);
		});

		console.log("Server started.");

	}catch(error){
		console.error(error);
		process.exit(-1);
	}
})();