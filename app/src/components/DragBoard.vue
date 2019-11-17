<template>
    <v-container>
        <v-col>
            <v-row justify="space-between">
                <semester-board 
                    v-for="(semester, index) in selected"
                    v-bind:key="index"
                    :semester="semester.semester"
                    :semesterId="index"
                    :items="semester.items"
                    v-on:drag-over-semester="getSemesterDrag"
                    v-on:drag-leave-semester="leaveSemesterDrag"
                    v-on:drag-dropped-semester="addSemesterChip"
                    v-on:deselect-course="deselectChip"
                    v-on:vote="vote"/>
            </v-row>
            <v-row justify="center">
                <unselected-chip 
                    v-for="(course, index) in unselected"
                    v-bind:key="index" class="text-center"
                    :code="course.code"
                    :en-name="course.enName"
                    :ko-name="course.koName"
                    :courseId="index"
                    v-on:drag-on="getDrag"
                    v-on:drag-end="addSemesterChip"/>
            </v-row>
        </v-col>

    </v-container>
</template>
<script>
    export default {
        name: "DragBoard",
        components: {
            UnselectedChip: () => import('@/components/chips/DragChip'),
            SemesterBoard: () => import('@/components/SemesterBoard')
        },
        data: () => ({
            nullInfo: {
                code: "Temp",
                enName: "Temp",
                koName: "Temp"
            },
            currentId: -1,
            unselected: [
                {
                    code: "CS101",
                    enName: "Introduction to Programming",
                    koName: "프로그래밍 개론",
                    votes: 0
                },
                {
                    code: "CS473",
                    enName: "Introduction to Social Computing",
                    koName: "소셜 컴퓨팅 개론",
                    votes: 0
                },
                {
                    code: "CS520",
                    enName: "Programming Language Logics",
                    koName: "프로그래밍 언어 이론",
                    votes: 0
                },
            ],
            selected: [
                {
                    semester: "2020 Spring",
                    items: [
                        {
                            code: "CS489",
                            enName: "Introduction to Something Else",
                            koName: "그거 개론",
                            my_item: false,
                            votes: 1
                        },
                        {
                            code: "CS520",
                            enName: "Introduction to ABC",
                            koName: "국어 개론",
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
                    var item = this.unselected[this.currentId]
                    var index = this.selected[semesterId].items.findIndex(x => x.code === item.code);
                    if (index >= 0) {
                        this.selected[semesterId].items[index].votes += 1
                        this.selected[semesterId].items[index].my_item = true
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