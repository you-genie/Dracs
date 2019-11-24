<template>
  <v-app-bar
    app
    flat
  >
    <v-toolbar-title >DraCS
    </v-toolbar-title>

    <v-btn icon color="primary" @click="goToHome"><v-icon>mdi-home</v-icon></v-btn>

    
  </v-app-bar>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    computed: {
    },
    watch: {
    },
    methods: {
      ...mapActions(['goToHome'])
    }
  }
</script>
