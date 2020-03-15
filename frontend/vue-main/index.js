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
		hit
	}
});


function data(){
	return {
		"playerToken" : undefined,
		"player" : undefined,
		"showTitle" : true,
		"matte" : false,
		"hajime" : false,
		"wsClient" : undefined,
		"playerA" : undefined,
		"playerB" : undefined,
		"winner" : undefined,
		"loser" : undefined
	}
}


async function mounted(){
	var {data : playerJwt} = await axios.get("/player");
	this.playerJwt = playerJwt;
	this.player = jwtDecode(playerJwt);
	this.wsClient = new WsClient();

	this.wsClient.on('matte', (function(content){ 
		this.playerA = content.playerA;
		this.playerB = content.playerB;
		this.matte = true;
	}).bind(this));

	this.wsClient.on('hajime', (function(content){ 
		this.hajime = true;
	}).bind(this));

	this.wsClient.on('fight-result', (function({winner, loser}){ 
		this.winner = winner;
		this.loser = loser;
	}).bind(this));

	this.wsClient.on('player-disconnected', (function({winner, loser}){ 
		this.showTitle = data().showTitle;
		this.matte = data().matte;
		this.hajime = data().hajime;
		this.playerA = data().playerA;
		this.playerB = data().playerB;
		this.winner = data().winner;
		this.loser = data().loser;
	}).bind(this));
}


function connect(){
	this.wsClient.send("player-connect", this.playerJwt);
	this.showTitle = false;
}

function hit(){
	this.wsClient.send("player-hit", this.playerJwt);
	this.showTitle = false;
}