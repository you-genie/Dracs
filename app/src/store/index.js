import Vue from 'vue'
import Vuex from 'vuex'
import courses from '@/data/course'
import questions from '@/data/questions'
import router from '@/router/router'

import * as firebase from 'firebase'

import { db } from '../main'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    myReputationPts: 0,
    fitArticleList: [],
    isLoggedIn: false,
    majorTags: {
      "-1": "Freshman",
      "0": "CS",
      "1": "EE",
      "2": "MAS",
      "3": "Others"
    },
    courses: courses.courses,
    user: {
    },
    users: {
      // "2": {
      //   reputationPts: 10,
      //   currentSemester: 2,
      //   major: "-1",
      //   doubleMajor: "-1",
      //   minor: "-1",
      //   coursesTaken: [
      //     "101,2019,S"
      //   ],
      //   interestedArea: [
      //     "Internship"
      //   ]
      // },
      // "3": {
      //   reputationPts: 109,
      //   currentSemester: 7,
      //   major: "0",
      //   doubleMajor: "2",
      //   minor: "-1",
      //   coursesTaken: [
      //     "101,2015,S", "109,2015,S",
      //     "210,2016,S", "230,2016,S", "260,2016,F",
      //     "320,2016,F", "360,2016,F"
      //   ],
      //   interestedArea: [
      //     "Graphics", "Computer Vision", "AI"
      //   ]
      // },
      // "4": {
      //   reputationPts: 10,
      //   currentSemester: 2,
      //   major: "-1",
      //   doubleMajor: "-1",
      //   minor: "-1",
      //   coursesTaken: [
      //     "101,2019,S", "109,2019,S"
      //   ],
      //   interestedArea: [
      //     "Major Selection"
      //   ]
      // }
    },
    questions: questions.questions,
    my_questions: {}
  },
  getters: {
    major_name: (state, id) => {
      return state.majorTags[id]
    },
    courseInfo: (state, index) => {
      return state.courses[index]
    },
    question: (state, index) => {
      return state.questions[index]
    },
    fitArticles: state => {
      return state.fitArticleList
    }
  },
  mutations: {
    addMyQuestion: function (state, payload) {
      const length = Object.keys(state.questions).length + 1
      const new_key = length + ""
      state.my_questions[new_key] = (payload.question)
      state.questions[new_key] = (payload.question)
      db.collection('questions').doc(new_key).set(payload.question);

    },
    fillFitList(state, payload) {
      let temp = []
      for (var i = 0, len = payload.length; i < len; i++) {
        temp.push(payload[i][0])
      }
      state.fitArticleList = temp
    },
    increaseReputationPts(state, payload) {
      state.myReputationPts += payload

      if (firebase.auth().currentUser != null) {
        db.collection("users")
          .where("userID", "==", firebase.auth().currentUser.uid)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              let newReputationPts = doc.data().reputationPts + payload;
              doc.ref.update({ reputationPts: newReputationPts });
            });
          });
      }

    },
    changeLoginState(state, payload) {
      state.isLoggedIn = payload
    },
    updateReputationPts(state, payload) {
      state.myReputationPts = payload
    },
    dbDataLoad(state, payload = null) {
      state.questions = payload;
    },
    UPDATEQUESTION(state, payload) {
      state.questions[payload[0]].courses = payload[1];
      state.questions[payload[0]].semesters = payload[2];
      db.collection('questions').doc(payload[0]).update(state.questions[payload[0]]);
    },
    MYQUESTION(state,payload) {
      state.my_questions = payload;
      /* add local test data */
      state.my_questions["9999"] = {
        title: "LOCAL ONLY",
          body: "This is local data! it is not apply to database",
          semesters: [
          { semester: "2020 Spring", courses: [{
              index: 0,
              selected: false,
              myChip: false,
              votes: {
                up: 3,
                down: 1,
                hmm: 0
              }
            }]
          },
          { semester: "2020 Fall", courses:[
              {
                index: 3,
                selected: false,
                myChip: false,
                votes: {
                  up: 2,
                  down: 1,
                  hmm: 0
                }
              },
              {
                index: 21,
                selected: false,
                myChip: false,
                votes: {
                  up: 3,
                  down: 1,
                  hmm: 0
                }
              }
            ] },
          { semester: "2021 Spring", courses: []}
        ],
      }
    },
    SETUSER (state, payload) {
      state.user = payload;
    },
    USERAPPEND( state, payload) {
      state.users = payload;
    }
  },
  actions: {
    usersAppend (context, payload) {
      context.commit('USERAPPEND', payload);
    },
    setUser (context, payload) {
      context.commit('SETUSER', payload);
    },
    updateQuestion (context ,payload) {
      context.commit('UPDATEQUESTION', payload)
    },
    dbQuestionRead (context, payload) {
      context.commit('dbDataLoad', payload);
    },
    myQuestion (context, payload) {
      context.commit('MYQUESTION', payload);
    },
    goToAnswer (state, payload) {
      router.push({name: 'answer', params: {questionId: payload.questionId}});
    },
    goToPost () {
      router.push({name: 'post'});
    },
    goToHome () {
      router.push({name: 'home'})
    },
    goToQuestion (state, payload) {
      router.push({name: 'question', params: {questionId: payload.questionId}})
    },

    gainReputationPts(context, payload) {
      context.commit('increaseReputationPts', payload)
    },
    getSearchData(context, payload) {
      let currentSemester = payload[0]
      let major = payload[1]
      let doubleMajor = payload[2]
      let minor = payload[3]
      let interestedArea = payload[4]
      let userIDList = []
      let fitList = []

      db.collection("questions")
        .orderBy("questionID", "asc").get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            userIDList.push(doc.data().userID)
          });
        })
        .then(function() {
          userIDList.forEach(userID => {
            db.collection("users")
              .where("userID", "==", userID).get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  let user = doc.data()
                  fitList.push([user.userID, Math.pow(Math.abs(currentSemester - user.currentSemester), 1.4) * -1 +
                  (major == user.major ? 4 : 0) + (minor == user.minor && user.minor != -1 ? 3 : 0) +
                  (doubleMajor == user.doubleMajor && user.doubleMajor != -1 ? 4 : 0) +
                  (user.reputationPts > 30 ? 3 : user.reputationPts / 10) +
                  ((interestedArea == user.interestedArea) == true ? 6 : 0)
                  ])
                })
              }).then(function() {
              fitList = fitList.sort(function(a, b) {
                return -a[1] + b[1];
              }); // sort
              context.commit('fillFitList', fitList)
            })
          })
        });
    },
  },
  modules: {
  }
})
