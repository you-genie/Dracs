<template>
    <v-row justify="center">
        <v-card class="login"  flat>
            <v-card-title>Welcome back to DragCS!</v-card-title>
            <v-card-text>
                <v-text-field type="text" v-model="email" label="E-mail" ></v-text-field>
                <v-text-field type="password" v-model="password" label="Password"></v-text-field>
                <p>What? Didn't signed up to DragCS yet? Let's create one <router-link to='/signup'> here! </router-link></p>
            </v-card-text>
            <v-card-actions>
               <v-btn @click="login" small text>Log-in</v-btn>
            </v-card-actions>
        </v-card>
    </v-row>
</template>

<script>
import firebase from 'firebase';
import { mapState } from "vuex";
import { db } from "../main";
import store from '../store'

export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: {
    ...mapState(["myReputationPts", "isLoggedIn"])
  },
    methods: {
        login: function() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                    (user)
                    store.commit('changeLoginState', true)
                    db.collection("users")
                        .where("userID", "==", firebase.auth().currentUser.uid)
                        .get()
                        .then(snapshot => {
                          snapshot.forEach(doc => {
                            store.dispatch('setUser', doc.data())
                            store.commit('updateReputationPts', doc.data().reputationPts);
                          });
                        });
                    store.dispatch('fetchAll');
                    setTimeout(() => {
                        this.$router.replace('/')
                    }, 1000)
                },
                (error) => {

                    alert(error)
                }
            );
        }
    }
}
</script>