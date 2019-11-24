<template>
    <div class="login">
        <p>Welcome back to DragCS!</p>
        <input type="text" v-model="email" placeholder="E-mail"> <br />
        <input type="password" v-model="password" placeholder="Password"> <br />
        <button @click="login">Log-in</button>
        <p>What? Didn't signed up to DragCS yet? Let's create one <router-link to='/signup'> here! </router-link></p>
    </div>
</template>

<script>
import firebase from 'firebase';
import { mapState } from "vuex";
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
                    this.$router.replace('/')
                },
                (error) => {

                    alert(error)
                }
            );
        }
    }
}
</script>