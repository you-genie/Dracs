<template>
    <v-card
        max-width="30%"
        class="auto"
        width="70%"
        height="500"
    >
        <v-card-title>{{semester}}</v-card-title>
        <v-divider></v-divider>
        <v-card 
            outlined
            class="ma-3"
            height="15%">
            <v-card-text><span>Selected courses by me</span></v-card-text>
        </v-card>
        <v-card 
            class="ma-3"
            height="60%"
            outlined
            v-bind:color="cardColor">
            <v-card-text><span>Suggestions for me</span></v-card-text>
            <v-container>
                <select-chip 
                    v-for="(course, index) in items" v-bind:key="index"
                    v-on:deselect="deselect"
                    v-on:vote="vote"
                    :index="course.index"
                    :my-chip="course.myChip"
                    :votes="course.votes"
                    :courseId="index" />
            </v-container>
            <v-container>
            </v-container>
        </v-card>
    </v-card>
</template>
<script>
    export default {
        name: "SemesterBoard",
        props: {
            semester: String,
            items: Array,
            semesterId: Number,
        },
        components: {
            SelectChip: () => import('@/components/chips/MySelectChip')
        },
        data: () => ({
            text: "temp",
            cardColor: "undefined"
        }),
        methods: {
            deselect: function(courseId) {
                this.$emit('deselect-course', this.semesterId, courseId)
            },
            vote: function(courseId, voteState, prevVote) {
                this.$emit('vote', this.semesterId, courseId, voteState, prevVote)
            }
        }
    }
</script>