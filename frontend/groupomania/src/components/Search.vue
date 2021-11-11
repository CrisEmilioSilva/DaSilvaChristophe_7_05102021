<template>
    <div>
    <Nav/> 
    <div class="container">
        <h1 class="h3 my-5 px-3 py-2 bg-white text-black text-center rounded-pill shadow">Retrouvez vos collègues de chez Groupomania</h1>
        <div class="d-flex justify-content-center flex-wrap">
            <div v-for="user in users" v-bind:key="user.id" class="card row my-3 mx-3 d-flex rounded shadow" style="width: 10rem;">
            <img :src="user.imageProfileUrl || notImgProfile" class="card-img-top mt-3 rounded-circle" style="width: 10rem; height: 7rem"  alt="...">
            <div class="card-body text-center">
                <p class="card-text fw-bold"> {{user.firstName}} {{user.lastName}} </p>
                <a @click="seeProfile(user.id)" class="btn btn-outline-success">Voir profil</a>
            </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>

import Nav from '../components/Nav.vue'
import notImgProfile from "../assets/avatar.png"
import router from '../router'
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
	name: 'Search',

    data () {
        return {
            users: [],
            notImgProfile
        }
    },

    components: {
        Nav
    },
    
    mounted: function () {
        instance.get(`/api/users/` ,{
            headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json", 
                        "Authorization": "Bearer " + token,
                    }
        })
        .then(res => { 
        this.users = res.data
        })
        .catch((error)=>{
        console.log(error)
        });
    },
  
  methods: {
    seeProfile: function (id) {

    instance.get(`/api/users/` + id)
    .then(res => { 
      localStorage.setItem('seeProfileUserId',res.data.id);
      router.push({ path: '/profile-other-users' });
    })
    .catch((error)=>{
      console.log(error)
    }); 
    },
  }
};
  
</script>

<style scoped>

.card-img-top {
  object-fit: cover;
}

</style>