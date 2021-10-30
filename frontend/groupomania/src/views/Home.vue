<template>
<div id="app">
	<Nav/>
	<PostMessageHome/>
    <GetAllMessages/>
</div>
</template>

<script>

import Nav from '../components/Nav.vue'
import PostMessageHome from '../components/PostMessageHome.vue'
import GetAllMessages from '../components/GetAllMessages.vue'





export default {
	name: 'Home',
	
	components: {
		Nav, PostMessageHome, GetAllMessages,
	},

    data() {
        return {
            userId: localStorage.getItem('userId'),
            
        }
    },
    
};

</script>

<style scoped>

#app {
    box-sizing: border-box;

}

</style>