export default class WsClient{
	constructor(){
		var socket = this.socket = new WebSocket(`${window.location.origin.replace(/.+:\/\//, "ws://")}/`);
		var listeners = this.listeners = {};

		this.connected = new Promise(function(resolve, reject){		
			socket.onopen = function(){

				this.onmessage = function(event){
					var {message, content} = JSON.parse(event.data);

					if (listeners.hasOwnProperty(message)){
						listeners[message](content);
					} else {
						throw new Error("No listener for this message: "+message);
					}
				};

				resolve();
			}
		})
	}

	on(handler, executor){
		this.listeners[handler] = executor;
	}

	send(message, content){
		var socket = this.socket;

		this.connected.then(function(){
			socket.send(JSON.stringify({message, content}));
		});
	}
}