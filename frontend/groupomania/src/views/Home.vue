<template>
 <div id="app">
    <Nav/>
 </div>
</template>

<script>

import Nav from '../components/Nav.vue'

export default {
	name: 'Home',
	components: {
		Nav
	},
    
};

</script>

<style scoped>

#app{
    box-sizing: border-box;
}

</style>