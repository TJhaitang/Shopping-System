import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 设置全局样式
import './assets/css/global.css'

import axios from 'axios'
//配置请求根路径在这里填  👇
axios.defaults.baseURL = '/php'

//挂载路由之前增加请求拦截器,用use函数挂载
axios.interceptors.request.use(config => {
  console.log(config);
  //请求头里增加token令牌
  config.headers.authorization = localStorage.getItem('token')
  //最后必须returnconfig
  return config;
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
