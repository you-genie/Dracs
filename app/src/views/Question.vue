<template>
    <div id="Question"> 
        <answer-board 
            :questionId="questionId"/>
        <question-card
            :questionId="questionId" />
    </div>
</template>

<script>
// this is page for answer.
// import banner, answer-card, answer-board component. Fill in banner plz.
    export default {
        name: 'Question',
        props: {
          questionId: String
        },
        components: {
            AnswerBoard: () => import('@/components/SelectBoard'),
            QuestionCard: () => import('@/components/MyQuestionInfoCard')
        }
    }
</script>