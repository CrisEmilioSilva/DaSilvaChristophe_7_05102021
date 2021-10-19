<template>
 <div id="app">
    <Nav/>
    <div class="container">
    <h1 class="text-center h2 mt-2"> Bienvenue sur ton profil {{ firstName }} 🙂</h1>
      <div class="row d-flex justify-content-center">
        <div class="card mx-5 my-5" style="width: 18rem;">
          <div class="card-body text-center">
            <h5 class="card-title">Vos Informations</h5>
            <p class="card-text">Prénom: {{ firstName }}</p>
            <p class="card-text">Nom: {{ lastName }} </p>
            <p class="card-text">Email: {{ email }}</p>
            <a href="#" class="btn btn-primary">Modifier</a>
          </div>
        </div>

        <div class="card mx-5 my-5" style="width: 18rem;">
          <img src="" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
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

const instance = axios.create({
  baseURL: 'http://localhost:8000'
  
});

export default {
	name: 'Profile',
	components: {
		Nav
	},
  data: function (){
    return{ 
      userId: localStorage.getItem('userId'),
      token: localStorage.getItem('token'),
      firstName : '',
      lastName:'',
      email: '',
      bio:''
      }
    },

    created: function () {
      
      
      instance.get(`/api/users/profil/${this.userId}`, {
         
                   headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + this.token,
                    }
                  
                })
            
            .then(res => { 
              this.firstName = res.data.firstName, 
              this.lastName = res.data.lastName,
              this.email = res.data.email
            })
    },
   
   
  methods: {
    
      
      
    },
}

</script>

<style scoped>

#app{
    box-sizing: border-box;
}

</style>