<template>
 <div id="app">
    <Nav/>
    <div class="container">
      <h1 class="text-center h2 mt-2"> Bienvenue sur votre profil {{ firstName }} 🙂</h1>
      <div class="row d-flex justify-content-center">
        <div class="card mx-4 my-4 text-center rounded shadow" style="width: 18rem;">
          <h2 class="card-title h4 mt-3 mb-3 text-decoration-underline">Photo de profil</h2>
          <img :src="imageUrl" class="card-img-top obj-fit" alt="Photo de profil" style=" height: 12rem;" >
          <div class=" card-body border pt-4 mb-2">
              <label for="file" class="form-label text-decoration-underline  ">Changer ma photo de profil</label>
              <input @change="fileSelected" type="file" class="form-control" id="file" name="file">
          </div>
        </div>
        <div class="card mx-4 my-4 rounded shadow" style="width: 18rem;">
          <div  v-if="mode == 'profile'" class="card-body text-center">
            <h2 class="card-title mb-3 h4 text-decoration-underline">Vos Informations</h2>
            <p class="card-text">Prénom : {{ firstName }}</p>
            <p class="card-text">Nom : {{ lastName }}</p>
            <p class="card-text">Poste : {{ job }}</p>
            <p class="card-text">Email : {{ email }}</p>
              <h3 class="card-title h5 text-decoration-underline">Bio</h3>
              <p class="card-text border"> {{ bio }} </p>
            <a @click="modificationProfile" v-if="mode == 'profile'" class="btn btn-primary">Modifier</a>
            <a @click="deleteProfile" v-if="mode == 'profile'" class="btn btn-danger mt-2">Supprimer mon profil</a>
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
                <label required for="inputEmail" class="visually-hidden">Email</label>
                <input v-model="email" type="email" class="form-control" id="inputEmail" placeholder="Email">
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
      </div> 
    </div>
  </div>
</template>

<script>

import Nav from '../components/Nav.vue'
import axios from 'axios'
import router from '../router'

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
		Nav,
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
        this.bio = res.data.bio,
        this.imageUrl = res.data.imageUrl
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
      this.mode = 'profile'
      
      instance.put(`/api/users/profil/${this.userId}`, {
        firstName: this.firstName, 
        lastName: this.lastName,
        password: this.password,
        job: this.job, 
        bio: this.bio,
      })
      .then((res) => { 
        console.log(res);
      })
      .catch((error)=>{
        console.log(error)
      }); 
    },

    fileSelected: function (event) {
      this.mode = 'profile'
      
      this.imageUrl = event.target.files[0];

      const fd = new FormData();
      fd.append('image', this.imageUrl)

      instance.put(`/api/users/profil/${this.userId}`,fd)
      .then((res) => { 
        location.reload();
        console.log(res)
      })
      .catch((error)=>{
        console.log(error)
      }); 
    },

    deleteProfile: function () {
      this.mode = 'profile'
        instance.delete(`/api/users/profil/${this.userId}`)
          .then((res) => { 
            localStorage.removeItem('userId',res.data.userId)
            localStorage.removeItem('token',res.data.token)
            alert('Votre profil a bien été supprimé !');
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

#app{
    box-sizing: border-box;
}

.obj-fit{
  object-fit: cover;
}

</style>