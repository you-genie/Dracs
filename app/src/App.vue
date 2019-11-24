<template>
  <v-app>
    <core-toolbar />

    <core-view />

    <core-footer />
    
  </v-app>
</template>

<script>
  import store from './store';
  import { db } from "./main";

  export default {
    name: 'App',
    computed: {
    },
    beforeMount() {
      let questions = {}
      db.collection('questions').get().then(snapshot => {
        let count = 1;
        snapshot.forEach(doc => {
          if (doc.data().semesters) {
            let question = doc.data();
            questions[count] = question;
            count ++;
          }
        });
        store.dispatch('dbRead',questions);
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
    },
    data () {
      return {
      //
      }
    }
  }
</script>
