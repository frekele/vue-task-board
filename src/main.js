import 'font-awesome/css/font-awesome.css'
import './style.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import './config/axios'
import './config/mq'
import './config/draggable'

import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')