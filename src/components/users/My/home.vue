<template>
  <div id="app" name="app">
    <el-container>
     <!-- 顶部导航栏 -->
     <div class="topbar">
        <div class="nav">
          <ul>
            <li v-if="!localStorage.getItem('token')">
              <el-button type="text" @click="toLogin">用户登录</el-button>
              <span class="sep">|</span>
              <el-button type="text" @click="toRegister">用户注册</el-button>
            </li>
            <li v-else>
              欢迎
              <el-popover placement="top" width="180" v-model="visible">
                <p>确定退出登录吗？</p>
                <div style="text-align: right; margin: 10px 0 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="logout">确定</el-button>
                </div>
                <el-button type="text" slot="reference">{{this.info.username}}</el-button>
              </el-popover>
            </li>
            <li>
              <router-link to="/order">我的订单</router-link>
            </li>
            <li>
              <router-link to="/collect">我的收藏</router-link>
            </li>
            <li :class="info> 0 ? 'shopCart-full' : 'shopCart'">
              <router-link to="/shoppingCart">
                <i class="el-icon-shopping-cart-full"></i> 购物车
                <span class="num">({{cartNum}})</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </el-container>
  </div>

</template>

<script>
export default {
  methods: {
     //进入页面就检查是否已经登录。如果已经登录就获取个人信息
    
      async getInfo() {
        if (localStorage.getItem("token")) {
      // 如果已经登录，设置vuex登录状态
        const {data:result} = await this.$http.get('/')
        this.info = result
        this.set
       }
      },
      toLogin() {
        this.$router.push('/login_u');
      },
      toRegister() {
        this.$router.push('/register_u');
      },
      logout() {
      this.visible = false;
      // 清空本地登录信息
      localStorage.clear();
      this.notifySucceed("成功退出登录");
      },
    },
  created() {
    // 获取浏览器localStorage，判断用户是否已经登录
    this.getInfo();
  },
  data() {
    return {
      visible: false, // 是否退出登录的显示
      info: [], //用户信息，包括基本信息和购物车信息等
    };
  },


}
</script>

<style 
/* 全局CSS */
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
}
#app .el-header {
  padding: 0;
}
#app .el-main {
  min-height: 300px;
  padding: 20px 0;
}
#app .el-footer {
  padding: 0;
}
a,
a:hover {
  text-decoration: none;
}
/* 全局CSS END */
/* 顶部导航栏CSS */
.topbar {
  height: 40px;
  background-color: #3d3d3d;
  margin-bottom: 20px;
}
.topbar .nav {
  width: 1225px;
  margin: 0 auto;
}
.topbar .nav ul {
  float: right;
}
.topbar .nav li {
  float: left;
  height: 40px;
  color: #b0b0b0;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  margin-left: 20px;
}
.topbar .nav .sep {
  color: #b0b0b0;
  font-size: 12px;
  margin: 0 5px;
}
.topbar .nav li .el-button {
  color: #b0b0b0;
}
.topbar .nav .el-button:hover {
  color: #fff;
}
.topbar .nav li a {
  color: #b0b0b0;
}
.topbar .nav a:hover {
  color: #fff;
}
.topbar .nav .shopCart {
  width: 120px;
  background: #424242;
}
.topbar .nav .shopCart:hover {
  background: #fff;
}
.topbar .nav .shopCart:hover a {
  color: #ff6700;
}
.topbar .nav .shopCart-full {
  width: 120px;
  background: #ff6700;
}
.topbar .nav .shopCart-full a {
  color: white;
}
/* 顶部导航栏CSS END */
</style>