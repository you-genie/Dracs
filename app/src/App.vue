<template>
  <v-app v-if="isDataGets">
    <core-toolbar />

    <core-view />

    <core-footer />
    
  </v-app>
</template>

<script>
  import store from './store';
  import { db } from "./main";
  import * as firebase from 'firebase';

  export default {
    name: 'App',
    computed: {
      user() {
        return store.state.user;
      }
    },
    beforeUpdate() {
      store.dispatch('fetchAll')
    },
    beforeMount() {
      let questions = {}
      let myquestions = {}
      let userID = '1234';
      let user = '';

      setTimeout(() => {
        if (firebase.auth().currentUser) {
          userID = firebase.auth().currentUser.uid
          db.collection("users")
            .where("userID", "==", userID).get()
            .then(snapshot => {
              snapshot.forEach(data => {
                user = data.data();
                store.dispatch('setUser', user);
              });
            });
        }
      }, 1000);

      db.collection("users").get().then(snapshot => {
        let users = {};
        // let count = 0
        snapshot.forEach(doc => {
          users[doc.data().userID] = doc.data();
          // count++;
        })
        store.dispatch('usersAppend', users);
      });
      // store.dispatch('getSearchData', [4, -1, -1, -1, "HCI"])

      db.collection('questions').get().then(snapshot => {
        // let count = 1;
        snapshot.forEach(doc => {
          if (doc.data().semesters) {
            let question = doc.data();
            // console.log(userID);
            if(question.userID === userID) {
              myquestions[doc.id] = question;
            } else {
              questions[doc.id] = question;

            }
            // count ++;
          }
        });
        store.dispatch('dbQuestionRead',questions);
        store.dispatch('myQuestion', myquestions);
        this.isDataGets = true;
      })

  },
    methods: {
    },
    components: {
      CoreFooter: () => import('@/components/core/Footer'),
      CoreToolbar: () => import('@/components/core/Toolbar'),
      CoreView: () => import('@/components/core/View')
    },
    watch: {
      user(newUser) {
        if (this.user.userID != newUser.userID) {
          store.dispatch('fetchAll')
        }
        // store.dispatch('fetchAll')
      }
    },
    data () {
      return {
        isDataGets: false,
      //
      }
    }
  }
</script>
