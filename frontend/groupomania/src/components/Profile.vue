<template>
    <main class="container">
      <div class="d-flex justify-content-center">
        <h1 class="w-50 mt-3 py-2 h2 text-center bg-white rounded-pill shadow">Mon Profil</h1>
      </div>
      <p v-if="errors.length" class="bg-danger text-white py-2 px-2 rounded">
        <span>Veuillez corriger les erreurs suivantes :</span>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </p>
      <div class="row d-flex justify-content-center align-items-center">
        <div class="card mx-4 my-4 text-center rounded shadow" style="width: 18rem;">
          <h2 class="card-title h4 my-3 text-decoration-underline">Photo de profil</h2>
          <img :src="imageProfileUrl" class="card-img-top" alt="Photo profil" style="height: 12rem;">
          <form class="card-body border pt-4 mb-2">
              <label for="file" class="form-label fw-bold">Changer ma photo de profil</label>
              <input @change="fileSelected" ref="file" type="file" id="file" name="file" accept=".png, .jpg, .jpeg, .gif" class="form-control btn btn-outline-primary">
          </form>
          <div class="mb-2">
            <a @click="modificationPictureProfile" class="card-link btn btn-primary w-75 rounded-pill">Confirmer Modification</a>
          </div>
        </div>
        <div class="card mx-4 my-4 rounded" style="width: 18rem;">
          <div v-if="mode == 'profile'" class="card-body text-center">
            <h2 class="card-title mb-3 h4 text-decoration-underline">Vos Informations</h2>
            <p class="card-text">Prénom : {{ firstName }}</p>
            <p class="card-text">Nom : {{ lastName }}</p>
            <p class="card-text">Poste : {{ job }}</p>
            <p class="card-text">Email : {{ email }}</p>
              <h3 class="card-title h5 text-decoration-underline">Bio</h3>
              <p class="card-text"> Parle nous de toi {{ firstName }} 😊 : <br> {{ bio }} </p>
            <a @click="modificationProfile" v-if="mode == 'profile'" class="btn btn-primary rounded-pill">Modifier</a>
            <a @click="deleteProfile" v-if="mode == 'profile'" class="btn btn-danger mt-2 rounded-pill">Supprimer mon profil</a>
          </div>
          <form v-if="mode == 'modificationProfile'" class="card-body text-center">
           <h2 class="card-title mb-3 h4 text-decoration-underline">Je modifie mes informations</h2>
            <div class="row mt-2"> 
              <div class="col">
                <input v-model="firstName" aria-label="Prénom" type="text" class="form-control" id="inputFirstName" maxlength="13" placeholder="Prénom">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <input v-model="lastName" aria-label="Nom" type="text" class="form-control" id="inputLastName" maxlength="13" placeholder="Nom">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <input v-model="email" aria-label="Email" type="email" class="form-control" id="inputEmail" maxlength="40" placeholder="Email">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <input v-model="job" aria-label="Job" type="text" class="form-control" id="inputJob" maxlength="25" placeholder="Job">
              </div>
            </div>
            <div class="mb-3">
              <label for="bio" class="h5 text-decoration-underline" >Bio</label>
              <textarea v-model="bio" rows="2" maxlength="120" id="bio" name="bio" class="form-control"></textarea>
            </div>
            <a @click="updateProfile" v-if="mode == 'modificationProfile'" class="btn btn-primary rounded-pill" >Modifier</a><br>
            <a @click="profile" v-if="mode == 'modificationProfile'" class="w-75 text-decoration-none cursor">Annuler</a>
          </form>
        </div>
      </div> 
    </main>
</template>

<script>

import notImgProfile from "../assets/avatar.png"
import router from '../router'
import axios from 'axios'

const token = localStorage.getItem('token');

const instance = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json", 
                      "Authorization": "Bearer " + token,
              },
    });

export default {
	name: 'Profile',

  data: function (){
    return { 
      userId: localStorage.getItem('userId'),
      mode: 'profile',
      firstName : '',
      lastName:'',
      email: '',
      job: '',
      bio:'',
      imageProfileUrl: '',
      file:'',
      notImgProfile,
      errors: [],
      }    
  },

  mounted: function () {

    instance.get(`/api/users/${this.userId}`, {
      headers: {
                "Authorization": "Bearer " + token,
              },
    })
    .then(res => { 
      this.firstName = res.data.firstName, 
      this.lastName = res.data.lastName,
      this.email = res.data.email,
      this.job = res.data.job,
      this.bio = res.data.bio
      if(res.data.imageProfileUrl === null){
        this.imageProfileUrl = notImgProfile
      } else {
        this.imageProfileUrl = res.data.imageProfileUrl
      }
    })
    .catch((error)=>{
      console.log(error)
    });  
  },
 
  methods: {

    profile: function () {
      this.mode = 'profile'
    },
    
    modificationProfile: function () {
      this.mode = 'modificationProfile'
    },
    
    updateProfile: function () {
      
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

      if (this.errors.length)
      {
        return true;
      }
      
      instance.put(`/api/users/${this.userId}`, {
        headers: {
                "Authorization": "Bearer " + token,
              },
        firstName: this.firstName, 
        lastName: this.lastName,
        email: this.email,
        job: this.job, 
        bio: this.bio,
      })
      .then(() => {
        this.mode = 'profile'
      })
      .catch((error)=>{
        console.log(error)
      }); 
    },

    fileSelected: function (){
      this.file = this.$refs.file.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = e =>{
      this.imageProfileUrl = e.target.result;
      }
    },

    modificationPictureProfile: function () {
      
      const fd = new FormData();
      fd.append('image', this.file)
        
      instance.put(`api/users/${this.userId}`, fd, {
        headers:  {
                      'Content-Type': 'multipart/form-data',
                      "Authorization": "Bearer " + token,
                  },
      })
      .then(() => {
        alert('Votre photo de profil a bien été modifié');
      })
      .catch((error)=>{
        console.log(error)
      });
    },

    deleteProfile: function () {
      
      if (!window.confirm ('Votre profil va être supprimé ! Cliquez sur OK pour confirmer ou ANNULER pour annuler la demande !')){
        return router.push({ path: '/profile' });
      } 
      
      instance.delete(`/api/users/${this.userId}`,{
        headers: {
                "Authorization": "Bearer " + token,
              },
      })
      .then(() => { 
        localStorage.clear();
        alert('Votre profil a bien été supprimé !')
        router.push({ path: '/' });
      })
      .catch((error)=>{
        console.log(error)
      }); 
    },
  },
}

</script>

<style scoped>

.card-img-top {
  object-fit: cover;
}

textarea  {
  resize: none;
}

.cursor:hover {
cursor: pointer;
}

</style>