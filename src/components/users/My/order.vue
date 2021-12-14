<!--记得要加上退货和写评价-->
<template>
  <div class="order">
    <!-- 我的订单头部 -->
    <div class="order-header">
      <div class="order-header-content">
        <p>
          <i class="el-icon-s-order" style="font-size: 30px;color: #ff6700;"></i>
          我的订单
        </p>
      </div>
    </div>
    <!-- 我的订单头部END -->

    <!-- 我的订单主要内容 -->
    <div class="order-content" v-if="orders.length>0">
      <div class="content" v-for="(item,index) in orders" :key="index">
        <ul>
          <!-- 我的订单表头 -->
          <li class="order-info">
            <div class="order-id">订单编号: {{item.order_id}}</div>
            <div class="order-time">订单时间: {{item.order_time}}</div>
          </li>
          <li class="header">
            <div class="pro-img"></div>
            <div class="pro-name">商品名称</div>
            <div class="pro-price">单价</div>
            <div class="pro-num">数量</div>
            <div class="pro-total">小计</div>
            <div class="pro-comment">评价</div>
            <div class='pro-back'>售后</div>
          </li>
          <!-- 我的订单表头END -->
          
          <!-- 订单评价对话框 -->
    <el-dialog title='评价一下这一单吧！~' 
    :visible.sync = 'commentDialogVisible' 
    width = '50%'
    @close="commentDialogClosed">
      <el-form
        :model="commentForm"
        ref="commentFormRef"
        label-width="100px"
      >
        <el-form-item  label="商品名称">
          <el-input v-model="commentForm.product_name" :disabled="true"></el-input>
        </el-form-item> 
        <el-form-item  label="商品规格">
          <el-input v-model="commentForm.item_id" :disabled="true"></el-input>
        </el-form-item> 
        <el-form-item  label="分数">
          <el-rate
            v-model="commentForm.score"
            allow-half = true
            :colors= "['#99A9BF', '#F7BA2A', '#FF9900']" >
          </el-rate>
        </el-form-item> 
        <el-form-item  label="评价内容">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入评价内容"
            v-model="commentForm.content">
          </el-input>
        </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="insertComment">确认修改</el-button>
        <el-button type="primary" @click="commentDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 评价对话框结束 -->

          <!-- 订单列表 -->
          <li class="product-list" v-for="(commodity,i) in item.product" :key="i">
            <div class="pro-img">
                <img :src="commodity.product_picture" />
            </div>
            <div class="pro-name">{{commodity.product_name}}</div>
            <div class="pro-price">{{commodity.product_price}}元</div>
            <div class="pro-num">{{commodity.product_num}}</div>
            <div class="pro-total pro-total-in">{{commodity.product_price*commodity.product_num}}元</div>
            <div class="pro-comment">
                <el-button type="mini" icon='el-icon-edit' @click = "showCommentDialog(commodity)"></el-button>
            </div>
            <div class="pro-back">
              <el-dropdown trigger="click">
                <i class="el-icon-setting"></i>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item  @click.native="quit">退货</el-dropdown-item>
                <el-dropdown-item  @click.native="quit">换货</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </li>
        </ul>
        <div class="order-bar">
          <div class="order-bar-left">
            <span class="order-total">
              共
              <span class="order-total-num">{{item.quantity}}</span> 件商品
            </span>
          </div>
          <div class="order-bar-right">
            <span>
              <span class="total-price-title">合计：</span>
              <span class="total-price">{{item.cost}}元</span>
            </span>
          </div>
          <!-- 订单列表END -->
        </div>
      </div>
      <div style="margin-top:-40px;"></div>
    </div>
    <!-- 我的订单主要内容END -->

    <!-- 订单为空的时候显示的内容 -->
    <div v-else class="order-empty">
      <div class="empty">
        <h2>您还没有订单哦！</h2>
        <router-link to="/">快去购物吧</router-link>
      </div>
    </div>
    <!-- 订单为空的时候显示的内容END -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      orders: [{
        order_id:"123",//订单编号
        order_time:'2021-12-11',//订单时间
        product:[
          {product_name: "哇咔咔", // 订单商品名称
        product_picture: "http://assets.myntassets.com/v1/images/style/properties/7a5b82d1372a7a5c6de67ae7a314fd91_images.jpg", // 订单商品图片
        product_price: "144", // 订单商品价格
        product_num: "1", // 订单商品数量
          },
        ],
        quantity:2,
        cost:288
      }], // 订单列表
      commentDialogVisible: false,

      commentForm : {
        product_name:"",
        item_id:3, 
        score:"", //分数
        content: "" //评价
      }
    };
  },
  activated() {
    // 获取订单数据
    this.$axios
      .post("/api/user/order/getOrder", {
        user_id: this.$store.getters.getUser.user_id
      })
      .then(res => {
        if (res.data.code === "001") {
          this.orders = res.data.orders;
        } else {
          this.notifyError(res.data.msg);
        }
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },
  watch: {
    // 通过订单信息，计算出每个订单的商品数量及总价
    orders: function(val) {
      let total = [];
      for (let i = 0; i < val.length; i++) {
        const element = val[i];
        let totalNum = 0;
        let totalPrice = 0;
        for (let j = 0; j < element.length; j++) {
          const temp = element[j];
          totalNum += temp.product_num;
          totalPrice += temp.product_price * temp.product_num;
        }
        total.push({ totalNum, totalPrice });
      }
      this.total = total;
    }
  }, 
  methods: {
    showCommentDialog(row) {
      this.commentForm.product_name = row.product_name;
      this.commentForm.item_id = 3;
      this.commentForm.score = 0;
      this.commentForm.content = "";
      this.commentDialogVisible = true;
    },
    commentDialogClosed() {
      this.$refs.commentFormRef.resetFields(); //评价对话框置空
      this.commentDialogVisible = false;
    },
    insertComment() {
      this.$http.post("/member/Shopping/insertComment.php", 
        this.commentForm)
        .then(res => {
          console.log(res)
          if(res.data.status == "success")
            this.$message.success('评价成功！！');
          else this.$message.error('评价失败啦┭┮﹏┭┮');
      })
      this.commentDialogVisible = false;
    }
  }
};
</script>
<style scoped>
.order {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
/* 我的订单头部CSS */
.order .order-header {
  height: 64px;
  border-bottom: 2px solid #ff6700;
  background-color: #fff;
  margin-bottom: 20px;
}
.order .order-header .order-header-content {
  width: 1225px;
  margin: 0 auto;
}
.order .order-header p {
  font-size: 28px;
  line-height: 58px;
  float: left;
  font-weight: normal;
  color: #424242;
}
/* 我的订单头部CSS END */
.order .content {
  width: 1225px;
  margin: 0 auto;
  background-color: #fff;
  margin-bottom: 50px;
}
.order .content ul {
  background-color: #fff;
  color: #424242;
  line-height: 85px;
}
/* 我的订单表头CSS */
.order .content ul .order-info {
  height: 60px;
  line-height: 60px;
  padding: 0 26px;
  color: #424242;
  border-bottom: 1px solid #ff6700;
}
.order .content ul .order-info .order-id {
  float: left;
  color: #ff6700;
}
.order .content ul .order-info .order-time {
  float: right;
}
.order .content ul .header {
  height: 85px;
  padding-right: 26px;
  color: #424242;
}
/* 我的订单表头CSS END */
/* 订单列表CSS */
.order .content ul .product-list {
  height: 85px;
  padding: 15px 26px 15px 0;
  border-top: 1px solid #e0e0e0;
}
.order .content ul .pro-img {
  float: left;
  height: 85px;
  width: 120px;
  padding-left: 35px;
}
.order .content ul .pro-img img {
  height: 80px;
  width: 80px;
}
.order .content ul .pro-name {
  float: left;
  width: 280px;
  padding-left: 15px;
}
.order .content ul .pro-name a {
  color: #424242;
}
.order .content ul .pro-name a:hover {
  color: #ff6700;
}
.order .content ul .pro-price {
  float: left;
  width: 160px;
  padding-right: 18px;
  text-align: center;
}
.order .content ul .pro-num {
  float: left;
  width: 190px;
  text-align: center;
}
.order .content ul .pro-total {
  float: left;
  width: 160px;
  padding-right: 81px;
  text-align: right;
}
.order .content ul .pro-total-in {
  color: #ff6700;
}
.order .content ul .pro-comment {
  float: left;
}
.order .content ul .pro-back {
  float: left;
  padding-left: 40px;
}
.order .order-bar {
  width: 1185px;
  padding: 0 20px;
  border-top: 1px solid #ff6700;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
}
.order .order-bar .order-bar-left {
  float: left;
}
.order .order-bar .order-bar-left .order-total {
  color: #757575;
}
.order .order-bar .order-bar-left .order-total-num {
  color: #ff6700;
}
.order .order-bar .order-bar-right {
  float: right;
}
.order .order-bar .order-bar-right .total-price-title {
  color: #ff6700;
  font-size: 14px;
}
.order .order-bar .order-bar-right .total-price {
  color: #ff6700;
  font-size: 30px;
}
/* 订单列表CSS END */
/* 订单为空的时候显示的内容CSS */
.order .order-empty {
  width: 1225px;
  margin: 0 auto;
}
.order .order-empty .empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;
  background: url(./cart-empty.png) no-repeat 124px 0;
  color: #b0b0b0;
  overflow: hidden;
}
.order .order-empty .empty h2 {
  margin: 70px 0 15px;
  font-size: 36px;
}
.order .order-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
/* 订单为空的时候显示的内容CSS END */
</style>