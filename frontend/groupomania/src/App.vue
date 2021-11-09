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
}
</script>

<style>

body {
  background-image: url('./assets/background.png');
}

#app {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

</style>
