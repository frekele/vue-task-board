import axios from 'axios'

const state = {
    board: []
}

const getters = {
    getBoard(state, getters, rootState, rootGetters) {
        return state.board;
    }
}

const mutations = {}

const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}