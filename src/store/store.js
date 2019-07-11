import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

import UserModule from './modules/user'
import BoardModule from './modules/board'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        userModule: UserModule,
        boardModule: BoardModule
    }
})