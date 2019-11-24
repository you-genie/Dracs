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
            <v-card-text><span>Selected by User</span></v-card-text>
        </v-card>
        <v-card 
            class="ma-3"
            height="60%"
            outlined
            v-bind:color="cardColor"
            v-on:dragover="allowDrop"
            v-on:dragleave.prevent="leaveDrag"
            v-on:drop="drop">
            <v-card-text><span>On Vote</span></v-card-text>
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
            semesterId: Number
        },
        components: {
            SelectChip: () => import('@/components/chips/SelectChip')
        },
        beforeMount() {
          this.readData();
        },
        data: () => ({
            text: "temp",
            cardColor: "undefined"
        }),
        methods: {
            readData : function() {
              this.$store.dispatch("getQuestions");
            },
            leaveDrag: function() {
                this.$emit('drag-leave-semester')
                this.cardColor = "undefined"
            },
            allowDrop: function(event) {
                event.preventDefault();
                this.$emit('drag-allow-semester', this.semesterId)
                this.cardColor = "grey lighten-3"
            },
            drop: function() {
                event.preventDefault();
                this.$emit('drag-dropped-semester', this.semesterId)
                this.cardColor = "undefined"
            },
            deselect: function(courseId) {
                this.$emit('deselect-course', this.semesterId, courseId)
            },
            vote: function(courseId, voteState, prevVote) {
                this.$emit('vote', this.semesterId, courseId, voteState, prevVote)
            }
        }
    }
</script>