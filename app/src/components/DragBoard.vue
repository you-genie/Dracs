<template>
    <v-container>
        <v-col>
            <v-row justify="space-between">
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

    </v-container>
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
            unselected: Array,
            // semesters: Array
        },
        computed: {
            ...mapState({user: 'user', courseInfos: 'courses'}),
        },
        data: () => ({
            nullInfo: {
                code: "Temp",
                enName: "Temp",
                koName: "Temp"
            },
            currentId: -1,
            semesters: [
              {
                semester: "2020 Spring",
                courses: [
                  {
                    index: 0,
                    selected: false,
                    myChip: false,
                    votes: {
                      up: 3,
                      down: 1
                    }
                  },
                ]
              },
              { semester: "2020 Fall", courses:[] },
              { semester: "2021 Spring", courses: []}
            ],
            courses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
            selected: [

                {
                    semester: "2020 Spring",
                    items: [
                        {
                            code: "CS489",
                            enName: "Computer Ethic & Social Issues",
                            koName: "컴퓨터 윤리와 사회문제",
                            my_item: false,
                            votes: 1
                        },
                        {
                            code: "CS520",
                            enName: "Theory of Programming Languages",
                            koName: "프로그래밍 언어 이론",
                            my_item: false,
                            votes: 0
                        }
                    ]
                },
                {
                    semester: "2020 Fall",
                    items: [
                        {
                            code: "CS101",
                            enName: "Introduction to Programming",
                            koName: "프로그래밍 개론",
                            votes: 1
                        }
                    ]
                },
                {
                    semester: "2021 Spring",
                    items: [
                    ]
                }
            ],
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
                    var item = this.courses[this.currentId]
                    var index = this.semesters[semesterId].courses.findIndex(x => x.code === item.code);
                    if (index >= 0) {
                        this.semesters[semesterId].courses[index].votes.up += 1
                        this.semesters[semesterId].courses[index].myChip = true
                    } else {
                        item.my_item = true
                        item.votes += 1
                        this.selected[semesterId].items.push(item)                        
                    }
                    this.unselected.splice(this.currentId, 1)
                    this.currentId = -1
                    this.currentSemesterId = -1
                }
                this.onDrag = false
            },
            deselectChip: function(semesterId, courseId) {
                const targetCourse = this.selected[semesterId].items[courseId]
                var item = {
                    code: targetCourse.code,
                    enName: targetCourse.enName,
                    koName: targetCourse.koName,
                    votes: targetCourse.votes - 1,
                }
                if (item.votes > 0) {
                    this.selected[semesterId].items[courseId].votes -= 1
                    this.selected[semesterId].items[courseId].my_item = false
                } else {
                    this.selected[semesterId].items.splice(courseId, 1)
                }
                
                this.unselected.push(item)
            },
            vote: function(semesterId, courseId, voteState) {
                if (voteState === 'downvote') {
                    this.selected[semesterId].items[courseId].votes -= 1

                } else if (voteState === 'upvote') {
                    this.selected[semesterId].items[courseId].votes += 1
                }
            }
        }
    }
</script>