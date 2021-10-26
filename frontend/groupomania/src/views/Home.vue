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
import axios from 'axios'

const token = localStorage.getItem('token');

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json", 
                  "Authorization": "Bearer " + token,
            }
});

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