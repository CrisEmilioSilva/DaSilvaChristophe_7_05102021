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
          <a @click="anchorHome" href="" class="nav-link text-black" aria-current="page">Accueil</a>
        </li>
         <li class="nav-item">
          <a @click="anchorProfile" href="" class="nav-link text-black" aria-current="page">Profil</a>
        </li>
        <li>
          <a @click="usersSite" href="" class="nav-link pe-3 text-decoration-none text-black"> Retrouvez vos collegues
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="blue" class="bi bi-people-fill" viewBox="0 0 16 16">
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
              <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
            </svg>
          </a>
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
    },

    usersSite: () => {
      router.push({ path: 'search-users' })
    }
  }
};
  
</script>

<style scoped>

li a:hover {
  border-bottom: 1px solid blue;
}

</style>