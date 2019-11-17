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
                    v-on:drag-dropped-semester="addSemesterChip"/>
            </v-row>
            <v-row justify="center">
                <test-chip 
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
            TestChip: () => import('@/components/chips/DragChip'),
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
                    koName: "프로그래밍 개론"
                },
                {
                    code: "CS473",
                    enName: "Introduction to Social Computing",
                    koName: "소셜 컴퓨팅 개론"
                },
                {
                    code: "CS520",
                    enName: "Programming Language Logics",
                    koName: "프로그래밍 언어 이론"
                },
            ],
            selected: [
                {
                    semester: "2020 Spring",
                    items: [
                        {
                            code: "CS489",
                            enName: "Introduction to ??dunno",
                            koName: "fnffnfkf 개론"
                        }
                    ]
                },
                {
                    semester: "2020 Fall",
                    items: []
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
                    this.selected[semesterId].items.push(
                        this.unselected[this.currentId])
                    this.unselected.splice(this.currentId, 1)
                    this.currentId = -1
                    this.currentSemesterId = -1
                }
                this.onDrag = false
            },
        }
    }
</script>