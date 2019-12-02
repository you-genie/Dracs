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
          "-1": "Undecided",
          "0": "CS",
          "1": "EE",
          "2": "MAS",
          "3": "Others"
      },
      subMajorTags: {
          "-1": "None",
          "0": "CS",
          "1": "EE",
          "2": "MAS",
          "3": "Others"
      },
      interestedAreas: ["None", "CS Theory", "System Network", "Software Engineering", "Social Computing", "Visual Computing", "HCI", "AI"],
      courses: courses.courses,
      user: {},
      users: {},
      questions: questions.questions,
      my_questions: {},
      searchResQuestions: []
  },
  getters: {
    major_name: (state, id) => {
      return state.majorTags[id]
    },
    courseNames: (state) => {
      var names = []
      state.courses.forEach(course => {
        names.push(course.code)
      })

      return names
    },
    longCourseNames: (state) => {
      var names = []
      state.courses.forEach((course, index) => {
        names.push({text: "["+course.code + "] " + course.enName + ", " + course.koName, value:index})
      }) 
      return names     
    },
    majorNames: (state) => {
      return Object.values(state.majorTags)
    },
    subMajorNames: (state) => {
      return Object.values(state.subMajorTags)
    },
    courseInfo: (state, index) => {
      return state.courses[index]
    },
    question: (state, index) => {
      return state.questions[index]
    },
    fitArticles: state => {
      return state.fitArticleList
    },
  },
  mutations: {
    fillFitList(state, payload) {

      let temp = []
      for (var i = 0, len = payload.length; i < len; i++) {
        temp.push(payload[i][0])
      }
            // for each userID in temp, get all the question posed by that user and push it to fitArticleList
      // note that doc.id is saved (because new questions don't have a questionID field)
      for (var j = 0, len2 = temp.length; j < len2; j++) {
          db.collection("questions").where("userID", "==", temp[j])
              .get().then(snapshot => {
                  snapshot.forEach(doc => {
                      state.fitArticleList.push(doc.id)
                  });
              })
      }
    },
    setFitlist(state, payload) {
      state.fitArticleList = payload.questions
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
    setMyQuestion(state, payload) {
      state.my_questions = payload;
    },
    setQuestion(state, payload) {
      state.questions = payload
    },
    setQuestionWithId(state, payload) {
      state.questions[payload.questionId] = payload.questionInfo
    },
    setMyQuestionWithId(state, payload) {
      state.my_questions[payload.questionId] = payload.questionInfo
    },
    UPDATE_MY_QUESTION(state, payload) {
      state.my_questions[payload[0]].semesters = payload[1];
      db.collection('questions').doc(payload[0]).update(state.my_questions[payload[0]])
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
        title: "Sign In to use full DraCS!",
          body: "You can post questions, recommend courses and make comments! click the front right button to sign in and sign up!",
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

      state.my_questions["9998"] = {
        title: "이 모든 멋진 기능을 로그인해서 확인하세요!!!",
          body: "댓글 달기, 과목 추천하기, 내 질문 확인 및 질문 올리기 기능을 사용하고 싶으시다면?? 상단 우측 로그인 ㄱㄱ!",
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
      state.my_questions["10000"] = {
        title: "We're waiting for you~~~",
          body: "기다리고 있어요~~~",
          semesters: [
          { semester: "2020 Spring", courses: []},
          { semester: "2020 Fall", courses:[] },
          { semester: "2021 Spring", courses: []}
        ],
      }
    },
    SETUSER (state, payload) {
      state.user = payload;
    },
    USERAPPEND( state, payload) {
      state.users = payload;
    },
    setSearchResQuestions(state, payload) {
      payload.forEach(obj => {
        state.searchResQuestions.push(obj.id)
      })
    }
  },
  actions: {
    editQuestion(context, payload) {
      db.collection('questions').doc(payload.questionId).update({
        body: payload.body,
        title: payload.title
      })
      context.dispatch('fetchQuestion')
    },
    addComment: function(context, payload) {
      db.collection('questions').doc(payload.questionId).update({
        comments: payload.comments
      })
      context.dispatch('fetchQuestion')
    },
    addMyQuestion: function (context, payload) {
      // context.state.my_questions[new_key] = (payload.question)
      // context.state.questions[new_key] = (payload.question)
      db.collection('questions').add(payload.question).then((doc) => {
        console.log(doc.id)
        context.commit('fetchQuestion')
        context.dispatch('goToHome')
      });
    },
    fetchQuestionWithId(context, payload) {
      db.collection('questions').doc(payload.questionId).get().then((doc) => {
        context.commit('setQuestionWithId', {
          questionId: payload.questionId, questionInfo: doc.data()})
      })
    },
    fetchMyQuestionWithID(context, payload) {
      db.collection('questions').doc(payload.questionId).get().then((doc) => {
        context.commit('setMyQuestionWithId', {
          questionId: payload.questionId, questionInfo: doc.data()})
      })
    },
    fetchQuestion(context) {
      db.collection('questions').get().then(snapshot => {
        // let count = 1;
        let myquestions = {}
        let questions = {}
        snapshot.forEach(doc => {
          if (doc.data().semesters) {
            let question = doc.data();
            if(question.userID === firebase.auth().currentUser.uid) {
              myquestions[doc.id] = question;
            } else {
              questions[doc.id] = question;
            }
            // count ++;
          }
        });
        context.commit('setQuestion',questions);
        context.commit('setMyQuestion', myquestions);
        this.isDataGets = true;
      })
    },
    fetchUserInfo(context) {
      if (firebase.auth().currentUser) {
        let userID = firebase.auth().currentUser.uid
        db.collection("users")
          .where("userID", "==", userID).get()
          .then(snapshot => {
            snapshot.forEach(data => {
              let user = data.data();
              context.dispatch('setUser', user);
              context.dispatch('getSearchData', 
                [context.state.user.currentSemester, 
                context.state.user.major, 
                context.state.user.doubleMajor, 
                context.state.user.minor, 
                context.state.user.interestedArea])
            });
        });
      }
    },
    fetchAll(context) {
      context.dispatch('fetchUserInfo');
      context.dispatch('fetchUsers');
      context.dispatch('fetchQuestion');
    },
    fetchUsers(context) {
      db.collection("users").get().then(snapshot => {
        let users = {};
        // let count = 0
        snapshot.forEach(doc => {
          users[doc.data().userID] = doc.data();
          // count++;
        })
        context.dispatch('usersAppend', users);
      });
    },
    usersAppend(context, payload) {
        context.commit('USERAPPEND', payload);
    },
    setUser(context, payload) {
        context.commit('SETUSER', payload);
    },
    updateQuestion(context, payload) {
        context.commit('UPDATEQUESTION', payload)
    },
    updateMyQuestion(context, payload) {
      context.commit('UPDATE_MY_QUESTION', payload)
    },
    dbQuestionRead(context, payload) {
        context.commit('dbDataLoad', payload);
    },
    myQuestion(context, payload) {
        context.commit('MYQUESTION', payload);
    },
    goToAnswer(state, payload) {
        router.push({ name: 'answer', params: { questionId: payload.questionId } });
    },
    goToPost() {
        router.push({ name: 'post' });
    },
    goToHome() {
        router.push({ name: 'home' })
    },
    goToSearch(state, payload) {
      router.push({name: 'search', params: {searchId: payload}})
    },
    goToQuestion(state, payload) {
        router.push({ name: 'question', params: { questionId: payload.questionId } })
    },
    gainReputationPts(context, payload) {
        context.commit('increaseReputationPts', payload)
    },
    searchQuestions (context, payload) {
      //calculate for both user and other payloads]
      var resData = [];
      db.collection('query').add({
        query: payload,
        user: context.state.user
      })
      Object.keys(context.state.questions).forEach(questionId => {
          let question = context.state.questions[questionId]
          let point = 0
          let interests = payload.interests
          let payloadMajor = payload.major
          let questionerID = question.userID
          const currentUser = context.state.user

          if (currentUser.userID != questionerID) {
            payload.queries.forEach(query => {
              if (question.title.includes(query)) {
                point += 20
              }
              if (question.body.includes(query)) {
                point += 15
              }
            })
            let user = context.state.users[questionerID]
            interests.forEach(interest => {
              if (user.interestedArea == interest) {
                point += 22
              }
            })
           
            point += (currentUser.major == user.major ? 3 : 0) 
            point += payloadMajor == user.major ? 14 : 0
            point += ((currentUser.minor == user.minor) && user.minor != -1 ? 2 : 0)
            point += (payloadMajor == user.minor) && user.minor != -1 ? 3 : 0
            point += ((currentUser.doubleMajor == user.doubleMajor || payloadMajor == user.doubleMajor) && user.doubleMajor != -1 ? 3 : 0) 
            // point += (user.reputationPts > 30 ? 3 : user.reputationPts / 10) 

            point += ((currentUser.interestedArea == user.interestedArea) ? 3 : 0);
            resData.push({id: questionId, value: point})
         }
      });
      resData = resData.sort(function(a, b) {
        return -a.value + b.value;
      });
      setTimeout(() => {
        context.commit('setSearchResQuestions', resData)
        setTimeout(() => {
          context.dispatch('goToSearch', new Date())
        }, 3000)
      }, 2000)
    },
    getSearchData(context, payload) {
        let currentSemester = payload[0]
        let major = payload[1]
        let doubleMajor = payload[2]
        let minor = payload[3]
        let interestedArea = payload[4]
        let userIDandFit = []

        db.collection('users').orderBy("userID", "asc").get().then(snapshot => {
            snapshot.forEach(doc => {
                let user = doc.data()
                if (user.userID != firebase.auth().currentUser.uid) {
                    // push [userID, fitScore] to list userIDandFit
                  userIDandFit.push([user.userID, 0 +
                      (major == user.major ? 4 : 0) + (minor == user.minor && user.minor != -1 ? 3 : 0) +
                      (doubleMajor == user.doubleMajor && user.doubleMajor != -1 ? 4 : 0) +
                      (user.reputationPts > 10 ? 1 : user.reputationPts / 10) +
                      ((interestedArea == user.interestedArea) == true ? 6 : 0)
                  ])
                }
            });
        }).then(function() {
            // sort so that highest fit comes first
            userIDandFit = userIDandFit.sort(function(a, b) {
                return -a[1] + b[1];
            }); // commit this to fillFitList
            context.commit('fillFitList', userIDandFit)
        })

    },
    getDefaultFitlist(context, payload) {
      db.collection('questions').get().then(snapshot => {
        let questions = [];
        // let count = 1;
        snapshot.forEach(doc => {
          if (doc.data().semesters) {
            let question = doc.data();
            questions.push(doc.id)
          }
        });
        context.commit('setFitlist', {questions: questions})
      })
    }
  },
  modules: {}
})
