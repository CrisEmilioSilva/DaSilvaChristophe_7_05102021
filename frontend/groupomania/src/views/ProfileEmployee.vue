<template>
	<div>
		<Nav/>
		<ProfileEmployee/>
	</div>
</template>

<script>

import Nav from '../components/Nav/Nav.vue'
import ProfileEmployee from '../components/ProfileEmployee.vue'

export default {
	name: 'Home',
	
	components: {
		ProfileEmployee, Nav
	},
};

</script>