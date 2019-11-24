<template>
    <v-col>
            <v-row noGutters alignXl>
                <semester-board 
                    v-for="(semester, index) in semesters"
                    v-bind:key="index"
                    :semester="semester.semester"
                    :semesterId="index"
                    :items="semester.courses"
                    v-on:drag-over-semester="getSemesterDrag"
                    v-on:drag-leave-semester="leaveSemesterDrag"
                    v-on:drag-dropped-semester="addSemesterChip"
                    v-on:deselect-course="deselectChip"
                    v-on:vote="vote"/>
            </v-row>
            <v-row justify="center">
                <unselected-chip 
                    v-for="(course, index) in courses"
                    v-bind:key="index" class="text-center"
                    :index="course"
                    :courseId="index"
                    v-on:drag-on="getDrag"
                    v-on:drag-end="addSemesterChip"/>
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
            UnselectedChip: () => import('@/components/chips/DragChip'),
            SemesterBoard: () => import('@/components/SemesterBoard')
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
            // semesters: [
            //   {
            //     semester: "2020 Spring",
            //     courses: [
            //       {
            //         index: 0,
            //         selected: false,
            //         myChip: false,
            //         votes: {
            //           up: 3,
            //           down: 1,
            //           hmm: 0
            //         }
            //       },
            //     ]
            //   },
            //   { semester: "2020 Fall", courses:[] },
            //   { semester: "2021 Spring", courses: []}
            // ],
            // courses: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
            currentSemesterId: -1,
            onDrag: false
        }),
        methods: {
            getDrag: function (courseId) {
                this.currentId = courseId
                this.onDrag = true
            },
            getSemesterDrag: function(semesterId) {
                this.currentSemesterId = semesterId
            },
            leaveSemesterDrag: function() {
                this.currentSemesterId = -1
            },
            addSemesterChip: function(semesterId) {
                if (this.currentId >= 0) {
                    const itemId = this.courses[this.currentId]
                    
                    var index = this.semesters[semesterId].courses.findIndex(x => x.index === itemId);
                    if (index >= 0) {
                        this.semesters[semesterId].courses[index].votes.up += 1
                        this.semesters[semesterId].courses[index].myChip = true
                    } else {
                        var item = {
                            index: itemId,
                            selected: false,
                            myChip: true,
                            votes: {
                                up: 1,
                                down: 0,
                                hmm: 0
                            }
                        }
                        this.semesters[semesterId].courses.push(item)                        
                    }
                    this.courses.splice(this.currentId, 1)
                    this.currentId = -1
                    this.currentSemesterId = -1
                }
                this.onDrag = false
            },
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