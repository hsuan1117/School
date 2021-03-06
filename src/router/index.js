import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/add',
        name: 'Add',
        component: () => import(/* webpackChunkName: "add" */ '../views/Add.vue')
    },
    {
        path: '/config',
        name: 'Config',
        component: () => import(/* webpackChunkName: "config" */ '../views/Config.vue')
    },
    {
        path: '/edit/:id',
        name: 'Edit',
        component: () => import(/* webpackChunkName: "edit" */ '../views/Edit.vue')
    },
    {
        path: '/cal',
        name: 'Calendar',
        component: () => import(/* webpackChunkName: "cal" */ '../views/Cal.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
