import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        board: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            if (user) {
                axios.defaults.headers.common['Authorization'] = `${user.token}`
            } else {
                delete axios.defaults.headers.common['Authorization']
            }
        }
    }, getters: {
        getUser() {
            return this.user;
        },
        getBoard() {
            return this.board;
        }
    }
})