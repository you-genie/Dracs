import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../main'
import firebase from 'firebase';

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        myReputationPts: 0,
        fitArticleList: [],
        isLoggedIn: false,
    },

    mutations: {
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
        }
    },

    actions: {

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
    modules: {},

    getters: {
        fitArticles: state => {
            return state.fitArticleList
        }
    }

})