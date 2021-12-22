<template>
  <div class="home" id="home" name="home">
    <!-- 轮播图 -->
    <div class="block">
      <el-carousel height="460px">
        <el-carousel-item v-for="item in carousel" :key="item.commodityId">
          <!-- :alt是什么玩意？？不晓得 -->
          <img style="height: 460px" :src="item.photo" :alt="item.price" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 轮播图END -->

    <!-- 男装展示区域 -->
    <div class="manClothes" id="promo-menu">
      <div class="box-hd">
        <div class="title">男装</div>
        <!-- 更多卡片 -->
        <div class="more" id="more">
          <MyMenu :val="4" @fromChild="getChildMsg">
            <span slot="1">热门</span>
            <span slot="2">男士上衣</span>
            <span slot="3">男士裤子</span>
            <span slot="4">男士套装</span>
          </MyMenu>
        </div>
      </div>
      <div class="box-bd">
        <div class="list">
          <MyList :list="manClothesList" :isMore="true"></MyList>
        </div>
      </div>
    </div>
    <!-- 男装商品展示区域END -->

    <!-- 女装展示区域 -->
    <div class="womanClothes" id="promo-menu">
      <div class="box-hd">
        <div class="title">女装</div>
        <!-- 更多卡片 -->
        <div class="more" id="more">
          <MyMenu :val="4" @fromChild="getChildMsg2">
            <span slot="1">热门</span>
            <span slot="2">女士上衣</span>
            <span slot="3">女士裤子</span>
            <span slot="4">女士套装、连衣裙</span>
          </MyMenu>
        </div>
      </div>
      <div class="box-bd">
        <div class="list">
          <MyList :list="womanClothesList" :isMore="true"></MyList>
        </div>
      </div>
    </div>
    <!-- 女装商品展示区域END -->

    <!-- 鞋包配饰展示区域 -->
    <div class="accessory" id="promo-menu">
      <div class="box-hd">
        <div class="title">鞋包配饰</div>
        <!-- 更多卡片 -->
        <div class="more" id="more">
          <MyMenu :val="4" @fromChild="getChildMsg3">
            <span slot="1">热门</span>
            <span slot="2">鞋</span>
            <span slot="3">包</span>
            <span slot="4">配饰</span>
          </MyMenu>
        </div>
      </div>
      <div class="box-bd">
        <div class="list">
          <MyList :list="accessory" :isMore="true"></MyList>
        </div>
      </div>
    </div>
    <!-- 鞋包配饰商品展示区域END -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      carousel: "", // 轮播图数据:登录的用户喜欢并且热卖的商品

      queryList: {
        name: "",
        label: "", //空字符串则全label
        uprice: 10 ^ 6, //不用就设置为int上限
        lprice: -1,
        sortfor: 1, //1:销量，2:平均分，3:价格,0:无   降序输出
        isDecent: 0, //0降序，1升序,soetfor是0的话这个无所谓
        suid: "", //传就是店铺内搜索，空字符串就是不(这里是字符串)
      },

      manClothesList: "", //男装商品展示列表
      manClothesHotList: "", //男装上衣
      manUpperList: "", //男装上衣
      manPantsList: "", //男装裤子
      manSuitList: "", //男装套装

      womanClothesList: "", //女装商品展示列表
      womanClothesHotList: "", //热门
      womanUpperList: "", //女装上衣
      womanPantsList: "", //女装裤子
      womanSuitList: "", //女装套装

      accessoryList: "", //鞋包配饰列表
      accessoryHotList: "", //热门
      accessoryShoesList: "", //鞋列表
      accessoryBagList: "", //包列表
      accessoryOtherList: "", //配饰

      manClothesActive: 1, // 男装当前选中的商品分类
      womanClothesActive: 1, // 女装当前选中的商品分类
      accessoryActive: 1, //配饰当前选中列表
    };
  },
  watch: {
    // 男装当前选中的商品分类，响应不同的商品数据
    manClothesActive: function (val) {
      // 页面初始化的时候把applianceHotList(热门家电商品列表)直接赋值给applianceList(家电商品列表)
      // 所以在切换商品列表时判断applianceHotList是否为空,为空则是第一次切换,把applianceList赋值给applianceHotList
      if (this.manClothesHotList == "") {
        this.manClothesHotList = this.manClothesList;
      }
      if (val == 1) {
        // 1为热门商品
        this.manClothesList = this.manClothesHotList;
        return;
      }
      if (val == 2) {
        // 2为电视商品
        this.manClothesList = this.manUpperList;
        return;
      }
      if (val == 3) {
        // 2为电视商品
        this.manClothesList = this.manPantsList;
        return;
      }
      if (val == 4) {
        // 2为电视商品
        this.manClothesList = this.manSuitList;
        return;
      }
    },
    womanClothesActive: function (val) {
      // 页面初始化的时候把applianceHotList(热门家电商品列表)直接赋值给applianceList(家电商品列表)
      // 所以在切换商品列表时判断applianceHotList是否为空,为空则是第一次切换,把applianceList赋值给applianceHotList
      if (this.womanClothesHotList == "") {
        this.womanClothesHotList = this.womanClothesList;
      }
      if (val == 1) {
        // 1为热门商品
        this.womanClothesList = this.womanClothesHotList;
        return;
      }
      if (val == 2) {
        // 2为电视商品
        this.womanClothesList = this.womanUpperList;
        return;
      }
      if (val == 3) {
        // 2为电视商品
        this.womanClothesList = this.womanPantsList;
        return;
      }
      if (val == 4) {
        // 2为电视商品
        this.womanClothesList = this.womanSuitList;
        return;
      }
    },
    accessoryActive: function (val) {
      // 页面初始化的时候把accessoryHotList(热门配件商品列表)直接赋值给accessoryList(配件商品列表)
      // 所以在切换商品列表时判断accessoryHotList是否为空,为空则是第一次切换,把accessoryList赋值给accessoryHotList
      if (this.accessoryHotList == "") {
        this.accessoryHotList = this.accessoryList;
      }
      if (val == 1) {
        // 1为热门商品
        this.accessoryList = this.accessoryHotList;
        return;
      }
      if (val == 2) {
        // 2为保护套商品
        this.accessoryList = this.accessoryShoesList;
        return;
      }
      if (val == 3) {
        //3 为充电器商品
        this.accessoryList = this.accessoryBagList;
        return;
      }
      if (val == 4) {
        //3 为充电器商品
        this.accessoryList = this.accessoryOtherList;
        return;
      }
    },
  },
  created() {
    // 获取轮播图数据
    this.$http.get("/member/Shopping/rcmds.php").then((res) => {
      this.carousel = res.data;
      console.log(res);
    });
    // '1', '男上装', '男的上装'
    // '2', '男下装', '男的下装'
    // '3', '男套装', '男的套装'
    // '4', '女上装', '女的上装'
    // '5', '女下装', '女的下装'
    // '6', '女套装', '女的套装'
    // '7', '鞋', '穿在脚上的'
    // '8', '包', '背包、挎包什么的'
    // '9', '其他', '其他什么的'

    // 获取各类商品数据
    this.getPromo("(1)", "manUpperList");
    this.getPromo("(2)", "manPantsList");
    this.getPromo("(3)", "manSuitList");

    this.getPromo("(4)", "womanUpperList");
    this.getPromo("(5)", "womanPantsList");
    this.getPromo("(6)", "womanSuitList");

    this.getPromo("(7)", "accessoryShoesList");
    this.getPromo("(8)", "accessoryBagList");
    this.getPromo("(9)", "accessoryOtherList");
    this.getPromo("(1,2,3)", "manClothesList");
    this.getPromo("(4,5,6)", "womanClothesList");
    this.getPromo("(7,8,9)", "accessoryList");
  },
  methods: {
    // 获取家电模块子组件传过来的数据
    getChildMsg(val) {
      this.manClothesActive = val;
      console.log("val");
    },
    // 获取配件模块子组件传过来的数据
    getChildMsg2(val) {
      this.womanClothesActive = val;
    },
    getChildMsg3(val) {
      this.accessoryActive = val;
    },
    // 获取各类商品数据方法封装
    getPromo(QueryLable, val) {
      this.queryList.label = QueryLable;
      this.$http
        .post("/member/Shopping/queryComList.php", this.queryList)
        .then((res) => {
          this[val] = res.data;
          console.log();
        });
    },
  },
};
</script>

<style lang="less" scoped>
.main-box {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}

.main {
  margin: 0 auto;
  max-width: 1225px;
}

/* 轮播图CSS */
.block {
  margin: 0 auto;
  max-width: 1225px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

/* 轮播图CSS END */

.box-hd {
  height: 58px;
  margin: 20px 0 0 0;
}

.box-hd .title {
  float: left;
  font-size: 22px;
  font-weight: 200;
  line-height: 58px;
  color: #333;
}

.box-hd .more {
  float: right;
}

.box-hd .more a {
  font-size: 16px;
  line-height: 58px;
  color: #424242;
}

.box-hd .more a:hover {
  color: #ff6700;
}

.box-bd {
  height: 615px;
}

.box-bd .promo-list {
  float: left;
  height: 615px;
  width: 234px;
}

.box-bd .promo-list li {
  z-index: 1;
  width: 234px;
  height: 300px;
  margin-bottom: 14.5px;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
}

.box-bd .promo-list li:hover {
  z-index: 2;
  -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}

.box-bd .promo-list li img {
  width: 234px;
  height: 300px;
}

.box-bd .promo-list img {
  width: 234px;
}

.box-bd .list {
  float: left;
  height: 615px;
  width: 991px;
}
</style>