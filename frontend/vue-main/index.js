import Vue from "vue";
import style from "./style.css";
import template from "./template.html";
import axios from "axios";
import jwtDecode from "jwt-decode";
import WsClient from "../lib/WsClient.js";

var div = document.createElement('div');
div.id = "app";
document.body.appendChild(div); 

new Vue({
	"el": "#app", 
	mounted,
	template,
	data,
	"methods":{
		connect,
		hit,
		reset
	}
});


function data(){
	return {
		"playerToken" : undefined,
		"player" : undefined,
		"showTitle" : true,
		"showPlayers" : false,
		"matte" : false,
		"hajime" : false,
		"wsClient" : undefined,
		"playerA" : undefined,
		"playerB" : undefined,
		"winner" : undefined,
		"disconnected" : false 
	}
}


async function mounted(){
	var {data : playerJwt} = await axios.get("/player");
	this.playerJwt = playerJwt;
	this.player = jwtDecode(playerJwt);
	this.wsClient = new WsClient();

	this.wsClient.connected.catch((function(){
		this.disconnected = true;
	}).bind(this));

	this.wsClient.onClose((function(){
		this.disconnected = true;
	}).bind(this));

	this.wsClient.on('matte', (function(content){ 
		this.playerA = content.playerA;
		this.playerB = content.playerB;
		this.showPlayers = true;
		this.matte = true;
	}).bind(this));

	this.wsClient.on('hajime', (function(content){ 
		this.hajime = true;
	}).bind(this));

	this.wsClient.on('fight-result', (function({winner}){ 
		if (winner.id == this.playerA.id){
			this.winner = "playerA";
		} else if (winner.id == this.playerB.id){
			this.winner = "playerB";
		} else {
			console.log(new Error("Unexpected winner !"));
		}

		setTimeout(this.reset.bind(this), 5000);
	}).bind(this));

	this.wsClient.on('player-disconnected', (function({winner}){ 
		this.reset();
	}).bind(this));

	document.onkeypress = hit.bind(this);
}


function connect(){
	this.wsClient.send("player-connect", this.playerJwt);
	this.showTitle = false;
}

function hit(){
	this.wsClient.send("player-hit", this.playerJwt);
	this.showTitle = false;
}

function reset(){
	this.showTitle = data().showTitle;
	this.showPlayers = data().showPlayers;
	this.matte = data().matte;
	this.hajime = data().hajime;
	this.playerA = data().playerA;
	this.playerB = data().playerB;
	this.winner = data().winner;
}