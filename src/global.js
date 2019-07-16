import Vue from 'vue'

export const userKey = '__task_board_user'
export const baseApiUrl = process.env.NODE_ENV === 'production' ? 'https://slim-task-board.herokuapp.com' : 'http://localhost:80'

export function showError(e) {
    if (e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({msg: e.response.data})
    } else if (typeof e === 'string') {
        Vue.toasted.global.defaultError({msg: e})
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default {baseApiUrl, showError, userKey}