<template>
  <v-app-bar
    app
    flat
  >
  <v-toolbar flat>
      <v-toolbar-title>Home</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text> (You have {{this.myReputationPts}} Rep points)</v-btn>
      </v-toolbar-items>
      
    </v-toolbar>

    <v-toolbar-side-icon
      class="hidden-md-and-up"
    />

    <v-container
      mx-auto
      py-0
    >
      <v-layout>


      </v-layout>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState(['myReputationPts'])
    },
    watch: {
    },
    methods: {
    }
  }
</script>
