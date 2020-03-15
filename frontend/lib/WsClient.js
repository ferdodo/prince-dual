export default class WsClient{
	constructor(){
		var socket = this.socket = new WebSocket(`${window.location.origin.replace(/.+:\/\//, "ws://")}/`);
		var listeners = this.listeners = {};
		var closeListeners = this.closeListeners = [];

		this.connected = new Promise(function(resolve, reject){		
			socket.onerror = reject;

			socket.onopen = function(){

				this.onmessage = function(event){
					var {message, content} = JSON.parse(event.data); 

					if (listeners.hasOwnProperty(message)){
						listeners[message](content);
					} else {
						throw new Error("No listener for this message: "+message);
					}
				};

				this.onclose = function(event) {
					console.log("Connexion terminé.");
					closeListeners.forEach(executor=>executor());
				};

				resolve();
			}
		})
	}

	on(handler, executor){
		this.listeners[handler] = executor;
	}

	onClose(executor){
		this.closeListeners.push(executor);
	}

	send(message, content){
		var socket = this.socket;

		this.connected.then(function(){
			socket.send(JSON.stringify({message, content}));
		});
	}
}