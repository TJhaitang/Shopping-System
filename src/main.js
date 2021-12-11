import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ImgInputer from 'vue-img-inputer'
import './plugins/element.js'
// 设置全局样式
import './assets/css/global.css'

import 'vue-img-inputer/dist/index.css'

import axios from 'axios'
import store from './store'

import MyLogin from './components/users/MyLogin.vue';
Vue.component(MyLogin.name, MyLogin);
import MyRegister from './components/users/MyRegister';
Vue.component(MyRegister.name, MyRegister);
import MyMenu from './components/users/MyMenu';
Vue.component(MyMenu.name, MyMenu);
import MyList from './components/users/MyList';
Vue.component(MyList.name, MyList);
Vue.component('ImgInputer', ImgInputer);


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
  render: h => h(App),
  store, //将store挂载到新的Vue对象上
}).$mount('#app')
