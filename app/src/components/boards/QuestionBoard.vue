<template>
  <v-container max-width="40%">
    <v-subheader>Questions waiting for you</v-subheader>
    <question-card
      v-for="(question, key) in questionInfos"
      v-bind:key="key"
      :title="question.title"
      :user = "users[question.userID]"
      :questionId="key"
      :body="question.body" />
  </v-container>
</template>

<script>
 import {
    mapState, 
    // mapGetters
  } from 'vuex'

  export default {
    name: "QuestionBoard",
    components: {
      QuestionCard: () => import('@/components/cards/MainQuestionCard')
    },
    computed: {
        ...mapState(['users', 'user', 'questions']),
        questionIds () {
          return this.questionIdLists.slice(0, 5)
        },
        questionInfos() {
          let infos = {}
          this.questionIds.forEach(questionId => {
            if (this.questions[questionId]) {
              infos[questionId] = this.questions[questionId];
            }
          })
          return infos
        }
    },
    props: {
      questionIdLists: Array
    },
    methods: {
      getUser (id) {
        Object.keys(this.users).forEach(doc => {
          if (this.users[doc].userID == id) {
            console.log(this.users[doc])
            return this.users[doc]
          }
        });
        return undefined
      }
    }
  }
</script>