<template>
  <main class="container">
    <p v-if="userAccountBlock == true" class="bg-danger py-2 px-2 text-center text-white">Votre compte a été bloquer temporairement par l'administrateur, aucune interaction avec les autres personnes du site ne vous est autorisée.</p>
    <div v-for="message in messages" v-bind:key="message.id" class="row card mt-3">
      <div class="card-body border-bottom shadow">
        <div class="d-flex align-items-center">
          <div class="col-4">
            <img :src="message.User.imageProfileUrl || notImgProfile" class="card-img-top rounded-pill" alt="Photo de profil" style="width: 3rem; height: 3rem;">
          </div>
          <div class="col-4">
            <span class="fw-bold border-bottom py-1"> {{ message.User.firstName }} {{ message.User.lastName}} </span>
          </div>
          <div>
            <span class="col-4 fw-bold border-bottom py-1"><img src="../../assets/Logo/icon.svg" alt="Logo Groupomania" width="30" height="34"> {{message.User.job}}</span>
          </div>
        </div> 
      </div>
      <div class="row d-flex align-items-center mt-2">
        <div class="col-10 bg-light border-end border-success d-flex flex-column align-items-center"> 
          <img :src="message.gif || notGifProfile" class="obj-fit rounded mt-2" alt="Gif">
          <p class="text-center mt-2 border-bottom">{{ message.content }} <br> Posté le {{ format_date(message.createdAt) }}</p>
        </div>
        <div class="col-2 d-flex justify-content-center">
          <div v-if="userAccountBlock == false" class="bg-light w-50 d-flex flex-column align-items-center ms-4 py-2 px-4 border rounded-pill shadow">
            <span class="py-1 px-1">
              <a @click="toggleModal(message.id)" v-if="userId == message.UserId || this.admin == true" data-bs-toggle="tooltip" data-bs-placement="right" title="Modifier">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="blue" class="bi bi-arrow-clockwise cursor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                </svg>
              </a>
            <ModifyMessage v-bind:revele="revele" v-bind:toggleModal="toggleModal"></ModifyMessage>
            </span>
            <span class="py-1 px-1">
              <a @click="deleteMessage(message.id)" v-if="userId == message.UserId || this.admin == true" data-bs-toggle="tooltip" data-bs-placement="right" title="Supprimer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" class="bi bi-archive cursor" viewBox="0 0 16 16">
                <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </a>
            </span>
            <span class="py-1 px-1">
              <a @click="liked(message.id)" data-bs-toggle="tooltip" data-bs-placement="right" title="Like" >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="green" class="bi bi-suit-heart cursor" viewBox="0 0 16 16">
                <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
                </svg>
              </a>
            </span>
            <span class="py-1 px-1">
              <a @click="disliked(this.likeId)" v-if="mode == 'disliked' && (this.userId == this.likeUserId && message.id == this.likeMessageId)" data-bs-toggle="tooltip" data-bs-placement="right" title="Like" >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="blue" class="bi bi-suit-heart cursor" viewBox="0 0 16 16">
                <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
                </svg>
              </a>
            </span>
          </div>
        </div> 
      </div> 
       <div class="row d-flex py-2 mx-auto border-top border-success">
        <div v-if="userAccountBlock == false" class="col-9">
          <input v-model="commentaire" aria-label="Ajoutez un fichier" type="text" class="form-control my-2" id="inputContent" maxlength="250" placeholder="Commentez la publication">
        </div>
        <div v-if="userAccountBlock == false" class="col-3 ">
          <a @click="postComment(message.id)" class="btn btn-success rounded-pill my-2">Publier</a>
        </div>
        <div v-for="comment in comments" v-bind:key="comment.id">
          <div v-if="message.id == comment.MessageId" class="bg-light w-100 border-success rounded my-2  py-2 d-flex flex-wrap">
              <div class="col-4 ps-2">
                <span>
                  <img :src="comment.User.imageProfileUrl || notImgProfile" class="rounded-pill mb-1" alt="Photo de profil" style="width: 2rem; height: 2rem;"> <br> {{ comment.User.firstName }} {{ comment.User.lastName }}
                </span>
              </div>
              <div class="col-8 pe-2">
                <textarea v-model="commentaire" v-if="mode == 'modifComment' && this.commentId == comment.id" aria-label="Modifiez votre commentaire" rows="3" class="col-9 w-100" maxlength="250"></textarea>
                <p v-else class="text-center border-bottom border-success py-2 px-2"> {{ comment.commentaire }} </p>
              </div>
              <div v-if="userAccountBlock == false" class="col-9 d-flex justify-content-between">
                <p class="ps-2"> Posté le {{ format_date(comment.createdAt) }} </p>
                <a @click="modifComment(comment.id)" v-if="userId == comment.UserId || this.admin == true" class="noActive text-decoration-none text-end cursor text-black">Modifier</a>
                <a @click="annulerModifCom()" v-if="userId == comment.UserId && mode == 'modifComment' || this.admin == true && mode == 'modifComment'" class="text-decoration-none text-end cursor text-black">Annuler</a>  
              </div>
              <div v-if="userAccountBlock == false" class="col-3">
                <span class="px-1">
                  <a @click="updateComment(comment.id)" v-if="userId == comment.UserId && mode == 'modifComment' || this.admin == true && mode == 'modifComment'" class="cursor" data-bs-toggle="tooltip" data-bs-placement="right" title="Modifier">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="blue" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                    </svg>
                  </a>
                </span>
                <span class="px-1">
                  <a @click="deleteComment(comment.id)" v-if="userId == comment.UserId || this.admin == true" class="cursor" data-bs-toggle="tooltip" data-bs-placement="right" title="Supprimer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" class="bi bi-archive" viewBox="0 0 16 16">
                    <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                  </a>
                </span>
              </div>
          </div>
        </div>
      </div> 
    </div>
  </main>
