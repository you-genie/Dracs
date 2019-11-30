<template>
  <div id="Question"> 
    <answer-board 
      :questionId="questionId"/>
    <question-card
      :questionId="questionId" />
    <comment-slot
      :questionId="questionId" />
  </div>
</template>

<script>
// this is page for answer.
// import banner, answer-card, answer-board component. Fill in banner plz.
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'Question',
    props: {
      questionId: String
    },
    computed: {
      ...mapState(['my_questions']),
      questionInfo() {
        return this.my_questions[this.questionId]
      }
    },
    components: {
        AnswerBoard: () => import('@/components/boards/SelectBoard'),
        QuestionCard: () => import('@/components/cards/MyQuestionInfoCard'),
        CommentSlot: () => import('@/components/comments/MyCommentSlot')
    },
    methods: {
      ...mapActions(['fetchQuestionWithId'])
    },
    watch: {
      questionInfo(newInfo) {
        this.fetchQuestionWithId({questionId: this.questionId})
      }
    }
  }
</script>