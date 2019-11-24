import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router/router'

import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  databaseURL: "https://cs473-dragcs.firebaseio.com",
  projectId: "cs473-dragcs",
}

Vue.use(firestorePlugin);
Vue.prototype.$firebase = firebase;
Vue.config.productionTip = false

firebase.initializeApp(config)

export const db = firebase.firestore()

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
