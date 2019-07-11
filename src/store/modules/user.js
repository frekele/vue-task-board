import axios from 'axios'
import {baseApiUrl, userKey} from "@/global"

const state = {
    user: {},
    validatingToken: true
}

const getters = {
    getUser(state) {
        return state.user;
    },
    getValidatingToken(state) {
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
    async validateToken(context) {
        return new Promise(async (resolve, reject) => {
            try {
                context.commit('setValidatingToken', true)
                const userData = JSON.parse(localStorage.getItem(userKey))
                context.commit('setUser', {})

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
    signIn(context) {
        return new Promise((resolve, reject) => {
            axios.post(`${baseApiUrl}/sign-in`, context.getters.getUser)
                .then(response => {
                    context.commit('setUser', response.data)
                    localStorage.setItem(userKey, JSON.stringify(response.data))
                    resolve()
                })
                .catch(reject)
        })
    },
    signUp(context) {
        return new Promise((resolve, reject) => {
            axios.post(`${baseApiUrl}/sign-up`, context.getters.getUser)
                .then(() => {
                    localStorage.removeItem(userKey)
                    context.commit('setUser', {})
                    resolve()
                })
                .catch(reject)
        })
    },
    logout(context) {
        return new Promise((resolve, reject) => {
            try {
                localStorage.removeItem(userKey)
                context.commit('setUser', {})
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