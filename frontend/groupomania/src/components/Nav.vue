<template>
  <nav class="navbar navbar-light navbar-expand-sm bg-white border-bottom">
  <div class="container-fluid">
    <a class="navbar-brand">
      <img src="../assets/Logo/icon.svg" alt="Logo Groupomania" width="50" height="34">
      Groupomania
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a @click="anchorHome" href="" class="nav-link" aria-current="page">Accueil</a>
        </li>
         <li class="nav-item">
          <a @click="anchorProfile" href="" class="nav-link" aria-current="page">Profil</a>
        </li> 
      </ul>
      <LogOut/>
    </div>
  </div>
</nav>
</template>

<script>

import LogOut from '../components/LogOut.vue'
import router from '../router'

export default {
	name: 'Nav',
  
  components: {
    LogOut,
  },
  
  methods: {
    
    anchorHome: () => {
      router.push({ path: 'home' })
    },
    
    anchorProfile: () => {
      router.push({ path: 'profile' })
    }
  }
};
  
</script>

<style scoped>

li a:hover {
  border-bottom: 1px solid blue;
}

</style>