<template>
    <main class="container mb-3">
      <div class="d-flex justify-content-center">
        <h1 class="h1size text-center h2 mt-3 py-2 px-3 bg-white rounded-pill shadow">Profil de {{ firstName }} {{ lastName }}</h1>
      </div>
      <p v-if="errors.length" class="bg-danger text-white py-2 px-2 rounded">
        <span>Veuillez corriger les erreurs suivantes :</span>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </p>
      <div class="row d-flex justify-content-center align-items-center">
        <div class="card mx-4 my-4 text-center rounded" style="width: 18rem;">
          <img :src="imageProfileUrl" class="card-img-top py-2" alt="Photo de profil" style="height: 12rem;">
          <form v-if="this.admin == true" class="card-body border pt-4 mb-2">
              <input @change="fileSelected" aria-label="Photo de profil" ref="file" type="file" id="file" name="file" accept=".png, .jpg" class="form-control btn btn-outline-primary">
          </form>
          <div v-if="this.admin == true" class="mb-2">
            <a @click="modificationPictureProfile" class="card-link w-75 btn btn-primary rounded-pill">Confirmer Modification</a>
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
            <a @click="blockAccount" v-if="this.userAccountBlock == false && this.admin == true" class="btn btn-danger rounded-pill mt-2 ">Bloquer utilisateur</a>
            <a @click="unblockAccount" v-if="this.userAccountBlock == true && this.admin == true" class="btn btn-success rounded-pill mt-2 ">Déloquer utilisateur</a>
          </div>
        </div>
      </div>
      <div class="text-center mt-2">
        <a href="/search-users" class="btn btn-primary rounded-pill">Recherchez vos collègues</a>
      </div>
    </main>
</template>

<script>

import notImgProfile from "../assets/avatar.png"
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
      admin:'',
      userAccountBlock:'',
    }
  },

  mounted: function () {

    instance.get(`/api/users/${this.seeProfileUserId}`,{
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
      if(res.data.imageProfileUrl == null){
        this.imageProfileUrl = notImgProfile
      } else {
        this.imageProfileUrl = res.data.imageProfileUrl
      }
      this.userAccountBlock = res.data.userAccountBlock
    })
    .catch((error)=>{
      console.log(error)
    });  

    instance.get(`/api/users/${this.userId}`,{
      headers: {
                "Authorization": "Bearer " + token,
              },
    })
    .then(res => { 
        this.admin = res.data.admin
    })
    .catch((error)=>{
      console.log(error)
    });  
  },
 
  methods: {

    profile: function () {
      this.mode = 'profile'
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
        
      instance.put(`api/users/${this.seeProfileUserId}`, fd, {
        headers:  {
                      'Content-Type': 'multipart/form-data',
                  },
      })
      .then(() => {
        alert('Votre photo de profil a bien été modifié');
      })
      .catch((error)=>{
        console.log(error)
      });
    },

    // blocage/déblocage compte user

    blockAccount: function () {
      instance.put(`/api/users/${this.seeProfileUserId}`, {
        userAccountBlock: 1 
      })
      .then(() => {
        location.reload();
      })
      .catch((error)=>{
        console.log(error)
      }); 
    },

    unblockAccount: function () {
      instance.put(`/api/users/${this.seeProfileUserId}`, {
        userAccountBlock: 0
      })
      .then(() => {
        location.reload();
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

@media (max-width: 500px) {  
  .h1size{
    width: 70%;
  }
}

</style>