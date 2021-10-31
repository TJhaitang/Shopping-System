import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 设置全局样式
import './assets/css/global.css'

import axios from 'axios'
//配置请求根路径在这里填  👇
axios.defaults.baseURL = '/api'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
