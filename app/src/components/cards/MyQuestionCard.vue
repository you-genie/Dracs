<template>
  <v-card 
    outlined
    :disabled="!loggedIn"
    @click='route'
    class="ma-3">
    <v-list three-lines
      dense>
      <v-list-item>
        <v-list-item-content>
          <v-list-tile-title>{{ title }}</v-list-tile-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-text>
      <span class="d-inline-block">
        {{body}}
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
 import {
    mapState, mapActions 
    // mapGetters
  } from 'vuex'
  import * as firebase from 'firebase'

  export default {
    name: "QuestionCard",
    data: () => ({

    }),
    props: {
      title: String,
      body: String,
      questionId: String
    },
    computed: {
      ...mapState(['majorTags']),
      loggedIn() {
        return firebase.auth().currentUser
      }
    },
    methods: {
      ...mapActions(['goToQuestion']),
      route () {
          this.goToQuestion({questionId: this.questionId});
      }
    }
  }
</script>