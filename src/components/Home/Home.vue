<template>
 <el-container style="height: 100%; border: 1px solid #eee">
   <!-- 侧菜单栏  -->
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']"> 
     <el-menu-item index="1">商品管理</el-menu-item>
     <el-menu-item index="2">我的消息</el-menu-item>
     <el-menu-item index="3">系统消息</el-menu-item>
     <el-menu-item index="4">订单管理</el-menu-item>
     <el-menu-item index="5">设置</el-menu-item>
    </el-menu>
  </el-aside>
  
  <!-- 右上设置 -->
  <el-container>
   <el-header style="height: 80px; border: 1px solid #eee">
     <!-- 头像  -->
    <el-avatar icon="el-icon-user-solid" style="height: 50px; width: 50px; left: 5px"></el-avatar>
    <span>id/</span>
    <span>个性签名/</span>
    <span>实名认证/</span>
    <span>金钱流水</span>
   </el-header>
     
    

    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="id" label="商品id" width="100">
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="200">
        </el-table-column>
        <el-table-column prop="category" label="商品种类" width="150">
        </el-table-column>
        <el-table-column prop="price" label="商品价格" width="100">
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
        id: '***',
        name: '数据库大作业代写',
        category: '服务类',
        price: '999'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>