var jwt = require("jsonwebtoken");
var nickGenerator = require("nick-generator");
var { v4 : uuidv4 } = require('uuid');
var crypto = require('crypto')


class Player{
	constructor(app){
		this.secret = crypto.randomBytes(64).toString('hex');
		app.get("/player", getPlayer(this));
	}

	verify(token){
		return jwt.verify(token, this.secret);
	}
}


function getPlayer(player){
	return function middleware(req, res){
		try{
			var payload = createPlayer(player);
			res.send(payload);
		} catch(error){
			console.error(error);
			res.status(500).end();
		}
	}
}


function createPlayer(player){
	var name = nickGenerator();
	var id = uuidv4();
	return jwt.sign({name, id}, player.secret);
}

module.exports = Player;