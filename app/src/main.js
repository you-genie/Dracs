import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router/router'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.config.productionTip = false

Vue.use(firestorePlugin)
firebase.initializeApp({
    projectId: 'cs473-dragcs',
    databaseURL: 'https://cs473-dragcs.firebaseio.com'
})

export const db = firebase.firestore()

/* eslint-disable no-console */
store.dispatch('getSearchData', [1, -1, -1, -1, "HCI"])
    /* eslint-enable no-console */
new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')