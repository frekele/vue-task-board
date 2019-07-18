import axios from 'axios'
import {baseApiUrl} from "@/global"

const state = {
    task: {}
}

const getters = {
    getTask(state) {
        return state.task;
    }
}

const mutations = {
    setTask(state, payload) {
        state.task = payload
    }
}


const actions = {
    loadTask(context, payload) {
        context.commit('boardModule/setWaitingForResponse', true, {root: true})
        context.commit('setTask', {})
        return new Promise((resolve, reject) => {
            axios.get(`${baseApiUrl}/task/${payload.id}`)
                .then(response => {
                    context.commit('setTask', response.data)
                    context.commit('boardModule/setWaitingForResponse', false, {root: true})
                    resolve()
                })
                .catch(error => {
                    context.commit('boardModule/setWaitingForResponse', false, {root: true})
                    reject(error)
                })
        })
    },
    insertTask(context) {
        context.commit('boardModule/setWaitingForResponse', true, {root: true})
        return new Promise((resolve, reject) => {
            axios.post(`${baseApiUrl}/task`, context.getters.getTask)
                .then(response => {
                    context.commit('setTask', response.data)
                    context.commit('boardModule/setWaitingForResponse', false, {root: true})
                    resolve()
                })
                .catch(error => {
                    context.commit('boardModule/setWaitingForResponse', false, {root: true})
                    reject(error)
                })
        })
    },
    updateTask(context) {
        context.commit('boardModule/setWaitingForResponse', true, {root: true})
        return new Promise((resolve, reject) => {
            let task = context.getters.getTask
            axios.put(`${baseApiUrl}/task/${task.id}`, task)
                .then(response => {
                    context.commit('setTask', response.data)
                    context.commit('boardModule/setWaitingForResponse', false, {root: true})
                    resolve()
                })
                .catch(error => {
                    context.commit('boardModule/setWaitingForResponse', false, {root: true})
                    reject(error)
                })
        })
    },
    deleteTask(context, payload) {
        context.commit('boardModule/setWaitingForResponse', true, {root: true})
        return new Promise((resolve, reject) => {
            axios.delete(`${baseApiUrl}/task/${payload.id}`)
                .then(() => {
                    context.commit('setTask', {})
                    context.commit('boardModule/setWaitingForResponse', false, {root: true})
                    resolve()
                })
                .catch(error => {
                    context.commit('boardModule/setWaitingForResponse', false, {root: true})
                    reject(error)
                })
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}