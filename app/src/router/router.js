import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Answer from '@/views/Answer.vue'
import SignUp from '@/views/SignUp.vue'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/answer/:answer_num/',
            name: 'answer',
            component: Answer
        },
        {
            path: '/signup',
            name: 'SignUp',
            component: SignUp
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
    ]
})