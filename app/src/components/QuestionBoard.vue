<template>
  <v-container max-width="40%">
    <v-subheader>Questions waiting for you</v-subheader>
    <question-card
      v-for="(question, key) in questions"
      v-bind:key="key"
      :title="question.title"
      :user="users[question.userID]"
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
      QuestionCard: () => import('@/components/QuestionCard')
    },
    computed: {
        ...mapState(['users', 'user', 'questions']),
    },
    props: {
      questions: Array
    },
  }
</script>