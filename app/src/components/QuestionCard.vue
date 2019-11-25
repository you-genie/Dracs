<template>
  <v-card 
    outlined 
    @click='route'
    class="ma-3">
    <v-list three-lines
      dense>
      <v-list-item>
        <v-list-item-content>
          <v-list-tile-title>{{ title }}</v-list-tile-title>
          <v-list-item-title><small><b>{{majorTags[user.major]}}</b> dept. student in semester {{user.currentSemester}} asked this</small></v-list-item-title>
          <v-list-item-subtitle>
            <v-chip x-small label class="ma-1">{{user.interestedArea}}</v-chip>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-text style="padding-top:0px;">
      <span class="d-inline-block">
        {{body}}
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
 import {
    mapState,
    mapActions
    // mapGetters
  } from 'vuex'

  export default {
    name: "QuestionCard",
    data: () => ({

    }),
    beforeMount() {
      // console.log(this.questionId);
      // console.log(this.user);
      // console.log(this.body);
    },
    props: {
      title: String,
      body: String,
      user: Object,
      userID: String,
      questionId: String
    },
    computed: {
      ...mapState(['majorTags', 'users']),
    },
    methods: {
      ...mapActions(['goToAnswer']),
      route () {
          this.goToAnswer({questionId: this.questionId});
      }
    }
  }
</script>