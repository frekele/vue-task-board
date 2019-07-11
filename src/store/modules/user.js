import axios from 'axios'
import {baseApiUrl, userKey} from "@/global"

const state = {
    user: null,
    validatingToken: true
}

const getters = {
    getUser(state, getters, rootState, rootGetters) {
        return state.user;
    },
    getValidatingToken(state, getters, rootState, rootGetters) {
        return state.validatingToken;
    }
}

const mutations = {
    setUser(state, payload) {
        state.user = payload
        if (payload) {
            axios.defaults.headers.common['Authorization'] = `${payload.token}`
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
    },
    setValidatingToken(state, payload) {
        state.validatingToken = payload
    }
}

const actions = {
    async validateToken(context, payload) {
        return new Promise(async (resolve, reject) => {
            try {
                context.commit('setValidatingToken', true)
                const userData = JSON.parse(localStorage.getItem(userKey))
                context.commit('setUser', null)

                if (!userData || !userData.token) {
                    context.commit('setValidatingToken', false)
                    resolve(false)
                } else {
                    context.commit('setUser', userData)
                    const response = await axios.post(`${baseApiUrl}/validate-token`, userData)

                    if (response.data) {
                        context.commit('setUser', response.data)
                        context.commit('setValidatingToken', false)
                        resolve(true)
                    } else {
                        localStorage.removeItem(userKey)
                        context.commit('setValidatingToken', false)
                        resolve(false)
                    }
                }
            } catch (e) {
                reject(e)
            }
        })
    },
    logout(context, payload) {
        return new Promise((resolve, reject) => {
            try {
                localStorage.removeItem(userKey)
                context.commit('setUser', null)
                resolve()
            } catch (e) {
                reject(e)
            }

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