<template>
 <div class="container d-flex justify-content-center my-3">
  <form class="form row card border rounded" enctype="multipart/form-data">
    <p v-if="errors.length" class="bg-danger text-white py-1 px-2 rounded">
      <span>Veuillez corriger les erreurs suivantes :</span>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <div class="col card-body d-flex align-items-center flex-column py-2">
        <img :src="gif" class="card-img-top obj-fit mt-2 w-100" alt="gif" style="height: 12rem;">
        <input v-model="content" aria-label="Ajoutez un texte" type="text" maxlength="250" class="form-control w-100" id="inputPostMessage" placeholder="Partager avec vos collègues en écrivant une publication" style="height: 3rem;">
        <input @change="fileSelected" aria-label="Ajoutez un fichier" ref="file" type="file" id="file" name="file" accept=".png, .jpg, .jpeg, .gif" class="card-link form-control mt-2">
        <a @click="postMessage" class="card-link btn btn-success w-75 mt-2">Publier</a>
    </div>
  </form>
 </div>
</template>

<script>

import notGifProfile from "../../assets/input_home.png"
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
	name: 'PostMessage',
  
  data() {
    return {
      userId: localStorage.getItem('userId'),
      content:'',
      gif: '',
      file:'',
      errors: []
    }
  },

  mounted: function () {

    instance.get(`/api/messages`, {
      headers: {
                "Authorization": "Bearer " + token,
              }
    })
    .then(() => {  
      this.gif= notGifProfile 
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

      this.errors = [];

      if(this.content == '' && this.file == ''){
        this.errors.push("Votre publication est vide, veuillez poster au moins un texte ou une image.");
      }

      if (this.errors.length)
      {
        return true;
      }

      else {
      instance.post(`http://localhost:8000/api/messages/new/${this.userId}`, fd, {
        headers:  {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": "Bearer " + token,
                  }  
      })
      .then(() => {
       location.reload();
      })
      .catch((error)=>{
        console.log(error)
      });
      }
    },
  }   
}

</script>

<style scoped>

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