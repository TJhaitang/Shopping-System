<!-- 数据表格渲染 -->
<template>
  <el-table :data="orderList" border fit highlight-current-row style="width: 100%">
      <el-table-column label="订单id" prop='id'></el-table-column>
      <el-table-column label="价格" prop='cost'></el-table-column>
      <el-table-column label="下单时间" prop='time'></el-table-column>
      <el-table-column label="订单编号" prop='order'></el-table-column>
      <el-table-column label="会员id" prop='uid'></el-table-column>
  </el-table>
</template>

<script>
 export default {
    //每个卡片对应的状态参数
  
    data() {
    return {
      orderList: [],
      total: 0,
      params:{
        orderQuery: {
        //查询数据预先设置
        id: undefined,
        uid: undefined,
        status: this.status,
      },
        pagenum:1,
        pagesize:2
      },
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      const {data:result} = await this.$http.get('orders',{
          params: this.orderQuery
      })
      if(result.meta.status !== 200){
          return this.$message.error('获取订单失败惹（╥﹏╥）')
      }
      this.orderList = result.orders
      this.totalpage = result.totalpage
      console.log(result) 
    }
  }
}
</script>