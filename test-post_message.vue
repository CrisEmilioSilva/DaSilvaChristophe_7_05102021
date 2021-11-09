<template>
 <div class="container d-flex justify-content-center align-items-center flex-column mt-3">
  <form class="form row card mt-3 border rounded shadow" enctype="multipart/form-data">
    <div class="col card-body d-flex justify-content-center align-items-center flex-column py-2">
        <img :src="gif" class="card-img-top obj-fit mt-2 w-100" alt="Gif" style="height: 12rem;">
        <input v-model="content" type="text" maxlength="250" class="form-control w-100" id="inputPostMessage" placeholder="Partager avec vos collègues en écrivant une publication" style="height: 3rem;">  
        <input @change="fileSelected" ref="file" type="file" id="file" name="file" accept=".png, .jpg" class="card-link form-control mt-2">
        <a @click="postMessage" class="card-link btn btn-outline-primary w-75 mt-2">Publier</a>
    </div>
  </form>
 </div>
</template>

<script>

import notGifProfile from "../assets/input_home.png"
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
	name: 'PostMessageHome',

  data() {
    return {
      userId: localStorage.getItem('userId'),
      imageProfileUrl: '',
      firstName: '',
      lastName:'',
      job:'',
      content:'',
      gif: '',
      file:''
    }
  },

  mounted: function () {
       const token = localStorage.getItem('token')
      instance.get(`/api/users/${this.userId}`, {
        headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json", 
                  "Authorization": "Bearer " + token,
                }
      })
      .then(res => { 
        this.firstName = res.data.firstName, 
        this.lastName = res.data.lastName,
        this.job = res.data.job,
        this.userId = res.data.id,
        this.imageProfileUrl = res.data.imageProfileUrl
      })
      .catch((error)=>{
        console.log(error)
      });

      instance.get(`/api/messages`, {
        headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json", 
                  "Authorization": "Bearer " + token,
                }
      })
      .then(res => {  
        if(res.data.gif == null){
          this.gif= notGifProfile
        } else {
          this.gif = res.data.gif
        }
      })
      .catch((error)=>{
        console.log(error)
      });
  },

  methods: {

    fileSelected: function (e){
      this.file = this.$refs.file.files[0];
      const reader = new FileReader(e);
      reader.readAsDataURL(this.file);
      reader.onload = e => {
      this.gif = e.target.result;
      }
    },
    
    postMessage: function () {
      const fd = new FormData();
      fd.append('image', this.file )
      fd.append('content',this.content)
        
      instance.post(`http://localhost:8000/api/messages/new/${this.userId}`, fd, {
        headers:  {
                    'Content-Type': 'multipart/form-data'
                  }  
      })
      .then((res) => {
        location.reload();
        console.log(res);
      })
      .catch((error)=>{
        console.log(error)
      });
    },
  }   
}

</script>

<style>

.obj-fit {
  object-fit: cover;
}

@media (max-width: 559px) {  
  .container {
    width: 90%;
  }
  .form {
    width: 80%;
  }
}

@media (min-width: 560px) {  
  .container {
    width: 80%;
  }
  .form {
    width: 70%;
  }
}

@media (min-width: 1199px) and (max-width: 1400px){  
  .container{
    width: 70%;
  }
  
}

</style>
