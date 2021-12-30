<template>
  <div id="details">
    <!-- 头部 -->
    <div class="page-header">
      <div class="title">
        <p>{{productName}}</p>
        <div class="list">
          <ul>
            <li>
              <router-link to>概述</router-link>
            </li>
            <li>
              <router-link to>参数</router-link>
            </li>
            <li>
              <router-link :to="{path:'/merchant_detail',query:{merchantID:this.suid}}">进店逛逛</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 头部END -->

    <!-- 主要内容 -->
    <div class="main">
      <div class="block">
        <el-carousel height="560px" v-if="pictures.length>1">
          <el-carousel-item v-for="item in pictures" :key="item.id">
            <img style="height:560px;" :src="item.sort_picture">
          </el-carousel-item>
        </el-carousel>
        <div v-if="pictures.length==1">
          <img
            style="height:560px;"
            :src="pictures[0].sort_picture"
          >
        </div>
      </div>
      <!-- 左侧商品轮播图END -->

      <!-- 右侧内容区 -->
      <div class="content">
        <h1 class="name">{{productName}}</h1>
        <p class="intro">{{productDetails}}</p> 
        <div class="price">
          <span>{{domains[0].sort_price}}元</span>
        </div>
        <div class = "changesort_button">
          <el-button-group style="margin-top:20px">
            <el-button
             v-for="(domain,index) in domains"
            :key="domain.key"
            @click="changeSort(index)" 
            style="margin-right:20px"
            >{{domains[index].sort_name}}</el-button> 
          </el-button-group>
        </div> 
        <div class="pro-list">
          <!-- <span class="pro-name">{{productDetails.product_name}}</span> -->
          <span class="pro-name">{{productName}}</span>
          <span class="pro-price">
            <span
              v-show="productDetails.product_price != productDetails.product_selling_price"
              class="pro-del"
            >{{productDetails.product_price}}元</span>
          </span>
          <p class="price-sum">总计 : {{domains[this.index_present].sort_price*this.num_addcart}}元</p>
          
        </div>
        <!-- 内容区底部按钮 -->
        <div class="button" >
          <el-input-number style="float: left;size:big" v-model="num_addcart" @change="handleChange" :min="1" :max="10" label="选择数量"></el-input-number>
          <el-button style="margin-left:20px;float: left;" class="shop-cart" :disabled="dis" @click="addShoppingCart">加入购物车</el-button>
        </div>
        <!-- 内容区底部按钮END -->
        <div class="pro-policy">
          <ul>
            <li>
              <i class="el-icon-circle-check"></i> 品质保障
            </li>
            <li>
              <i class="el-icon-circle-check"></i> 准时发货
            </li>
            <li>
              <i class="el-icon-circle-check"></i> 7天无理由退货
            </li>
            <li>
              <i class="el-icon-circle-check"></i> 7天价格保护
            </li>
          </ul>
        </div>
      </div> 
      <!-- 右侧内容区END -->
    </div>
    <!-- 主要内容END -->
    <div class='comments'>
      <el-table :data="comments" border stripe>
        <el-table-column prop="comment_score" label="评分" width="50">
        </el-table-column>
        <el-table-column prop="comment_content" label="评论内容" width="300">
        </el-table-column>
        <el-table-column prop="comment_addtime" label="评论时间" width="300">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dis: false, // 控制“加入购物车按钮是否可用”
      productID: "", // 商品id
      productDetails: "", // 商品详细信息
      productPicture: "", // 商品图片
      productName: "",
      //price: "",
      index_present:"",
      domains: [],
      pictures: [],
      commentNum: "",
      comments: [],
      Avg_score: "",
      num_addcart: 1,
      suid:""
    };
  },
  // 通过路由获取商品id
  activated() {
    if (this.$route.query.productID != undefined) {
      this.productID = this.$route.query.productID
    }
  },
  watch: {
    // 监听商品id的变化，请求后端获取商品数据
    productID: function(val) {
      this.getDetails(val);
      this.getDetailsPicture(val);
    }
  },
  created(){
    if (this.$route.query.productID != undefined) {
      this.productID = this.$route.query.productID
    }
      console.log(this.$route.query.productID);
      this.getDetails()
      this.getComments()
    },
  methods: {
    ...mapActions(["unshiftShoppingCart", "addShoppingCartNum"]),
    // 获取商品详细信息
    getDetails() {
      this.$http.post('/member/Shopping/getCommodityInfo.php',
      {
        comId:this.productID
      }).then(result=>{
        console.log(result.data)
        if(result.data.status !== 'fail'){
          this.productDetails = result.data.description
          this.productName = result.data.name
          this.suid = result.data.suid
          console.log(this.suid);
          if(result.data.domains.stdNum >0){
            this.domains = [];
            for(let i=0;i<result.data.domains.stdNum;i++){
              this.domains.push({
               sort_name: result.data.domains[i+1].name,
               sort_id:result.data.domains[i+1].id,
               sort_price:result.data.domains[i+1].price,
               sort_standards:result.data.domains[i+1].standards,
               sort_stock:result.data.domains[i+1].stock,
               sort_sales:result.data.domains[i+1].sales,
              })
            }
          }

           if(result.data.pictures.picNum>0){
             this.pictures = [];
             for(let i=0;i<result.data.pictures.picNum;i++){
              this.pictures.push({
                sort_picture: result.data.pictures[i+1].photo,
              })
              console.log(result.data.pictures[i+1].photo)
            }
          }
          console.log('成功辽')
          this.index_present = 0;
        }
        else return this.$message.error('获取商品信息失败！')
      })
    },
    getComments(){
      this.$http.post('/member/Shopping/getComments.php',
      {
        commodityId:this.productID
      }).then(result=>{
        console.log(result)
        if(result.data.status !== 'fail'){
          console.log("comment_success")
          this.commentNum = result.data.commentNum
          this.Avg_score = result.data.avgScore
          if(this.commentNum>0){
            for(let i = 0;i<this.commentNum;i++)
            {
              this.comments = [];
              this.comments.push({
                comment_content: result.data[i+1].content,
                comment_userid: result.data[i+1].user_id,
                comment_itemid: result.data[i+1].item_id,
                comment_addtime: result.data[i+1].addTime,
                comment_score: result.data[i+1].score,
              })
            }
        }
      }
      console.log("comment_finish")
      })
    },
    // 加入购物车
    addShoppingCart() {
      console.log("shoppingcart")
      if (localStorage.getItem("user")){
        this.$http.post('/member/Shopping/insertCar.php',
        {
          num:this.num_addcart,
          item_id:this.domains[this.index_present].sort_id
        }).then(result=>{
          if(result.data.status == "success"){
            this.$message.success("添加成功~在购物车等你！");
            this.$router.go(0)
          }
        })
      }
      else{
        this.$message.error("请您先登录哦~")
      }
    },
     changeSort(index){
       //this.price = this.domains[index].sort_price
       this.index_present = index
       console.log("index_present")
       console.log(this.index_present)
       console.log(this.domains[this.index_present].sort_price)
    },
    handleChange(value) {
        console.log(value);
      }
  }
};
</script>
<style>
/* 头部CSS */
#details .page-header {
  height: 64px;
  margin-top: -20px;
  z-index: 4;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  -webkit-box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
}
#details .page-header .title {
  width: 1225px;
  height: 64px;
  line-height: 64px;
  font-size: 18px;
  font-weight: 400;
  color: #212121;
  margin: 0 auto;
}
#details .page-header .title p {
  float: left;
}
#details .page-header .title .list {
  height: 64px;
  float: right;
}
#details .page-header .title .list li {
  float: left;
  margin-left: 20px;
}
#details .page-header .title .list li a {
  font-size: 14px;
  color: #616161;
}
#details .page-header .title .list li a:hover {
  font-size: 14px;
  color: #ff6700;
}
/* 头部CSS END */
/* 主要内容CSS */
#details .main {
  width: 1225px;
  height: 560px;
  padding-top: 30px;
  margin: 0 auto;
}
#details .main .block {
  float: left;
  width: 560px;
  height: 560px;
}
#details .el-carousel .el-carousel__indicator .el-carousel__button {
  background-color: rgba(163, 163, 163, 0.8);
}
#details .main .content {
  float: left;
  margin-left: 25px;
  width: 640px;
}
#details .main .content .name {
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  font-weight: normal;
  color: #212121;
}
#details .main .content .intro {
  color: #b0b0b0;
  padding-top: 10px;
}
#details .main .content .store {
  color: #ff6700;
  padding-top: 10px;
}
#details .main .content .price {
  display: block;
  font-size: 18px;
  color: #ff6700;
  border-bottom: 1px solid #e0e0e0;
  padding: 25px 0 25px;
}
#details .main .content .price .del {
  font-size: 14px;
  margin-left: 10px;
  color: #b0b0b0;
  text-decoration: line-through;
}
#details .main .content .pro-list {
  background: #f9f9fa;
  padding: 30px 60px;
  margin: 50px 0 50px;
}
#details .main .content .pro-list span {
  line-height: 30px;
  color: #616161;
}
#details .main .content .pro-list .pro-price {
  float: right;
}
#details .main .content .pro-list .pro-price .pro-del {
  margin-left: 10px;
  text-decoration: line-through;
}
#details .main .content .pro-list .price-sum {
  color: #ff6700;
  font-size: 24px;
  padding-top: 20px;
}
#details .main .content .button {
  height: 55px;
  margin: 10px 0 20px 0;
}
#details .main .content .button .el-button {
  float: left;
  height: 55px;
  font-size: 16px;
  color: #fff;
  border: none;
  text-align: center;
}
#details .main .content .button .shop-cart {
  width: 340px;
  background-color: #ff6700;
}
#details .main .content .button .shop-cart:hover {
  background-color: #f25807;
}
#details .main .content .button .like {
  width: 260px;
  margin-left: 40px;
  background-color: #b0b0b0;
}
#details .main .content .button .like:hover {
  background-color: #757575;
}
#details .main .content .pro-policy li {
  float: left;
  margin-right: 20px;
  color: #b0b0b0;
}
/* 主要内容CSS END */
</style>