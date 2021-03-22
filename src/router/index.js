import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/app/home/Home.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    }]
})