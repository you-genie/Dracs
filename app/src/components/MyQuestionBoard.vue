<template>
  <v-container max-width="40%">
    <v-subheader>My Questions</v-subheader>
    <question-card
      v-for="(question, key) in my_questions"
      v-bind:key="key"
      :title="question.title"
      :body="question.body" />
  </v-container>
</template>

<script>
 import {
    mapState, 
    // mapGetters
  } from 'vuex'
  export default {
    name: "MyQuestionBoard",
    components: {
      QuestionCard: () => import('@/components/MyQuestionCard')
    },
    computed: {
        ...mapState(['users', 'user', 'my_questions']),
    },
    props: {
      questions: Array
    },
  }
</script>