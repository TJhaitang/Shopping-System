<template>
 <el-container style="height: 100%; border: 1px solid #eee">
   <!-- 侧菜单栏  -->
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']" router> 
     <el-menu-item index="/Commodity">商品管理</el-menu-item>
     <el-menu-item index="2">我的消息</el-menu-item>
     <el-menu-item index="3">系统消息</el-menu-item>
     <el-menu-item index="4">订单管理</el-menu-item>
     <el-menu-item index="5">设置</el-menu-item>
    </el-menu>
  </el-aside>
  
  <!-- 右上设置 -->
  <el-container>
   <el-header style="height: 100px; border: 1px solid #eee;position:relative">
     <!-- 头像  -->
    <el-avatar icon="el-icon-user-solid" style="height: 50px; width: 50px; left: 5px"></el-avatar>
    <p class="span1">id/</p>
    <p class="span2">个性签名/</p>
    <p class="span3">实名认证/</p>
    <p class="span4">金钱流水</p>
    </el-header>
     
    <el-header style="font-size: 12px;position:absolute;right:30px;height:50px;top:30px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px;text-align: right;width:50px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="quit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span style="display:inline-block;font-size:20px">王小虎</span>
    </el-header>

    <el-main>
      <router-view>
      </router-view>
    </el-main>
  </el-container>
 </el-container>
    
</template>

<style>
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
    position: relative;
    z-index: 100;
    font-size: 20px;
    top: -150px;
    left: 70px;
  }
  p.span2{
    position: relative;
    z-index: 100;
    font-size: 10px;
    top: -250px;
    left: 70px;
  }
  p.span3{
    position: relative;
    z-index: 100;
    font-size: 10px;
    top: -340px;
    left: 70px;
  }
  p.span4{
    position: relative;
    z-index: 100;
    font-size: 10px;
    top: -449.5px;
    left: 130px;
  }
</style>

<script>
  export default {
    
  };
</script>