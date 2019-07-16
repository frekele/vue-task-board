import axios from 'axios'
import {baseApiUrl, userKey} from "@/global"

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
        //Se demarar mais que 3 segundos altera
        setTimeout(()=>{
            this.yourMethod()
        },1000);
    }
}


const actions = {
    loadEagerFullBoard(context, payload) {
        context.commit('setBoard', {})
        return new Promise(async (resolve, reject) => {
            axios.get(`${baseApiUrl}/board/${payload.id}?eager=true`)
                .then(response => {
                    context.commit('setBoard', response.data)
                    resolve()
                })
                .catch(reject)
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