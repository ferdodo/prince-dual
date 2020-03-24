const EventEmitter = require('events');

const gameStates = {
	"waitPlayerA": Symbol(),
	"waitPlayerB": Symbol(),
	"matte": Symbol(),
	"hajime": Symbol()
}

class Game{
	constructor(wsServer, player){
		this.state = gameStates.waitPlayerA;
		this.playerA = undefined;
		this.playerB = undefined;
		this.matteTimeout = undefined;
		this.wsServer = wsServer;
		this.wsServer.on("player-connect", handlePlayerConnect(this, player));
		this.wsServer.on("player-hit", handlePlayerHit(this, player));
	}

	reset(){
		if (this.matteTimeout) clearTimeout(this.matteTimeout);
		this.state = gameStates.waitPlayerA;
		this.playerA = undefined;
		this.playerB = undefined;
	}

	aWins(){
		this.wsServer.broadcast("fight-result", {"winner": this.playerA});
		this.reset();
	}

	bWins(){
		this.wsServer.broadcast("fight-result", {"winner": this.playerB});
		this.reset();
	}

	matte(){
		this.state = gameStates.matte;
		var content = {"playerA": this.playerA, "playerB": this.playerB};
		this.wsServer.broadcast("matte", content);
		var timeoutMs = Math.random() * 4000 + 2000;
		this.matteTimeout = setTimeout(this.hajime.bind(this), timeoutMs); 
	}


	hajime(){
		this.state = gameStates.hajime;
		var content = {"playerA": this.playerA, "playerB": this.playerA};
		this.wsServer.broadcast("hajime", content);
	}
}




function handlePlayerConnect(game, player){
	return function({content: playerJwt, connection}){
		switch(game.state){
			case gameStates.waitPlayerA:
				game.playerA = player.verify(playerJwt);
				connection.on('error', handleDisconnection(game));
				connection.on('close', handleDisconnection(game));
				game.state = gameStates.waitPlayerB;
				break;
			case gameStates.waitPlayerB:
				var connectingPlayer = player.verify(playerJwt);
				if (connectingPlayer.id == game.playerA.id) break;	
				game.playerB = connectingPlayer;
				connection.on('error', handleDisconnection(game));
				connection.on('close', handleDisconnection(game));
				game.matte();
				break;

		}
	}
}



function handlePlayerHit(game, player){
	return function({content: playerJwt}){
		var hittingPlayer = player.verify(playerJwt);

		switch(game.state){
			case gameStates.matte:
				if (hittingPlayer.id == game.playerA.id){
					game.bWins();
					clearTimeout(this.matteTimeout);
				} else if (hittingPlayer.id == game.playerB.id){
					game.aWins();
					clearTimeout(this.matteTimeout);
				}
				break;

			case gameStates.hajime:						
				if (hittingPlayer.id == game.playerA.id){
					game.aWins();
				} else if (hittingPlayer.id == game.playerB.id){
					game.bWins();
				}
				break;
		}
	}
}



function handleDisconnection(game){
	return function(){
		game.wsServer.broadcast("player-disconnected", "");
		game.reset();
	}
}

module.exports = Game;