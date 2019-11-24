<template>
  <v-app-bar app flat>
    <v-toolbar flat>
      <v-toolbar-title>Home</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text>({{this.isLoggedIn ? ("You have " + this.myReputationPts + " Rep points") : "Log in to get Rep points"}})</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <button @click="logInAndOut">{{this.isLoggedIn ? "Log Out" : "Log In"}}</button>

    <v-toolbar-side-icon class="hidden-md-and-up" />

    <v-container mx-auto py-0>
      <v-layout></v-layout>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase";
import store from '../../store'

export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapState(["myReputationPts", "isLoggedIn"])
  },
  watch: {},
  methods: {
    logInAndOut: function() {
      if (firebase.auth().currentUser == null) {
        // move to login page
        this.$router.replace("login");
      } else {
        // log out
        firebase
          .auth()
          .signOut()
          .then(() => {
            store.commit('changeLoginState', false)
          });
      }
    }
  }
};
</script>
