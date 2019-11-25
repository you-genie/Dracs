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
    import store from './../store'

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
                this.semesters[semesterId].courses[courseId].selected = false
                store.dispatch('updateMyQuestion',[this.questionId, this.semesters]);
            },
            selectChip: function(semesterId, courseId) {
                this.semesters[semesterId].courses[courseId].selected = true
              store.dispatch('updateMyQuestion',[this.questionId, this.semesters]);
            }
        }
    }
</script>