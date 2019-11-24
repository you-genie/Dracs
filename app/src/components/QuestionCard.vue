<template>
  <v-card 
    height="150"
    outlined 
    class="ma-3">
    <v-list three-lines
      dense>
      <v-list-item>
        <v-list-item-content>
          <v-list-tile-title>{{ title }}</v-list-tile-title>
          <v-list-item-title><small><b>{{majorTags[user.major]}}</b> dept. student in semester {{user.currentSemester}} asks this</small></v-list-item-title>
          <v-list-item-subtitle>
            <v-chip x-small label class="ma-1"
              v-for="(area, index) in user.interestedArea"
              :key="index">{{area}}</v-chip>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-text>
      <span class="d-inline-block text-truncate" style="max-width:300px">
        {{body}}
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
 import {
    mapState, 
    // mapGetters
  } from 'vuex'
  export default {
    name: "QuestionCard",
    data: () => ({

    }),
    props: {
      title: String,
      body: String,
      user: Object
    },
    computed: {
      ...mapState(['majorTags'])
    }
  }
</script>