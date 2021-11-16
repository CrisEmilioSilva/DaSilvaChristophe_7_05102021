<template>
  <div id="app">
      <router-link to="/" aria-label="connexion/inscription"></router-link>
      <router-link to="/home" aria-label="accueil"></router-link>
      <router-link to="/profile" aria-label="mon profil"></router-link>
      <router-link to="/search-users" aria-label="rechercher utilisateur"></router-link>
      <router-link to="/profile-employee" aria-label="profil utilisateur groupomania"></router-link>
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
  font-family: 'Times New Roman', Times, serif;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

</style>
