<template>
	<div id="app">
		<Nav />
		<PostMessageHome />
		<MessagesHome />
	</div>
</template>

<script>

import Nav from '../components/Nav.vue'
import PostMessageHome from '../components/PostMessageHome.vue'
import MessagesHome from '../components/MessagesHome.vue'


export default {
	name: 'Home',
	
	components: {
		Nav, PostMessageHome, MessagesHome,
	},
};

</script>