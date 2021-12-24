<template>
 <el-container style="height: 100%; border: 1px solid #eee">
   <!-- 侧菜单栏  -->
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-active="orders" router> 
     <el-menu-item index="/Commodity">商品管理</el-menu-item>
     <el-menu-item index="2">我的消息</el-menu-item>
     <el-menu-item index="3">系统消息</el-menu-item>
     <el-menu-item index="/orders">订单管理</el-menu-item>
     <el-menu-item index="info">设置</el-menu-item>
    </el-menu>
  </el-aside>
  
  <!-- 右上设置 -->
  <el-container>
   <el-header style="height: 100px; border: 1px solid #eee;position:relative"> 
    <!--<p class="span1">昵称：{{this.$store.getters.getnick}}</p>
    <p class="span2">个性签名：{{this.$store.getters.getsig}}</p>-->
    <p class="span1">昵称：{{this.info.username}}</p>
    <p class="span2">个性签名：{{this.signature}}</p>
    </el-header>
    <el-header style="font-size: 12px;position:absolute;right:30px;height:50px;top:30px">
      <el-dropdown trigger="click">
        <i class="el-icon-setting" style="margin-right: 15px;text-align: right;width:50px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item  @click.native="quit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span style="display:inline-block;font-size:20px">店名:{{this.info.uid}}</span>
    </el-header>
    
    <el-main>
      <router-view>
      </router-view>
    </el-main>
    
  </el-container>
 </el-container>
    
</template>

<script>
  import url1 from '../xiyangyang.png';
  import url2 from '../meiyangyang.png';
  import url3 from '../lanyangyang.png';
  import url4 from '../feiyangyang.png';
  import url5 from '../nuanyangyang.png';
  import { mapActions } from "vuex";
  import { mapGetters } from "vuex";
  export default {
    data(){
      return{
        info:[]
      }
    },
    created(){
      this.getMerchantInfo();
    },
    computed: {
    ...mapGetters(["getinfo","getUser"])
  },
    methods: {
      ...mapActions(["setinfo"]),
      quit() {
        localStorage.clear();
        this.$router.push('/login');
      },
      async getMerchantInfo(){
        // let jwt = localStorage.getItem("token");
        // this.$http.defaults.headers.common["X-token"] = jwt;
      const {data: res} = await this.$http.get('/merchant/getInfo.php')
      if (res.status == 'TokenNotValid'){
        return this.$message.error('获取商家信息失败（╥﹏╥）')
      }
      else{
        this.setinfo(res);
        this.info=res;
        console.log(this.info)
      }

    },
    }
  };
</script>

<style lang="less" scoped>
  .el-header {
    background-color: #B3C0D1;
    color: rgb(126, 124, 124);
    line-height: 100px;
    height: 10%;
  }
  
  .el-aside {
    color: #333;
  }
  .el-avatar {
    height: 100px;
    width: 100px;
  }
  p.span1{
    position: absolute;
    z-index: 100;
    font-size: 15px;
    top: -10px;
    left: 100px;
  }
  p.span2{
    position: absolute;
    z-index: 100;
    font-size: 15px;
    top: 20px;
    left: 100px;
  }

  //选择头像时的样式
  .avatar_select{
    height: 70px;
    width: 70px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 15px rgb(166, 164, 168);    
    transform: translate(-50%, -50%);
    background-color: rgb(250, 248, 248);
    position: absolute;
    left: 20%;
    top:9%;
    img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
  }
</style>