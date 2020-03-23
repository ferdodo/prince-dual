var expressWs = require('express-ws');


class WsServer{

	constructor(app){
		this.webSocketServer = expressWs(app).getWss();
		app.ws("/", handleWsReception(this));
		this.handlers = {};
	}

	broadcast(message, content){
		this.webSocketServer.clients.forEach(function(client) {
			client.send(JSON.stringify({message, content}));
		});
	}

	on(message, executor){
		this.handlers[message] = executor;
	}
}



function handleWsReception(WsServer){
	return function middleware(ws, req){
		ws.on('message', function(msg){
			var {message, content} = JSON.parse(msg);
			var connection = ws;
			console.log("ws received "+message);

			if(WsServer.handlers.hasOwnProperty(message)){
				WsServer.handlers[message]({content, connection});	
			} else {
				throw new Error("No handler for this message !");
			}
		});
	}
}


module.exports = WsServer;