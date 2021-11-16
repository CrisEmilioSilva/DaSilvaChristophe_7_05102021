<template>
	<div>
		<Nav/>
		<CompanyEmployees/>
	</div>
</template>

<script>
import Nav from '../components/Nav/Nav.vue'
import CompanyEmployees from '../components/CompanyEmployees.vue'

export default {
	name: 'Home',
	
	components: {
		CompanyEmployees, Nav
	},
};

</script>