<template>
 <el-container style="height: 100%; border: 1px solid #eee">
   <!-- 侧菜单栏  -->
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>首页</template>
        <el-menu-item-group>
          <el-menu-item index="1-1">店铺管理</el-menu-item>
          <el-menu-item index="1-2">商品管理</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>消息</template>
        <el-menu-item-group>
          <el-menu-item index="2-1">我的消息</el-menu-item>
          <el-menu-item index="2-2">系统消息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>我的</template>
        <el-menu-item-group>
          <el-menu-item index="3-1">订单管理</el-menu-item>
          <el-menu-item index="3-2">设置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <!-- 右上设置 -->
  <el-container>
   <el-header style="height: 80px; border: 1px solid #eee">
     <!-- 头像  -->
    <el-avatar icon="el-icon-user-solid" style="height: 50px; width: 50px; left: 5px"></el-avatar>
   </el-header>
     
    

    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
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
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>