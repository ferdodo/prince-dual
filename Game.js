const EventEmitter = require('events');
const mutexify = require('mutexify');

const gameStates = {
	"waitPlayerA": Symbol(),
	"waitPlayerB": Symbol(),
	"matte": Symbol(),
	"hajime": Symbol()
}

class Game{
	constructor(app, webSocketServer, player){
		this.state = gameStates.waitPlayerA;
		this.playerA = undefined;
		this.playerB = undefined;
		this.stateLock = mutexify();
		this.matteTimeout = undefined;
		this.webSocketServer = webSocketServer;
		this.eventEmitter = new EventEmitter();
		app.ws("/", handleWsReception(this.eventEmitter));
		this.eventEmitter.on("player-connect", handlePlayerConnect(this, player));
		this.eventEmitter.on("player-hit", handlePlayerHit(this, player));
	}

	reset(){
		this.state = gameStates.waitPlayerA;
		this.playerA = undefined;
		this.playerB = undefined;
	}

	aWins(){
		wsBroadcast(this, "fight-result", {"winner": this.playerA, "loser": this.playerB});
		this.reset();
	}

	bWins(){
		wsBroadcast(this, "fight-result", {"winner": this.playerB, "loser": this.playerA});
		this.reset();
	}

	matte(){
		this.state = gameStates.matte;
		var content = {"playerA": this.playerA, "playerB": this.playerB};
		wsBroadcast(this, "matte", content);
		var timeoutMs = Math.random() * 4000 + 2000;
		this.matteTimeout = setTimeout(this.hajime.bind(this), timeoutMs); 
	}


	hajime(){
		this.state = gameStates.hajime;
		var content = {"playerA": this.playerA, "playerB": this.playerA};
		wsBroadcast(this, "hajime", content);
	}
}


function wsBroadcast(game, message, content){
	console.log("ws sent "+message);

	game.webSocketServer.clients.forEach(function(client) {
		client.send(JSON.stringify({message, content}));
	});
}


function handlePlayerConnect(game, player){
	return function({content: playerJwt, connection}){
		game.stateLock(function(release){
			try{
				switch(game.state){
					case gameStates.waitPlayerA:
						game.playerA = player.verify(playerJwt);
						connection.on('error', handleDisconnection(game));
						connection.on('close', handleDisconnection(game));
						game.state = gameStates.waitPlayerB;
						console.log("Player A is connected", game.playerA.name);
						break;
					case gameStates.waitPlayerB:
						var connectingPlayer = player.verify(playerJwt);
						if (connectingPlayer.id == game.playerA.id) throw new Error("This player is already connected !");
						game.playerB = connectingPlayer;
						connection.on('error', handleDisconnection(game));
						connection.on('close', handleDisconnection(game));
						console.log("Player B is connected", game.playerB.name);
						game.matte();
						break;

					default: throw new Error("Game is not waiting for players !");
				}
				
				release();
			} catch(error){
				console.error(error);
				release();
			}
		})
	}
}



function handlePlayerHit(game, player){
	return function({content: playerJwt}){
		game.stateLock(function(release){
			try{
				var hittingPlayer = player.verify(playerJwt);

				switch(game.state){
					case gameStates.matte:
						if (hittingPlayer.id == game.playerA.id){
							game.bWins();
							clearTimeout(this.matteTimeout);
						} else if (hittingPlayer.id == game.playerB.id){
							game.aWins();
							clearTimeout(this.matteTimeout);
						} else {
							throw new Error("Unknown player hit !");
						}
						break;

					case gameStates.hajime:						
						if (hittingPlayer.id == game.playerA.id){
							game.aWins();
						} else if (hittingPlayer.id == game.playerB.id){
							game.bWins();
						} else {
							throw new Error("Unknown player hit !");
						}
						break;

					default: throw new Error("Game is not waiting for player hits !");
				}
				
				release();
			} catch(error){
				console.error(error);
				release();
			}
		})
	}
}

function handleWsReception(eventEmitter){
	return function(ws, req){
		ws.on('message', function(msg){
			var {message, content} = JSON.parse(msg);
			var connection = ws;
			console.log("ws received "+message);

			switch(String(message)){
				case "player-connect": eventEmitter.emit("player-connect", {content, connection}); break;
				case "player-hit": eventEmitter.emit("player-hit", {content, connection}); break;
				default: throw new Error("Unknown message type.");
			}			
		});
	}
}


function handleDisconnection(game){
	return function(){
		game.stateLock(function(release){
			try{
				wsBroadcast(game, "player-disconnected", "");
				game.reset();
				release();
			} catch(error){
				console.error(error);
				release();
			}
		});
	}
}

module.exports = Game;