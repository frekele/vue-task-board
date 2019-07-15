import Vue from 'vue'
import VueRouter from 'vue-router'

import Boards from '@/components/boards/Boards'

import Board from '@/components/board/Board'
import EditBoard from '@/components/board/EditBoard'

import Column from '@/components/column/Column'
import NewColumn from '@/components/column/NewColumn'

import Task from '@/components/task/Task'
import NewTask from '@/components/task/NewTask'


import Auth from '@/components/auth/Auth'

Vue.use(VueRouter)

const routes = [{
    name: 'boards',
    path: '/',
    component: Boards
}, {
    name: 'board',
    path: '/board/:id',
    component: Board
}, {
    name: 'new-board',
    path: '/new-board',
    component: EditBoard
},  {
    name: 'edit-board',
    path: '/edit-board',
    component: EditBoard
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
