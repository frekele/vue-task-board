const state = {
    board: []
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


const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}