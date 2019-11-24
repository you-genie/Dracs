import Vue from 'vue'
import Vuex from 'vuex'
import courses from '@/data/course'
import questions from '@/data/questions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    majorTags: {
      "-1": "Freshman",
      "0": "CS",
      "1": "EE",
      "2": "MAS",
      "3": "Others"
    },
    courses: courses.courses,
    user: {
      userID: "1",
      reputationPts: 13,
      currentSemester: 1,
      major: "0",
      doubleMajor: "-1",
      minor: "1",
      coursesTaken: [
        "101,2019,S", "109,2019,F"
      ],
      interestedArea: []
    },
    users: {
      "2": {
        reputationPts: 10,
        currentSemester: 2,
        major: "-1",
        doubleMajor: "-1",
        minor: "-1",
        coursesTaken: [
          "101,2019,S"
        ],
        interestedArea: [
          "Internship"
        ]
      },
      "3": {
        reputationPts: 109,
        currentSemester: 7,
        major: "0",
        doubleMajor: "2",
        minor: "-1",
        coursesTaken: [
          "101,2015,S", "109,2015,S", 
          "210,2016,S", "230,2016,S", "260,2016,F",
          "320,2016,F", "360,2016,F"
        ],
        interestedArea: [
          "Graphics", "Computer Vision", "AI"
        ]
      },
      "4": {
        reputationPts: 10,
        currentSemester: 2,
        major: "-1",
        doubleMajor: "-1",
        minor: "-1",
        coursesTaken: [
          "101,2019,S", "109,2019,S"
        ],
        interestedArea: [
          "Major Selection"
        ]
      }
    },
    questions: questions.questions,
    my_questions: {
      "1": {
        title: "I never learned any CS before",
        body: "I know C a little, but that's very little for me.",
        semesters: [
          { semester: "2020 Spring", courses: []},
          { semester: "2020 Fall", courses:[] },
          { semester: "2021 Spring", courses: []}
        ],
      },
      "2": {
        title: "I want to do internship",
        body: "Can somebody help me with this question?",
        semesters: [
          { semester: "2020 Spring", courses: []},
          { semester: "2020 Fall", courses:[] },
          { semester: "2021 Spring", courses: []}
        ],
      },      
    }
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
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
