<template>
  <div class="auth container-fluid d-flex flex-column align-items-center">  
    <h1 class="h3 my-5 px-3 py-1 bg-white text-black border rounded-pill">Partagez et restez en contact avec votre entreprise !</h1>
      <div class="card mt-5" style="width: 20rem; height: 20rem;">
        <form class="card-body text-center">
          <img class="logo pb-2" alt="Logo Groupomania" src="../assets/Logo/icon-left-font-monochrome-black.svg">
          <h2 v-if="mode == 'login'" class="card-title pt-2 h4 text-black border-top rounded">Se Connecter</h2>
          <h2 v-else class="card-title pt-2 h4 text-black border-top rounded">S'inscrire</h2>
          <div v-if="mode == 'inscription'" class="row mt-2" >
            <div class="col">
              <label for="inputFirstName" class="visually-hidden">FirstName</label>
              <input v-model="firstName" type="text" class="form-control" id="inputFirstName" placeholder="Prénom">
            </div>
            <div class="col">
              <label for="inputLastName" class="visually-hidden">LastName</label>
              <input v-model="lastName" type="text" class="form-control" id="inputLastName" placeholder="Nom">
            </div>
          </div>
          <div class="row mt-2">
            <div class="col">
              <label required for="inputEmail" class="visually-hidden">Email</label>
              <input v-model="email" type="email" class="form-control" id="inputEmail" placeholder="Email">
              <div class="email-errors">{{ errors }}</div>
            </div>
            
          </div>
          <div class="row mt-2">
            <div class="col">
              <label for="inputPassword" class="visually-hidden">Password</label>
              <input v-model="password" type="password" class="form-control" id="inputPassword" placeholder="Password"> 
            </div>
            <div class="password-errors"></div>
          </div>
          <a @click="connectAccount" v-if="mode == 'login'" class="btn btn-primary w-75 mt-2">Se connecter</a>
          <a @click="inscription" v-if="mode == 'login'" class="btn btn-success w-75 my-2">S'inscrire</a>
          <a @click="createAccount"  class="btn btn-primary w-75 my-2" type="submit" v-if="mode == 'inscription'" >Créer un compte</a> <br>
          <a @click="connection" v-if="mode == 'inscription'" class="w-75">Retour connexion</a>
          <a v-if="mode == 'login'" class="">Mot de passe oublié ?</a>
        </form>
      </div>
  </div>
</template>

<script>

import axios from'axios'
import router from '../router'

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 1000,
  
});

export default {
  name: 'Login',

  data: function () {
    return {
    mode: 'login',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    errors: ''
    }
  }, 

  methods: {
    inscription: function () {
      this.mode = 'inscription'
    },
    connection: function () {
      this.mode = 'login'
    },
    connectAccount: function () {
      this.mode = 'login',
      
      instance.post('/api/users/login',{
        email : this.email,
        password : this.password,
        })
        .then((res) => {
          localStorage.setItem('userId',res.data.userId)
          localStorage.setItem('token',res.data.token)
          alert('Connexion réussie');
          router.push({ path: 'home' });
        })
        .catch((error)=>{
          console.log(error)
        }); 
    },
    createAccount: function () {
      this.mode = 'inscription',
      
      instance.post('api/users/signup',{
        email : this.email,
        password : this.password,
        firstName : this.firstName,
        lastName : this.lastName
        })
        .then(() => {
          alert('Inscription réussie !');       
          this.mode = 'login'
        })
        .catch((error)=>{
          console.log(error)
        });
    },
  }
}

</script>

<style scoped>
h1{
  border: none;
}

.logo{
  width: 150px;
}

.auth{
  height: 625px;
  background-image: url('../assets/photo-connect.png');
}

</style>
