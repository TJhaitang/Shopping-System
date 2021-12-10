<template>
  <div class="home" id="home" name="home">
    <!-- 轮播图 -->
    <div class="block">
      <el-carousel height="460px">
        <el-carousel-item v-for="item in carousel" :key="item.carousel_id">
          <!-- :alt是什么玩意？？不晓得 -->
          <img style="height:460px;" :src="item.imgSrc" :alt="item.describes" />
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
            <div class="promo-list">
              <ul>
                <li>
                  <img src="http://assets.myntassets.com/v1/images/style/properties/7a5b82d1372a7a5c6de67ae7a314fd91_images.jpg" />
                </li>
                <li>
                  <img src="http://assets.myntassets.com/v1/images/style/properties/4850873d0c417e6480a26059f83aac29_images.jpg" />
                </li>
              </ul>
            </div>
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
              <MyMenu :val="4" @fromChild="getChildMsg">
                <span slot="1">热门</span>
                <span slot="2">女士上衣</span>
                <span slot="3">女士裤子</span>
                <span slot="4">女士套装、连衣裙</span>
              </MyMenu>
            </div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <ul>
                <li>
                  <img src="http://assets.myntassets.com/v1/images/style/properties/7a5b82d1372a7a5c6de67ae7a314fd91_images.jpg" />
                </li>
                <li>
                  <img src="http://assets.myntassets.com/v1/images/style/properties/4850873d0c417e6480a26059f83aac29_images.jpg" />
                </li>
              </ul>
            </div>
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
              <MyMenu :val="4" @fromChild="getChildMsg">
                <span slot="1">热门</span>
                <span slot="2">鞋</span>
                <span slot="3">包</span>
                <span slot="4">配饰</span>
              </MyMenu>
            </div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <ul>
                <li>
                  <img src="http://assets.myntassets.com/v1/images/style/properties/7a5b82d1372a7a5c6de67ae7a314fd91_images.jpg" />
                </li>
                <li>
                  <img src="http://assets.myntassets.com/v1/images/style/properties/4850873d0c417e6480a26059f83aac29_images.jpg" />
                </li>
              </ul>
            </div>
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

      manClothesList: "", //男装商品展示列表
      manClothesHotList: "", //热门
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
    manClothesActive: function(val) {
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
    womanClothesActive: function(val) {
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
    accessoryActive: function(val) {
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
    }
  },
  created() {
    // 获取轮播图数据
    this.$http
      .post("获取轮播图数据", {})
      .then(res => {
        this.carousel = res.data.carousel;
      });
    // 获取各类商品数据
    this.getPromo("manUpper", "manUpperList");
    this.getPromo("manPants", "manPantsList");
    this.getPromo("manSuit", "manSuitList");

    this.getPromo("womanUpper", "womanUpperList");
    this.getPromo("womanPants", "womanPantsList");
    this.getPromo("womanSuit", "womanSuitList");

    this.getPromo("accessoryShoes", "accessoryShoesList");
    this.getPromo("accessoryBag", "accessoryBagList");
    this.getPromo("accessoryOther", "accessoryOtherList");
    this.getPromo(
      ["manUpper", "manPants", "manSuit"],
      "manClothesList",
      "/api/product/getHotProduct"
    );
    this.getPromo(
      ["womanUpper", "womanPants", "womanSuit"],
      "womanClothesList",
      "/api/product/getHotProduct"
    );
    this.getPromo(
      ["accessoryShoes", "accessoryBag", "accessoryOther"],
      "accessoryList",
      "/api/product/getHotProduct"
    );
  },
  methods: {
    // 获取家电模块子组件传过来的数据
    getChildMsg(val) {
      this.manClothesActive = val;
    },
    // 获取配件模块子组件传过来的数据
    getChildMsg2(val) {
      this.womanClothesActive = val;
    },
     getChildMsg3(val) {
      this.accessoryActive = val;
    },
    // 获取各类商品数据方法封装
    getPromo(categoryName, val, api) {
      api = api != undefined ? api : "/api/product/getPromoProduct";
      this.$http
        .post(api, {
          categoryName
        })
        .then(res => {
          this[val] = res.data.Product;
        });
    }
  }
};
</script>