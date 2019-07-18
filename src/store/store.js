import Vue from 'vue'
import Vuex from 'vuex'

import UserModule from './modules/user'
import BoardModule from './modules/board'
import TaskModule from './modules/task'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        userModule: UserModule,
        boardModule: BoardModule,
        taskModule: TaskModule
    }
})