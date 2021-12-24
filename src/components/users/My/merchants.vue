<template>
  <div class="merchant">
    <!-- 全部商家头部 -->
    <div class="merchant-header">
      <div class="merchant-header-content">
        <p>
          <i class="el-icon-s-order" style="font-size: 30px;color: #ff6700;"></i>
          全部商家
        </p>
      </div>
    </div>
    <!-- 全部商家头部END -->

    <!-- 全部商家主要内容 -->
    <div class="merchant-content" v-if="merchants.length>0">
      <div class="content" v-for="(item,index) in merchants" :key="index">
        <ul>
          <!-- 我的订单表头 -->
          <li class="merchant-info">
            <div class="merchant-id">商家编号: {{item.suid}}</div>
          </li>
          <li class="header">
            <div class="pro-name">商家昵称：{{item.username}}</div>
            <div class="pro-province">商家所在省份：{{item.province}}</div>
            <div class="pro-score">商家评分：{{item.avgScore}}</div>
          </li>
          <!-- 我的订单表头END -->         
        </ul>
        <div class="merchant-bar"></div>
          <!-- 订单列表END -->
        </div>
      </div>
      <div style="margin-top:-40px;"></div>
    </div>
    <!-- 我的订单主要内容END -->

</template>
<script>
export default {
  data() {
    return {
      merchants: [
      
      ], // 订单列表
    };
  },
  activated() {
    // 获取商家数据
    this.$http
          .get("/member/Shopping/getMerchantList.php")
           .then(res => {
             console.log(res)
             if (res.data.merNum>0) {
            //  不为'fail'为成功, 更新vuex商家列表状态
               let length = res.data.merNum;
               for(let i = 1;i<=length;i++){
                 this.merchants.push(res.data[i]);
               }
             } else {
               // 提示失败信息
               this.$message.error('没获取到商家信息 呜呜');
             }
           });
  },
  methods: {
    
  }
};
</script>
<style scoped>
.merchant {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
/* 我的订单头部CSS */
.merchant .merchant-header {
  height: 64px;
  border-bottom: 2px solid #ff6700;
  background-color: #fff;
  margin-bottom: 20px;
}
.merchant .merchant-header .merchant-header-content {
  width: 1225px;
  margin: 0 auto;
}
.merchant .merchant-header p {
  font-size: 28px;
  line-height: 58px;
  float: left;
  font-weight: normal;
  color: #424242;
}
/* 我的订单头部CSS END */
.merchant .content {
  width: 1225px;
  margin: 0 auto;
  background-color: #fff;
  margin-bottom: 50px;
}
.merchant .content ul {
  background-color: #fff;
  color: #424242;
  line-height: 85px;
}
/* 我的订单表头CSS */
.merchant .content ul .merchant-info {
  height: 60px;
  line-height: 60px;
  padding: 0 26px;
  color: #424242;
  border-bottom: 1px solid #ff6700;
}
.merchant .content ul .merchant-info .merchant-id {
  float: left;
  color: #ff6700;
}
.merchant .content ul .header {
  height: 85px;
  padding-right: 26px;
  color: #424242;
}
/* 我的订单表头CSS END */
/* 订单列表CSS */
.merchant .content ul .pro-name {
  float: left;
  width: 280px;
  padding-left: 70px;
}
.merchant .content ul .pro-province {
  float: left;
  width: 190px;
  text-align: center;
}
.merchant .content ul .pro-score {
  float: left;
  padding-left: 300px;
}
/* 订单列表CSS END */
</style>