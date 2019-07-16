import 'font-awesome/css/font-awesome.css'
import './style.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import './config/axios'
import './config/mq'
import './config/vuelidate'
import './config/draggable'

import store from './store/store'
import router from './config/router'

Vue.config.productionTip = false

// eslint-disable-next-line
Vue.prototype.$log = console.log.bind(console)

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')