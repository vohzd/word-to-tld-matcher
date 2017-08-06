<template>
	<div>
		<router-view class="main-viewport"></router-view>
	</div>
</template>

<script>
	/*
	 * libs
	 */
	import { mapGetters }					from "vuex";

	export default {
		name: "app",
		computed: {
			...mapGetters([
			])
		},
		methods: {
		}
	}
</script>

<style >

	html {
		margin: 0;
		padding: 0;
	}

	body {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-family: "Lucida Console", monospace;;
		color: #656269;
		margin: 0;
		padding: 0;
		background: #1c1c1d;
		font-size: 16px;
		overflow-x: hidden;
	}

	h1, h2, h3, h4, h5, h6, p, ul, li {
		margin: 0;
		padding: 0;
		font-weight: normal;
		margin-bottom: 16px;
	}

	a {
		float: left;
		color: #9d7660;
		text-decoration: none;
	}

	a:hover{
		color: #82718e;
	}

	span {
		width: 100%;
		float: left;
	}

	h2 {
		margin-bottom: 32px;
		font-size: 22px;
		font-weight: normal;
	}

	.main-content-port {
		margin-left: 30%;
		margin-right: 30%;
		width: 40%;
		display: block;
	}

	button, input {
		outline: none;
		background: rgba(85, 85, 96, 0.1);
		border: none;
		padding: 8px;
		font-family: "Lucida Console", monospace;
		font-size: 18px;
		color: #c8c8c8;
		float: left;
		width: 100%;
		margin-bottom: 16px;
	}

	input[type="text"]{
		width: 100%;
	}

	button:hover {
		opacity: 0.8;
		cursor: pointer;
	}

</style>
