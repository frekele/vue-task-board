import Vue from 'vue'
import VueRouter from 'vue-router'

import Boards from '@/components/boards/Boards'

import Board from '@/components/board/Board'
import EditBoard from '@/components/board/EditBoard'

import EditTask from '@/components/task/EditTask'

import Auth from '@/components/auth/Auth'

Vue.use(VueRouter)

const routes = [
    {
        name: 'boards',
        path: '/',
        component: Boards
    },
    {
        name: 'board',
        path: '/board/:id',
        component: Board,
        props: true
    },
    {
        name: 'new-board',
        path: '/new-board',
        component: EditBoard
    },
    {
        name: 'edit-board',
        path: '/edit-board/:id',
        component: EditBoard,
        props: true
    },
    {
        name: 'new-task',
        path: '/board/:boardId/column/:columnId/new-task',
        component: EditTask,
        props: true
    },
    {
        name: 'edit-task',
        path: '/board/:boardId/column/:columnId/edit-task/:id',
        component: EditTask,
        props: true
    },
    {
        name: 'auth',
        path: '/auth',
        component: Auth
    },
    {
        path: '*',
        redirect: '/'
    },
]

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
