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
        name: "DragBoard",
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
                return this.$store.state.questions[this.questionId].semesters
            },
            courses() {
                return this.$store.state.questions[this.questionId].courses               
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
                this.semesters[semesterId].courses[courseId].votes.up -= 1
                const targetCourse = this.semesters[semesterId].courses[courseId]
                if (targetCourse.votes.up > 0 || targetCourse.votes.down > 0 || targetCourse.votes.hmm > 0 ) {
                    this.semesters[semesterId].courses[courseId].myChip = false
                } else {
                    this.semesters[semesterId].courses.splice(courseId, 1)
                }
                
                this.courses.push(targetCourse.index)
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