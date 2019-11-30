<template>
    <div id="Answer"> 
      <answer-card
        :questionId="questionId" />
      <answer-board 
        :questionId="questionId"/>
      <comment-slot 
        :questionId="questionId" />
    </div>
</template>

<script>
// this is page for answer.
// import banner, answer-card, answer-board component. Fill in banner plz.
  import { mapState, mapActions } from 'vuex'
  export default {
      name: 'Answer',
      props: {
        questionId: String
      },
      computed: {
        ...mapState(['questions']),
        questionInfo() {
          return this.questions[this.questionId]
        }
      },
      components: {
          AnswerBoard: () => import('@/components/boards/DragBoard'),
          AnswerCard: () => import('@/components/cards/QuestionInfoCard'),
          CommentSlot: () => import('@/components/comments/CommentSlot')
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