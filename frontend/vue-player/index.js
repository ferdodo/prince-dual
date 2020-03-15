import template from "./template.html";
import style from "./style.css";
import Vue from "vue";
import idle from "./idle.png"

Vue.component("player", {
	template,
	data,
	props : ['winner']
});


function data(){
	return {
		"idle" : idle
	}
}