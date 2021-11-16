<template>
  <main class="container-fluid d-flex flex-column align-items-center">  
    <h1 class="h3 my-5 px-3 py-2 bg-white text-black text-center rounded-pill shadow">Partagez et restez en contact avec vos collègues d'entreprise !</h1>
      <p v-if="errors.length" class="w-75 bg-danger text-white py-2 px-2 rounded shadow">
        <span>Veuillez corriger les erreurs suivantes :</span>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </p>
      <div class="card my-5" style="width: 20rem; height: 20rem;">
        <form class="card-body text-center">
          <img class="logo pb-2" alt="Logo Groupomania" src="../assets/Logo/icon-left-font-monochrome-black.svg">
          <h2 v-if="mode == 'login'" class="card-title pt-2 h4 text-black border-top">Se Connecter</h2>
          <h2 v-else class="card-title pt-2 h4 text-black border-top">S'inscrire</h2>
          <div v-if="mode == 'inscription'" class="row mt-2">
            <div class="col">
              <input v-model="firstName" aria-label="Prénom" type="text" class="form-control" id="inputFirstName" maxlength="13" placeholder="Prénom">
            </div>
            <div class="col">
              <input v-model="lastName" aria-label="Nom" type="text" class="form-control" id="inputLastName" maxlength="13"  placeholder="Nom">
            </div>
          </div>
          <div class="row mt-2">
            <div class="col">
              <input v-model="email" aria-label="Email" type="email" class="form-control" id="inputEmail" maxlength="40" placeholder="Email">
            </div>
          </div>
          <div class="row mt-2">
            <div class="col">
              <input v-model="password" aria-label="Mot de passe" type="password" class="form-control" id="inputPassword" maxlength="15" placeholder="Password"> 
            </div>
          </div>
          <a @click="connectAccount" v-if="mode == 'login'" class="btn btn-primary w-75 mt-2">Se connecter</a>
          <a @click="inscription" v-if="mode == 'login'" class="btn btn-success w-75 my-2">S'inscrire</a>
          <a @click="createAccount" v-if="mode == 'inscription'" class="btn btn-primary w-75 my-2">Créer un compte</a> <br>
          <a @click="connection" v-if="mode == 'inscription'" class="w-75 text-decoration-none cursor">Retour connexion</a>
          <a v-if="mode == 'login'" class="text-decoration-none text-secondary" tabindex="-1" aria-disabled="true">Mot de passe oublié ?</a>
        </form>
      </div>
  </main>
</template>

<script>

import router from '../router'
import axios from'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000',
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
    errors: []
    }
  }, 

  methods: {
    
    inscription: function () {
      this.mode = 'inscription'
    },
    
    connection: function () {
      this.mode = 'login'
    },
    
    createAccount: function () {
      
      this.mode = 'inscription',

      this.errors = [];

      if (!this.firstName || this.firstName.length < 2) // Attribut maxlength="13" dans input firstName
      {
        this.errors.push("Votre prénom doit contenir entre 2 et 13 caractères");
      }

      if (!this.lastName || this.lastName.length < 2) // Attribut maxlength="13" dans input lasttName
      {
        this.errors.push("Votre nom doit contenir entre 2 et 13 caractères");
      }
      /* eslint-disable */
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.email || !emailRegex.test(this.email))
      {
        this.errors.push("Votre email ne peut pas être vide et doit être valide");
      }
      /* eslint-disable */
      const passwordRegex = /^[a-zA-Z]\w{2,15}$/;
      if (!this.password || !passwordRegex.test(this.password)) // Attribut maxlength="15" dans input password
      {
        this.errors.push("Votre mot de passe ne peut pas être vide et doit commencer par une lettre, être compris entre 3 et 15 caractères et contenir uniquement des lettres et des chiffres");
      }
      
      if (this.errors.length)
      {
        return true;
      }

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
        this.errors.push("Cette adresse mail a déja un compte");
        console.log(error);
      });
    },
    
    connectAccount: function () {

      this.mode = 'login',

      this.errors = [];
      /* eslint-disable */
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.email || !emailRegex.test(this.email))
      {
        this.errors.push("Votre email ne peut pas être vide et doit être valide");
      }

      if (!this.password)
      {
        this.errors.push("Veuillez saisir votre mot de passe");
      }

      if (this.errors.length)
      {
        return true;
      }

      instance.post('/api/users/login',{
        email : this.email,
        password : this.password,
      })
      .then((res) => {
        localStorage.setItem('userId',res.data.userId)
        localStorage.setItem('token',res.data.token)
        router.push({ path: 'home' });
      })
      .catch((error)=>{
        this.errors.push("Mot de passe incorrect !");
        console.log(error);
      });
    },
  }
}

</script>

<style scoped>

.logo{
  width: 150px;
}

.cursor:hover {
cursor: pointer;
}

</style>