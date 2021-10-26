<template>
  <a @click="disconnectAccount" class="btn">Déconnexion</a>
</template>

<script>

import router from '../router'

export default {
  name: 'LogOut',

  methods: {
    
    disconnectAccount: function () {
      localStorage.removeItem('userId')
      localStorage.removeItem('token')
      router.push({ path: '/' });
    },
  }
}
</script>

<style>

</style>