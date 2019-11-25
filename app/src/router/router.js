import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Answer from '@/views/Answer.vue'
import Search from '@/views/Search.vue'
import Post from '@/views/Post.vue'
import Question from '@/views/Question.vue'
import SignUp from '@/views/SignUp.vue'
import Login from '@/views/Login'
import * as firebase from 'firebase';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/answer/:questionId',
            name: 'answer',
            component: Answer,
            props: true
        },
        {
            path: '/search/',
            name: 'search',
            component: Search
        },
        {
            path: '/post/',
            name: 'post',
            component: Post,
            meta: {
                requiresLogIn: true
            }
        },
        {
            path: '/question/:questionId',
            name: 'question',
            component: Question,
            props: true
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


router.beforeEach((to, from, next) => {
    const user = firebase.auth().currentUser
    const isRequiresLogIn = to.matched.some(record => record.meta.requiresLogIn)

    if (isRequiresLogIn && !user) {
        next('/login')
    } else {
        next()
    }
});

export default router;