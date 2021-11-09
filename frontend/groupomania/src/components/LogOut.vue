<template>
  <a @click="disconnectAccount" class="btn btn-primary">Déconnexion</a>
</template>

<script>

import router from '../router'

export default {
  name: 'LogOut',

  methods: {
    
    disconnectAccount: function () {
      localStorage.clear();
      router.push({ path: '/' });
    },
  }
}
</script>