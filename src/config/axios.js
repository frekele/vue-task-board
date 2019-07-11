import axios from 'axios'

const success = res => res
const error = err => {
    if (err.response && 401 === err.response.status) {
        window.location = '/auth'
    } else {
        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, error)