<template>
  <div id="app">
    <router-link to="/"></router-link>
    <router-link to="/home"></router-link>
    <router-link to="/profile"></router-link>
  <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  }
}
</script>

<style>

</style>
