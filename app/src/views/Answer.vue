<template>
    <div id="Answer"> 
<!--     <banner />
    <answer-card />
    <answer-board /> -->
    <test-board />
    </div>
</template>

<script>
// this is page for answer.
// import banner, answer-card, answer-board component. Fill in banner plz.
    export default {
        name: 'Answer',
        components: {
            TestBoard: () => import('@/components/DragBoard')
        }
    }
</script>