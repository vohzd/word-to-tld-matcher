import Vue 					          	from "vue";
import VueRouter 			        	from "vue-router";

Vue.use(VueRouter);

import state 										from "../vuex/state.js";

import Home 				        		from "../components/Home/Home.vue";

// define routes
const routes = [
	{ path: "/", component: Home }
];

// initialise & export Instance
export default new VueRouter({
	base: __dirname + "/",
	mode: 'history',
	routes
});;
