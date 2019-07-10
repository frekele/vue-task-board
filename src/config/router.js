import Vue from 'vue'
import VueRouter from 'vue-router'

import DashBoard from '@/components/dashboard/DashBoard'

import Board from '@/components/board/Board'
import NewBoard from '@/components/board/NewBoard'

import Column from '@/components/column/Column'
import NewColumn from '@/components/column/NewColumn'

import Task from '@/components/task/Task'
import NewTask from '@/components/task/NewTask'


import Auth from '@/components/auth/Auth'

import {userKey} from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'dashboard',
    path: '/',
    component: DashBoard
}, {
    name: 'board',
    path: '/board',
    component: Board
}, {
    name: 'new-board',
    path: '/new-board',
    component: NewBoard
}, {
    name: 'column',
    path: '/column',
    component: Column
}, {
    name: 'new-column',
    path: '/new-column',
    component: NewColumn
}, {
    name: 'task',
    path: '/task',
    component: Task
}, {
    name: 'new-task',
    path: '/new-task',
    component: NewTask
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

// router.beforeEach((to, from, next) => {
//     const json = localStorage.getItem(userKey)
//
//     if (to.matched.some(record => record.meta.requiresAdmin)) {
//         const user = JSON.parse(json)
//         user && user.admin ? next() : next({path: '/'})
//     } else {
//         next()
//     }
// })

export default router
