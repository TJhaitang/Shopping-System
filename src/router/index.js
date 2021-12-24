import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/Merchant/login.vue'
import My from '../components/Merchant/My/My.vue'
import signUp from '../components/Merchant/signUp.vue'
import Commodity from  '../components/Merchant/My/Commodity.vue'
import orders from '../components/Merchant/My/orders.vue'
import information from '../components/Merchant/My/merchant-info.vue'

import signUp_u from '../components/users/signUp_u.vue'
import App from '../components/users/My/App.vue'
import home from '../components/users/My/home.vue'
import order from '../components/users/My/order.vue'
import collect from '../components/users/My/collect.vue'
import shoppingCart from '../components/users/My/shoppingCart.vue'
import good_detail from '../components/users/My/Good_details.vue'
import confirmOrder from '../components/users/My/ConfirmOrder.vue'
import goods from '../components/users/My/goods.vue'
import merchant from '../components/users/My/merchants.vue'

Vue.use(VueRouter)

const router = new VueRouter( {
  routes: [ 
  
  { path: '/login', component: login },
  { path: '/my',component: My,
  children: 
  [{path: '/orders',component:orders},
  { path: '/Commodity',component:Commodity},
  {path: '/info',component: information}]
},
  { path: '/signUp',component: signUp},
  { path: '/signUp_u',component: signUp_u},
  { path: '/',component: App,
  children:[{ path: '/shoppingCart',component: shoppingCart},
  { path: '/order',component: order},
  { path: '/home',component: home},
  { path: '/good_detail',component: good_detail},
  { path: '/collect',component: collect},
  { path:'/confirmOrder',component:confirmOrder},
  { path: '/goods',component: goods},
  { path: '/merchants',component:merchant}]},
]})

//挂载路由导航守卫之后再暴露路由

router.beforeEach((to, from, next) => {
  // to:将要访问的路径
  // from: 从哪个路径跳转而来
  // next: 放行函数
  // next() 放行； next('/login') 强制跳转（没有token的时候）
  if(to.path === '/login' || to.path === '/signUp'  || to.path === '/' || to.path === '/home'||to.path==='/order'||to.path==='/confirmOrder' || to.path==='/goods'||to.path==='/merchants') return next();
  //拿出token
  else if(to.path === '/my' || to.path === '/orders' || to.path === '/Commodity' || to.path === '/info'){
    if(localStorage.getItem('merchantToken')){
      next();
    }
    else {
      return next('/login');
    }
  }
  else if(to.path === '/order' || to.path === '/collect' || to.path === '/shoppingCart' ){
    if(localStorage.getItem('userToken')){
      next();
    }
      else {
        return next('/home');
      }
  }
})

export default router