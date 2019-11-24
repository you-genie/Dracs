<template>
        <v-col>
            <v-row noGutters alignXl justify="center">
                <semester-board 
                    v-for="(semester, index) in semesters"
                    v-bind:key="index"
                    :semester="semester.semester"
                    :semesterId="index"
                    :items="semester.courses"
                    v-on:select-course="selectChip"
                    v-on:deselect-course="deselectChip"/>
            </v-row>
        </v-col>
</template>
<script>
    import {
        mapState
    } from 'vuex'

    export default {
        name: "SelectBoard",
        components: {
            SemesterBoard: () => import('@/components/MySemesterBoard')
        },
        props: {
            questionId: String
            // semesters: Array
        },
        computed: {
            ...mapState({user: 'user', courseInfos: 'courses'}),
            semesters () {
                return this.$store.state.my_questions[this.questionId].semesters
            } 
        },
        data: () => ({
            nullInfo: {
                code: "Temp",
                enName: "Temp",
                koName: "Temp"
            },
            currentId: -1,
            currentSemesterId: -1,
            onDrag: false
        }),
        methods: {
            deselectChip: function(semesterId, courseId) {
                this.semesters[semesterId].courses[courseId].selected = false
            },
            selectChip: function(semesterId, courseId) {
                this.semesters[semesterId].courses[courseId].selected = true
            },
            vote: function(semesterId, courseId, voteState, prevVote) {
                if (voteState === 'down') {
                    this.semesters[semesterId].courses[courseId].votes.down += 1
                } else if (voteState === 'up') {
                    this.semesters[semesterId].courses[courseId].votes.up += 1
                } else if (voteState === 'hmm') {
                    this.semesters[semesterId].courses[courseId].votes.hmm += 1
                }

                if (prevVote === 'down') {
                    this.semesters[semesterId].courses[courseId].votes.down -= 1
                } else if (prevVote === 'up') {
                    this.semesters[semesterId].courses[courseId].votes.up -= 1
                } else if (prevVote === 'hmm') {
                    this.semesters[semesterId].courses[courseId].votes.hmm -= 1
                }
            }
        }
    }
</script>