<template>
    <v-col>
            <v-row noGutters>
                <semester-board 
                    v-for="(semester, index) in semesters"
                    v-bind:key="index"
                    :semester="semester.semester+' ('+(asker.currentSemester+index+1)+'학기)'"
                    :semesterId="index"
                    :items="semester.courses"
                    v-on:drag-over-semester="getSemesterDrag"
                    v-on:drag-leave-semester="leaveSemesterDrag"
                    v-on:drag-dropped-semester="addSemesterChip"
                    v-on:deselect-course="deselectChip"
                    v-on:vote="vote"/>
            </v-row>
            <v-row justify="center">
                <v-subheader>Drag me!</v-subheader>
                <unselected-chip 
                    v-for="(course, index) in courses"
                    v-bind:key="index" class="text-center"
                    :index="course"
                    :courseId="index"
                    v-on:drag-on="getDrag"
                    v-on:drag-end="leaveSemesterDrag"/>
            </v-row>

    </v-col>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    import { db } from "@/main"
    import store from '@/store'


    export default {
        name: "DragBoard",
        components: {
            UnselectedChip: () => import('@/components/chips/DragChip'),
            SemesterBoard: () => import('@/components/boards/SemesterBoard')
        },
        props: {
            questionId: String
            // semesters: Array
        },
        beforeMount() {
            this.computeCourses();
        },
        computed: {
            ...mapState({user: 'user', courseInfos: 'courses', users: 'users', questions: 'questions'}),
            asker () {
                return this.users[this.questions[this.questionId].userID]
            },
            semesters () {
                return this.$store.state.questions[this.questionId].semesters
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
            onDrag: false,
            courses: []
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
            computeCourses () {
                var totalCourses = [...Array(this.courseInfos.length).keys()];
                this.semesters.forEach((semester) => {
                    semester.courses.forEach((course) => {
                        if (course.votes.up.hasOwnProperty(this.user.userID)
                            || course.votes.down.hasOwnProperty(this.user.userID)
                            || course.votes.hmm.hasOwnProperty(this.user.userID)) {
                            const idx = totalCourses.indexOf(course.index);
                            if (idx > -1) {
                                totalCourses.splice(idx, 1)
                            }
                        }
                    })
                })

                this.asker.certificates.forEach((courseIndex) => {
                    const idx = totalCourses.indexOf(courseIndex);
                    if (idx > -1) {
                        totalCourses.splice(idx, 1)
                    }
                })

                this.courses = totalCourses;
            },
            addSemesterChip: function(semesterId) {
                if (this.currentId >= 0) {
                    const itemId = this.courses[this.currentId]
                    var index = this.semesters[semesterId].courses.findIndex(x => x.index === itemId);
                    if (index >= 0) {
                        this.semesters[semesterId].courses[index].votes.up += 1
                        this.semesters[semesterId].courses[index].myChip = true
                    } else {
                        const userID = this.user.userID
                        const upObject = {}
                        upObject[userID] = "1"
                        var item = {
                            index: itemId,
                            selected: false,
                            myChip: true,
                            votes: {
                                up: upObject,
                                down: {},
                                hmm: {}
                            }
                        }
                        this.semesters[semesterId].courses.push(item);
                        store.commit('increaseReputationPts', 1)
                    }
                    this.courses.splice(this.currentId, 1)
                    this.currentId = -1
                    this.currentSemesterId = -1
                }
                this.onDrag = false;
                store.dispatch('updateQuestion',[this.questionId, this.courses, this.semesters]);
            },
            deselectChip: function(semesterId, courseId) {
                delete this.semesters[semesterId].courses[courseId].votes.up[this.user.userID]

                const targetCourse = this.semesters[semesterId].courses[courseId]
                if (Object.keys(targetCourse.votes.up).length > 0 
                    || Object.keys(targetCourse.votes.down).length > 0 
                    || Object.keys(targetCourse.votes.hmm).length > 0 ) {
                    console.log(targetCourse)
                    this.semesters[semesterId].courses[courseId].myChip = false
                } else {
                    this.semesters[semesterId].courses.splice(courseId, 1)
                }
                
                this.courses.push(targetCourse.index)
              store.dispatch('updateQuestion',[this.questionId, this.courses, this.semesters]);
            },
            vote: function(semesterId, courseId, voteState) {
                if (voteState === 'down') {
                    this.semesters[semesterId].courses[courseId].votes.down[this.user.userID] = "1"
                    delete this.semesters[semesterId].courses[courseId].votes.up[this.user.userID]
                    delete this.semesters[semesterId].courses[courseId].votes.hmm[this.user.userID]
                } else if (voteState === 'up') {
                    this.semesters[semesterId].courses[courseId].votes.up[this.user.userID] = "1"
                    delete this.semesters[semesterId].courses[courseId].votes.down[this.user.userID]
                    delete this.semesters[semesterId].courses[courseId].votes.hmm[this.user.userID]              
                } else if (voteState === 'hmm') {
                    this.semesters[semesterId].courses[courseId].votes.hmm[this.user.userID] = "1"
                    delete this.semesters[semesterId].courses[courseId].votes.up[this.user.userID]
                    delete this.semesters[semesterId].courses[courseId].votes.down[this.user.userID]              
                }
                store.dispatch('updateQuestion',[this.questionId, this.courses, this.semesters]);
                // store.dispatch('fetchQuestion')
            },
    reputationUpdate: function(questionID, code, year, isSpring) {
      db.collection("votes")
        .orderBy("questionID", "asc")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.data().questionID == questionID) {
              let voteHistory = doc.data().upvoteHistory;
              for (var i = 0; i < voteHistory.length; i++) {
                let upvoteList = voteHistory[i].split(",");
                if (upvoteList.length >= 3) {
                  for (var j = 3; j < upvoteList.length; j++) {
                    if (
                      code == upvoteList[0] &&
                      year == upvoteList[1] &&
                      (isSpring ? "S" : "F") == upvoteList[2]
                    ) {
                      let userID = parseInt(upvoteList[j]);
                      db.collection("users")
                        .where("userID", "==", userID)
                        .get()
                        .then(snapshot => {
                          snapshot.forEach(doc => {
                            let newReputationPts = doc.data().reputationPts + 4;
                            doc.ref.update({ reputationPts: newReputationPts });
                          });
                        });
                    }
                  }
                }
              }
            }
          });
        });
    }
  }
};
</script>