import axios from 'axios'
import {baseApiUrl, userKey} from "@/global"

const state = {
    board: {}
}

const getters = {
    getBoard(state) {
        return state.board;
    }
}

const mutations = {
    setBoard(state, payload) {
        state.board = payload
    }
}


const actions = {
    loadFullBoard(context, payload) {
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
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}