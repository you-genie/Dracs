<template>
  <v-card 
    outlined 
    class="ma-3">
    <v-card-title primary-title>
      {{ questionInfo.title }}
    </v-card-title>
    <v-list three-lines
      dense>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title><big><b>{{majorTags[questioner.major]}}{{questioner.minor >= 0 ? " / with minor "+subMajorTags[questioner.minor] : ""}}{{questioner.doubleMajor >= 0 ? " / with double major "+subMajorTags[questioner.doubleMajor] : ""}}</b></big> student in <big><b>semester {{questioner.currentSemester}}</b></big> asked this</v-list-item-title>
          <v-list-item-subtitle>
            <small>I am interested in:  </small>
            <v-chip x-small label class="ma-1">{{questioner.interestedArea}}</v-chip>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <small> I took these classes: </small>
            <v-chip x-small color="green lighten-3" label class="ma-1"
              v-for="(course, index) in questioner.certificates"
              :key="index">{{courses[course].code}}</v-chip>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-text>
      <span class="d-inline-block">
        {{questionInfo.body}}
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
    name: "QuestionInfoCard",
    data: () => ({

    }),
    props: {
      questionId: String,
    },
    computed: {
      ...mapState(['majorTags', 'subMajorTags', 'users', 'questions', 'courses']),
      questionInfo () {
        return this.questions[this.questionId]
      },
      questioner () {
        const questionerId = this.questions[this.questionId].userID
        for (var key in this.users) {
          if (this.users[key].userID === questionerId) {
            return this.users[key]
          }
        }
        return undefined 
      }
    }
  }
</script>