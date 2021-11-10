<template>
 <el-container style="height: 100%; border: 1px solid #eee">
   <!-- 侧菜单栏  -->
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['orders']" :router='true'> 
     <el-menu-item index="1">商品管理</el-menu-item> 
     <el-menu-item index="2">我的消息</el-menu-item>
     <el-menu-item index="3">系统消息</el-menu-item>
     <el-menu-item index="/orders">订单管理</el-menu-item>
     <el-menu-item index="5">设置</el-menu-item>
    </el-menu>
  </el-aside>
  
  <!-- 右上设置 -->
  <el-container>
   
     
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="quit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
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
</style>

<script>
  export default {
    
  };
</script>