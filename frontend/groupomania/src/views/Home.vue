<template>
	<div>
		<Nav />
		<PostMessage />
		<MessagesHome />
	</div>
</template>

<script>

import Nav from '../components/Nav/Nav.vue'
import PostMessage from '../components/Home/PostMessage.vue'
import MessagesHome from '../components/Home/MessagesHome.vue'

export default {
	name: 'Home',
	
	components: {
		Nav, PostMessage, MessagesHome,
	},
};

</script>