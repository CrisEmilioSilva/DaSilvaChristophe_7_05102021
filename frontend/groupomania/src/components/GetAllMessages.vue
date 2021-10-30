<template>
  <div class="container w-50 mt-3">
    <div v-for="message in messages" v-bind:key="message.id" class="row card mt-3 d-flex align-items-center">
      <div class="card-body border-bottom ">
        <div class="d-flex justify-content-between align-items-baseline text-center">
          <div class="col-2">
            <img :src="message.User.imageProfileUrl" class="card-img-top rounded-pill" alt="Photo de profil" style="width: 4rem; height: 4rem;">
          </div>
          <div class="col-5">
            <p class="fw-bold "> {{ message.User.firstName }} {{ message.User.lastName}} |
            {{message.User.job}}
            </p>
          </div>
          <div class="col-5">
            <img src="../assets/Logo/icon.svg" alt="Logo Groupomania" width="30" height="34"> Groupomania
          </div>
        </div> 
      </div>
      <div class=" tail d-flex justify-content-center align-items-center">
        <div> 
          <img :src="message.gif" class="obj-fit w-100 rounded" alt="Gif">
          <p class="border rounded shadow py-2 px-2 text-center">{{ message.content }}</p>
          <input v-if="mode == 'modificationProfile'" v-model="content" type="text" maxlength="250" class="form-control w-100" id="inputPostMessage" placeholder="Partager avec vos collègues en écrivant une publication" style="height: 3rem;">  
        </div>
        <div>
          <p class="ps-2">
            <a @click="updateProfile(message.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
              </svg>
            </a>
          </p>
          <p class="ps-2">
            <a @click="deleteProfile(message.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-archive" viewBox="0 0 16 16">
              <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </a>
          </p>
          <p class="ps-2">
            <a href="">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-suit-heart" viewBox="0 0 16 16">
              <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
              </svg>
            </a> 
          </p>
        </div>  
      </div>  
        <div class="border-top">
          
          <div class="col  d-flex justify-content">
            <div class="col-9 text-center">
              COMMENTS
            </div>
            <div class="col-3 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-suit-heart" viewBox="0 0 16 16">
              <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
            </svg>
            </div>
          </div> 
        </div>
    </div>
  </div>
</template>

<script>

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
  name: 'GetAllMessages',

  data() {
    return {
      userId: localStorage.getItem('userId'),
      messages: [],
    }
  },

  beforeMount: function () {
        
        instance.get('/api/messages')
        .then(res => { 
        this.messages = res.data
        })
        .catch((error)=>{
        console.log(error)
        });
  },

  methods: {

    modificationProfile: function () {
      this.mode = 'modificationProfile'
    },
    
    deleteProfile: function (id) {
      instance.delete(`/api/messages/`+ id)
        .then(() => { 
          alert('post supprimé !');
          location.reload();
        })
        .catch((error)=>{
          console.log(error)
        }); 
    },

    updateProfile: function (id) {
      instance.put(`/api/messages/`+ id)
        .then(() => { 
          alert('post modifié !');
        })
        .catch((error)=>{
          console.log(error)
        }); 
    },
  }
}
</script>

<style scoped>
.obj-fit {
  object-fit: cover;
}

.tail{
  width: 70%;
}

</style>