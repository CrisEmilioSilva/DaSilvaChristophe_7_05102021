<template>
   <div class="row card mt-3 w-50 border rounded shadow">
    <div class="col card-body d-flex justify-content-center align-items-center flex-column py-2">
        <p>{{content}}</p>
        <a @click="postMessage" class="card-link btn btn-outline-primary w-25 mt-2">Publier</a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GetAllMessages',

  data() {
    return {
      userId: localStorage.getItem('userId'),
      users:'',
      content:'',
      gif:''
    }
  },
  created: function () {
        instance.get('/api/users/all')
        .then(res => { 
        this.users = res.data.users
        })
        .catch((error)=>{
        console.log(error)
        });

        instance.get('/api/messages/all')
        .then(res => { 
        this.content = res.data.content, 
        this.gif = res.data.gif
        })
        .catch((error)=>{
        console.log(error)
        });
  },
}
</script>

<style>

</style>