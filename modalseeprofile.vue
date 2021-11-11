<template>
  <div class="bloc-modale" v-if="reveleProfile" @change="apelApi">
    <div class="overlay"></div>
      <div class="modale card container d-flex">
        <div class="btn-modale btn btn-danger" @click="returnHome">X</div>
          <div class="row">
          <div class="col-6">
          <img :src="imageProfileUrl" class="card-img-top" alt="Photo de profil" style="height: 12rem;">
          </div>
          <div class="col-6">
          <p>{{ firstName }} {{ lastName }}</p>
            <p >Poste : {{ job }}</p>
            <p >Email : {{ email }}</p>
            <p > {{ bio }} </p>
        </div>
        </div>
    </div>
 </div>

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
            }
});

export default {
  name: "SeeProfileModal",
  
  props: ['reveleProfile','toggleModalProfile'],
  
  data: function (){
    return { 
      userId: localStorage.getItem('userId'),
      firstName : '',
      lastName:'',
      email: '',
      job: '',
      bio:'',
      imageProfileUrl: '',
      notImgProfile,
      
      }    
  },
 
  methods: {

    returnHome: function () {
      localStorage.removeItem('commentUserId');
      location.reload();
    },
    apelApi: function (id) {
    
    instance.get(`/api/users/` + id)
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
      console.log(res);
    })
    .catch((error)=>{
      console.log(error)
    });
    
      
  },
  },

}

</script>

<style scoped>



.bloc-modale{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
}

.modale{
    background: #f1f1f1;
    color: #333;
    padding: 50px;
    position: fixed;
    top: 30%;
}

.btn-modale{
    position: absolute;
    top: 10px;
    right: 10px;
}

</style>