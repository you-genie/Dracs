import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router/router'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

require("firebase/auth");
require("firebase/firestore");

Vue.config.productionTip = false

const firebaseConfig = {
    apiKey: "AIzaSyBKds9tp3vQQv6pku4uH_3GF_wT0SbnceA",
    authDomain: "cs473-dragcs.firebaseapp.com",
    databaseURL: "https://cs473-dragcs.firebaseio.com",
    projectId: "cs473-dragcs",
    storageBucket: "cs473-dragcs.appspot.com",
    messagingSenderId: "196046389565",
    appId: "1:196046389565:web:76b1be9577f238fc4dc554",
    measurementId: "G-T0GME4KV8E"
};

firebase.initializeApp(firebaseConfig);

Vue.use(firestorePlugin)

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