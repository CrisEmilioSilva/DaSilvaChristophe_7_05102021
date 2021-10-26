<template>
 <div class="container d-flex justify-content-center align-items-center flex-column mt-3">
  <form class="row card mt-3 w-50 border rounded shadow" enctype="multipart/form-data">
    <div class="col card-body d-flex justify-content-center align-items-center flex-column py-2">
        <img :src="gif" class="card-img-top gif mt-2 w-100" alt="Gif" style="height: 12rem;">
        <input v-model="content" type="text" maxlength="250" class="form-control w-100" id="inputPostMessage" placeholder="Partager avec vos collègues en écrivant une publication" style="height: 3rem;">  
        <input @change="fileSelected" ref="file" type="file" id="file" name="file" accept="image/*" class="card-link form-control mt-2">
        <a @click="postMessage" class="card-link btn btn-outline-primary w-25 mt-2">Publier</a>
    </div>
  </form>
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

    created: function () {
        instance.get(`/api/users/profil/${this.userId}`)
        .then(res => { 
            this.firstName = res.data.firstName, 
            this.lastName = res.data.lastName,
            this.job = res.data.job,
            this.imageProfileUrl = res.data.imageProfileUrl
        })
        .catch((error)=>{
            console.log(error)
        });
    },
    
    methods: {
      fileSelected: function (){
        this.file = this.$refs.file.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = e =>{
        this.gif = e.target.result;
        console.log(this.gif);}
      },
    
      postMessage: function () {
        
        const fd = new FormData();
        fd.append('image', this.file )
        fd.append('content',this.content)
        
        instance.post(`http://localhost:8000/api/messages/new`, fd, {
          headers:  {
                      'Content-Type': 'multipart/form-data'
                    }  
        })
        .then((res) => {
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

.gif {
  object-fit: cover;
}

</style>
