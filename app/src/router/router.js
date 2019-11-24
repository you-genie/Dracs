import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Answer from '@/views/Answer.vue'
import Search from '@/views/Search.vue'
import Post from '@/views/Post.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
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
            path: '/search/',
            name: 'search',
            component: Search
        },
        {
            path: '/post/',
            name: 'post',
            component: Post
        }
    ]
})