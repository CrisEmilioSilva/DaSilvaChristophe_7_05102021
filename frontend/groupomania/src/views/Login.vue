<template>
  <div class="auth container-fluid d-flex flex-column align-items-center">  
    <h1 class="h3 my-5 px-2 py-1 bg-white text-black border rounded-pill">Partagez et restez en contact avec votre entreprise !</h1>
      <div class="card mt-5 " style="width: 20rem; height: 20rem;">
        <div class="card-body">
          <img class="logo pb-2" alt="Logo Groupomania" src="../assets/Logo/icon-left-font-monochrome-black.svg">
          <h2 v-if="mode == 'login'" class="card-title pt-2 h4 text-black border-top rounded">Se Connecter</h2>
           <h2 v-else class="card-title pt-2 h4 text-black border-top rounded">S'inscrire</h2>
            <div class="row mt-2" v-if="mode == 'inscription'" >
              <div class="col">
                <label for="inputFirstName" class="visually-hidden">FirstName</label>
                <input v-model="firstName" type="text" class="form-control" id="inputFirstName" placeholder="Prénom">
              </div>
              <div class="col">
                <label for="inputLastName" class="visually-hidden">Email</label>
                <input v-model="lastName" type="text" class="form-control" id="inputLastName" placeholder="Nom">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <label for="inputEmail" class="visually-hidden">Email</label>
                <input v-model="email" type="email" class="form-control" id="inputEmail" placeholder="Email">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <label for="inputPassword" class="visually-hidden">Password</label>
                <input v-model="password" type="password" class="form-control" id="inputPassword" placeholder="Password"> 
              </div>
            </div>
          <a @click="createAccount" v-if="mode == 'login'" class="btn btn-primary w-75 mt-2">Se connecter</a>
          <a @click="inscription" v-if="mode == 'login'" class="btn btn-success w-75 my-2">S'inscrire</a>
          <a @click="createAccount" v-if="mode == 'inscription'" class="btn btn-primary w-75 my-2">Créer un compte</a> <br>
          <a @click="connectAccount" v-if="mode == 'inscription'" class="w-75">Retour connexion</a>
          <a v-if="mode == 'login'" class="">Mot de passe oublié ?</a>
        </div>
      
      </div>
  </div>
</template>

<script>

var Vue = require('vue');
var VueResource = require('vue-resource');

Vue.use(VueResource);

export default {
  el: '#app',
  name: 'Login',
  data: function () {
    return {
    mode: 'login',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    }
  },
  http: {
    root: 'http://localhost:8000'
  },
  methods: {
    inscription: function () {
      this.mode = 'inscription'
    },
    connectAccount: function () {
      this.mode = 'login'
    },
    createAccount: function () {
      this.mode = 'inscription'
       // GET /someUrl
      this.$http.post().then(res => {
        this.email = res.data,
        this.password = res.data,
        this.firstName = res.data,
        this.lastName = res.data
      }, res => {
        console.log('error', res)
      })
       
    }
    
  }
}

</script>

<style lang="scss">
h1{
  border: none;
}

.logo{
  width: 150px;
}

.auth{
  height: 625px;
  background-image: url('../assets/Sans titre.png');
}

</style>