</template>

<script>

import ModifyMessage from "./ModifyMessage.vue"
import notGifProfile from "../../assets/input_home.png"
import notImgProfile from "../../assets/avatar.png"
import format_date from "./format_date.js"
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
  name: 'MessagesHome',

  components: {
    ModifyMessage,
  },

  data() {
    return {
      userId: localStorage.getItem('userId'),
      mode: '',
      messages: [],
      comments:[],
      commentId: '',
      commentaire: '',
      likes: [],
      admin:'',
      userAccountBlock:'',
      notGifProfile,
      notImgProfile,
      format_date,
      revele: false,
      likeUserId:'',
      likeMessageId:'',
      likeId = '',
    }
  },

  mounted: function () {
    
    const token = localStorage.getItem('token');

    const instance = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json", 
                      "Authorization": "Bearer " + token,
                }
    });

    instance.get(`/api/users/${this.userId}`,{
       headers: {
                "Content-Type": "application/json",
                "Accept": "application/json", 
                "Authorization": "Bearer " + token,
              }
    })
    .then(res => { 
      this.admin = res.data.admin
      this.userAccountBlock = res.data.userAccountBlock
    })
    .catch((error)=>{
      console.log(error)
    });  
    
    instance.get(`/api/messages/`, {
      headers: {
                "Authorization": "Bearer " + token,
              }
    })
    .then(res => { 
      this.messages = res.data
    })
    .catch((error)=>{
      console.log(error)
    });

    instance.get(`/api/comments/` ,{
      headers: {
                "Content-Type": "application/json",
                "Accept": "application/json", 
                "Authorization": "Bearer " + token,
              }
    })
    .then(res => { 
      this.comments = res.data
    })
    .catch((error)=>{
      console.log(error)
    });

    instance.get(`/api/likes/`, {
      headers: {
                "Authorization": "Bearer " + token,
              }
      })
      .then(res => {
        this.likes = res.data
      })
      .catch((error)=>{
        console.log(error)
      });
  },

  methods: {

    // Message
    
    toggleModal: function (id) {
      
      this.revele = !this.revele;
      
      instance.get(`/api/messages/` + id,)
      .then((res) => { 
        this.content = res.data.content
        localStorage.setItem('messageId',res.data.id) 
      })
      .catch((error)=>{
        console.log(error)
      }); 
    },
    
    deleteMessage: function (id) {
      
      instance.delete(`/api/messages/`+ id)
      .then(() => { 
        alert('post supprimé !');
        location.reload();
      })
      .catch((error)=>{
        console.log(error)
      }); 
    },

    // Comment

    postComment: function (id) {
      
      instance.post(`/api/comments/new/` + id, {
        commentaire: this.commentaire,
        UserId: this.userId,
      })
      .then(() => {
        location.reload()
      })
      .catch((error)=>{
        console.log(error)
      });
    },

    modifComment: function (id) {
     
      this.mode = 'modifComment'

      if(this.mode == 'modifComment') {
        document.querySelector('.noActive').style.display = 'none';
      }

      instance.get(`/api/comments/` + id,)
      .then(res => { 
        this.commentId = res.data.id
        this.commentaire = res.data.commentaire
      })
      .catch((error)=>{
        console.log(error)
      });
    },

    annulerModifCom: function () {
      location.reload();
    },

    updateComment: function (id) {

      this.mode = 'modifComment'
      
      instance.put(`/api/comments/` + id, {
        commentaire: this.commentaire
      })
      .then(() => {
        location.reload()
      })
      .catch((error)=>{
        console.log(error)
      });
    },

    deleteComment: function (id) {
      
      instance.delete(`/api/comments/`+ id)
      .then(() => { 
        alert('Commentaire supprimé !');
        location.reload();
      })
      .catch((error)=>{
        console.log(error)
      }); 
    },

    // Like

    liked: function (id) {

      instance.post(`/api/likes/liked/` + id,{
        headers: {
                "Authorization": "Bearer " + token,
              },
        UserId: localStorage.getItem('userId')
        })
        .then((res) => {
          this.mode = 'disliked';
          console.log(res.data);
        })
        .catch((error)=>{
          console.log(error)
        }) 
    },

    disliked: function (id) {

       instance.post(`/api/likes/disliked/` + id)
        .then((res) => { 
          this.mode = 'liked';
          console.log(res.data.id);
        })
        .catch((error)=>{
          console.log(error)
        })
    },
  }
}
</script>

<style scoped>

.obj-fit {
  object-fit: cover;
  width: 65%;
}

input {
  border-color: green;
}

textarea  {
  resize: none;
}

.cursor:hover {
cursor: pointer;
}

@media (max-width: 559px) {  
  .container{
    width: 90%;
  }
  .obj-fit {
  object-fit: cover;
  width: 100%;
  }
}

@media (min-width: 560px) and (max-width: 779px){  
  .container{
    width: 80%;
  }

.obj-fit {
  object-fit: cover;
  width: 80%;
  }
}

@media (min-width: 780px) and (max-width: 1199px){  
  .container{
    width: 70%;
  }
  
}

@media (min-width: 991px) and (max-width: 1199px){  
  .container{
    width: 60%;
  }
 
}

@media (min-width: 1200px) and (max-width: 1400px){  
  .container{
    width: 50%;
  }
  
}

</style>