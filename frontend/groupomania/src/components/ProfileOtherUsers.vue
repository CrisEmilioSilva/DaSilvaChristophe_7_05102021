<template>
 <div id="app">
    <Nav/>
    <div class="container">
      <div class="d-flex justify-content-center">
        <h1 class="text-center w-50 h2 mt-3 py-2 bg-white rounded-pill shadow">Profil de {{ firstName }} {{ lastName }}</h1>
      </div>
      <p v-if="errors.length" class="bg-danger text-white py-2 px-2 rounded">
        <span>Veuillez corriger les erreurs suivantes :</span>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </p>
      <div class="row d-flex justify-content-center align-items-center">
        <div class="card mx-4 my-4 text-center rounded shadow" style="width: 18rem;">
          <h2 class="card-title h4 mt-3 mb-3 text-decoration-underline">Photo de profil</h2>
          <img :src="imageProfileUrl" class="card-img-top pb-3" alt="Photo de profil" style="height: 12rem;">
          <form v-if="this.admin == true" class="card-body border pt-4 mb-2">
              <label for="file" class="form-label fw-bold ">Changer ma photo de profil</label>
              <input @change="fileSelected" ref="file" type="file" id="file" name="file" accept=".png, .jpg" class="form-control btn btn-outline-primary">
          </form>
          <div v-if="this.admin == true" class="mb-2">
          <a @click="modificationPictureProfile" class="card-link btn btn-primary rounded-pill w-75">Confirmer Modification</a>
          </div>
        </div>
        <div class="card mx-4 my-4 rounded shadow" style="width: 18rem;">
          <div v-if="mode == 'profile'" class="card-body text-center">
              <h2 class="card-title mb-3 h4 text-decoration-underline">Infos</h2>
            <p class="card-text">Prénom : {{ firstName }}</p>
            <p class="card-text">Nom : {{ lastName }}</p>
            <p class="card-text">Poste : {{ job }}</p>
            <p class="card-text">Email : {{ email }}</p>
              <h3 class="card-title h5 text-decoration-underline">Bio</h3>
              <p class="card-text bio"> {{ bio }} </p>
            <a @click="modificationProfile" v-if="mode == 'profile' && this.admin == true" class="btn btn-primary rounded-pill">Modifier</a>
            <a @click="deleteProfile" v-if="mode == 'profile' && (this.userId  && this.admin == true)" class="btn btn-danger rounded-pill mt-2">Supprimer mon profil</a>
          </div>
          <form v-if="mode == 'modificationProfile' && this.admin == true" class="card-body text-center">
           <h2 class="card-title mb-3 h4 text-decoration-underline">Je modifie mes informations</h2>
            <div class="row mt-2"> 
              <div class="col">
                <label for="inputFirstName" class="visually-hidden">Prénom</label>
                <input v-model="firstName" type="text"  class="form-control" id="inputFirstName" maxlength="13" placeholder="Prénom">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <label for="inputLastName" class="visually-hidden" >Nom</label>
                <input v-model="lastName" type="text" class="form-control" id="inputLastName" maxlength="13" placeholder="Nom">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <label for="inputEmail" class="visually-hidden">Email</label>
                <input v-model="email" type="email" class="form-control" id="inputEmail" maxlength="40" placeholder="Email">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <label for="inputJob" class="visually-hidden" >Job</label>
                <input v-model="job" type="text" class="form-control" id="inputJob" maxlength="25" placeholder="Job">
              </div>
            </div>
            <div class="mb-3">
              <h3 class="h5 text-decoration-underline">Bio</h3>
              <textarea v-model="bio" rows="2" maxlength="120" class="form-control"></textarea>
            </div>
            <a @click="updateProfile" v-if="mode == 'modificationProfile'" class="btn btn-primary mb-1 rounded-pill" >Modifier</a><br>
            <a @click="backProfile" v-if="mode == 'modificationProfile'" href="#" class="w-75 text-decoration-none">Annuler</a>
          </form>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>

import Nav from '../components/Nav.vue'
import axios from 'axios'
import router from '../router'
import notImgProfile from "../assets/avatar.png"

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
	
  components: {
		Nav,
	},
  
  data: function (){
    return { 
      userId: localStorage.getItem('userId'),
      seeProfileUserId: localStorage.getItem('seeProfileUserId'),
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
      admin: ''
      }    
  },

  mounted: function () {

    instance.get(`/api/users/${this.seeProfileUserId}`)
    .then(res => { 
      this.firstName = res.data.firstName, 
      this.lastName = res.data.lastName,
      this.email = res.data.email,
      this.job = res.data.job,
      this.bio = res.data.bio
      if(res.data.imageProfileUrl == null){
        this.imageProfileUrl = notImgProfile
      } else {
        this.imageProfileUrl = res.data.imageProfileUrl
      }
      this.admin = res.data.admin
      console.log(res);
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
    
    backProfile: function () {
      this.mode = 'profile'
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
        firstName: this.firstName, 
        lastName: this.lastName,
        email: this.email,
        job: this.job, 
        bio: this.bio,
      })
      .then((res) => {
        console.log(res);
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
                  },
      })
      .then((res) => {
        console.log(res);
        alert('Votre photo de profil a bien été modifié');
      })
      .catch((error)=>{
        console.log(error)
      });
    },

    deleteProfile: function () {
      
      if (!window.confirm ('Votre profil va être supprimé ! Cliquez sur OK pour confirmer ou ANNULER pour annuler la demande !')){
        return router.push({ path: 'profile' });
      } 
      
      instance.delete(`/api/users/${this.userId}`)
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

</style>