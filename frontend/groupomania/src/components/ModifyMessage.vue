<template>
  <div class="bloc-modale" v-if="revele" >
    <div class="overlay"></div>
      <div class="modale card">
        <div class="btn-modale btn btn-danger" @click="returnHome">X</div>
          <h2 class="text-center">Modifier mon message</h2>
          <textarea @click="e" v-model="this.content" rows="3" class="col-9 w-100" maxlength="250"></textarea>
          <input @change="fileSelected"  ref="file" type="file" id="file" name="file" accept=".png, .jpg" class="form-control mt-2">
          <a @click="updateMessage(id)" class="btn btn-success rounded-pill mt-2">Modification terminée - Retour home</a>
          <a @click="returnHome" class="w100 mx-auto mt-1 text-decoration-none">Annuler</a>
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
  name: "ModifyMessage",
  
  props: ['revele','toggleModal'],
  
  data() {
    return {
        userId: localStorage.getItem('userId'),
        file:'',
        content:'',
    };
  },

  methods: {

    e: function () { 
      
    const idi = localStorage.getItem('messageId')

    instance.get(`/api/messages/${idi}`)
      .then((res) => { 
        this.content = res.data.content
      })
      .catch((error)=>{
        console.log(error)
      });
  },

    fileSelected: function (e){
        
      this.file = this.$refs.file.files[0];
      const reader = new FileReader(e);
      reader.readAsDataURL(this.file);
      reader.onload = e =>{
      this.gif = e.target.result;
      }

      const id = localStorage.getItem('messageId');
      const fd = new FormData();
      fd.append('image', this.file )
      
      instance.put(`/api/messages/${id}`, fd, {
        headers:  {
                    'Content-Type': 'multipart/form-data',
                  }  
      })
      .then(() => { 
      })
      .catch((error)=>{
        console.log(error)
      }); 
    },

    updateMessage: function () {

      const id = localStorage.getItem('messageId');
      
      instance.put(`/api/messages/${id}`,{
        content: this.content
      })
      .then(() => {
        location.reload();
      })
      .catch((error)=>{
        console.log(error)
      }); 
    },

    returnHome: function () {
      localStorage.removeItem('messageId');
      location.reload();
    }
  }
};

</script>

<style scoped>

textarea  {
  resize: none;
}

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