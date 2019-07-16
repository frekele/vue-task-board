import axios from 'axios'
import {baseApiUrl} from "@/global"

const state = {
    board: {},
    waitingForResponse: false
}

const getters = {
    getBoard(state) {
        return state.board;
    },
    getWaitingForResponse(state) {
        return state.waitingForResponse;
    }
}

const mutations = {
    setBoard(state, payload) {
        state.board = payload
    },
    setWaitingForResponse(state, payload) {
        state.waitingForResponse = payload
    }
}


const actions = {
    loadEagerFullBoard(context, payload) {
        context.commit('setWaitingForResponse', true)
        context.commit('setBoard', {})
        return new Promise(async (resolve, reject) => {
            axios.get(`${baseApiUrl}/board/${payload.id}?eager=true`)
                .then(response => {
                    context.commit('setBoard', response.data)
                    context.commit('setWaitingForResponse', false)
                    resolve()
                })
                .catch(error => {
                    context.commit('setWaitingForResponse', false)
                    reject(error)
                })
        })
    },
    loadBoard(context, payload) {
        context.commit('setBoard', {})
        return new Promise((resolve, reject) => {
            axios.get(`${baseApiUrl}/board/${payload.id}`)
                .then(response => {
                    context.commit('setBoard', response.data)
                    resolve()
                })
                .catch(reject)
        })
    },
    insertBoard(context) {
        return new Promise((resolve, reject) => {
            axios.post(`${baseApiUrl}/board`, context.getters.getBoard)
                .then(response => {
                    context.commit('setBoard', response.data)
                    resolve()
                })
                .catch(reject)
        })
    },
    updateBoard(context) {
        return new Promise((resolve, reject) => {
            let board = context.getters.getBoard
            axios.post(`${baseApiUrl}/board/${board.id}`, board)
                .then(response => {
                    context.commit('setBoard', response.data)
                    resolve()
                })
                .catch(reject)
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}