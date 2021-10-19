<template>
 <div id="app">
    <Nav/>
    <div class="container">
    <h1 class="text-center h2 mt-2"> Bienvenue sur ton profil {{ firstName }} 🙂</h1>
      <div class="row d-flex justify-content-center">
        <div class="card mx-5 my-5 rounded shadow" style="width: 18rem;">
          <div  v-if="mode == 'profile'" class="card-body text-center">
            <h2 class="card-title mb-3 h4 text-decoration-underline">Vos Informations</h2>
            <p class="card-text">Prénom : {{ firstName }}</p>
            <p class="card-text">Nom : {{ lastName }}</p>
            <p class="card-text">Poste : {{ job }}</p>
            <p class="card-text">Email : {{ email }}</p>
              <h3 class="card-title h5 text-decoration-underline">Bio</h3>
              <p class="card-text"> {{ bio }} </p>
            <a @click="modificationProfile" v-if="mode == 'profile'" class="btn btn-primary">Modifier</a>
          </div>
          <div v-if="mode == 'modificationProfile'" class="card-body text-center" >
           <h2 class="card-title mb-3 h4 text-decoration-underline ">Je modifie mes informations</h2>
            <div class="row mt-2"> 
              <div class="col">
                <label for="inputFirstName" class="visually-hidden">Prénom</label>
                <input v-model="firstName" type="text" class="form-control" id="inputFirstName" placeholder="Prénom">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <label for="inputLastName" class="visually-hidden" >Nom</label>
                <input v-model="lastName" type="text" class="form-control" id="inputLastName" placeholder="Nom">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <label for="inputJob" class="visually-hidden" >Job</label>
                <input v-model="job" type="text" class="form-control" id="inputJob" placeholder="Job">
              </div>
            </div>
            <div class="mb-3">
              <h3 class="card-text h5 text-decoration-underline">Bio</h3>
              <textarea v-model="bio" class="form-control" aria-label="With textarea"></textarea>
            </div>
            <a @click="updateProfile" v-if="mode == 'modificationProfile'" class="btn btn-primary">Modifier</a>
          </div>
        </div>

        <div class="card mx-5 my-5 text-center" style="width: 18rem;">
          <h2 class="card-title h5">Photo de profil</h2>
          <div class="border">
          <img src="{{ imageUrl }}" class="card-img-top" alt=" image de profil">
           <div class="mt-3 border">
            <label for="exampleInputPassword1" class="form-label">Changer l'image de profil</label>
            <input type="file" class="form-control" id="exampleInputPassword1">
          </div>
          </div>
          <div class="card-body">
            
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import Nav from '../components/Nav.vue'
import axios from 'axios'

const token = localStorage.getItem('token');

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                  "Authorization": "Bearer " + token,
            }
});

export default {
	name: 'Profile',
	
  components: {
		Nav
	},
  
  data: function (){
    return { 
      userId: localStorage.getItem('userId'),
      token: localStorage.getItem('token'),
      mode: 'profile',
      firstName : '',
      lastName:'',
      email: '',
      job: '',
      bio:'',
      imageUrl: '',
      }
    },

  created: function () {
    instance.get(`/api/users/profil/${this.userId}`)
      .then(res => { 
        this.firstName = res.data.firstName, 
        this.lastName = res.data.lastName,
        this.email = res.data.email,
        this.job = res.data.job,
        this.bio = res.data.bio
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

      instance.put(`/api/users/profil/${this.userId}`, {
        firstName: this.firstName, 
        lastName: this.lastName,
        password: this.password,
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
  },
}

</script>

<style scoped>

#app{
    box-sizing: border-box;
}

</style>