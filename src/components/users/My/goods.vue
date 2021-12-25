<template>
  <div class="goods" id="goods" name="goods">
    <div class="head1">
     <!-- 面包屑 -->
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>全部商品</el-breadcrumb-item>
          <el-breadcrumb-item v-if="search">搜索</el-breadcrumb-item>
          <el-breadcrumb-item v-else>分类</el-breadcrumb-item>
          <el-breadcrumb-item v-if="search">{{search}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
     <!-- 面包屑END -->
      <div class="highSearch" >
        <el-collapse v-model="inputQuery" >
          <el-collapse-item title="高级筛选" name="1">
             <div class="filter-container"> 
                <el-input 
                v-model="inputQuery.lprice" 
                placeholder="价格最小值" 
                style="width: 200px;margin-right:15px;margin-bottom:15px;"
                type="number"
                onKeypress="return(/^[0-9]*$/.test(String.fromCharCode(event.keyCode)))"   />
                <el-input 
                v-model="inputQuery.uprice" 
                placeholder="价格最大值" 
                style="width: 200px;margin-right:15px;"   
                type="number"
                onKeypress="return(/^[0-9]*$/.test(String.fromCharCode(event.keyCode)))"/>
                <el-select v-model="inputQuery.sortfor"  placeholder="排序对象" style="margin-right:15px;">
                  <el-option label="销量" value=1></el-option>
                  <el-option label="平均评分" value=2></el-option>
                  <el-option label="价格" value=3></el-option>
                </el-select>
                <el-select v-model="inputQuery.isDecent"  placeholder="顺序" style="margin-right:15px;">
                  <el-option label="降序排序" value=0></el-option>
                  <el-option label="升序排序" value=1></el-option>
                </el-select>
                <el-button v-waves  type="primary" icon="el-icon-search"  @click="filterGo" >
                  确定
                </el-button>
                <el-button v-waves  type="primary" icon="el-icon-delete"  @click="resetQuery" >
                  清空
                </el-button>
              </div>
          </el-collapse-item>
        </el-collapse>
      </div>
   </div>
    <!-- 分类标签 -->
    <div class="nav">
      <div class="product-nav">
        <div class="title">分类</div>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :name="''+item.id"
          />
        </el-tabs>
      </div>
    </div>
    <!-- 分类标签END -->

    <!-- 主要内容区 -->
    <div class="main">
      <div class="list">
        <MyList :list="product" v-if="productList.length > 0"></MyList>
        <div v-else class="none-product">抱歉没有找到相关的商品，请看看其他的商品捏</div>
      </div>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="currentChange"
        ></el-pagination>
      </div>
      <!-- 分页END -->
    </div>
    <!-- 主要内容区END -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      categoryList: [], //分类列表
      labelNum: "", //分类标签个数
      categoryID: [], // 分类id
      product:[], // 当前页商品列表
      productList:[], //所有商品列表
      total: 0, // 商品总量
      pageSize: 15, // 每页显示的商品数量
      currentPage: 1, //当前页码
      maxPage: 1, //最大页数（总页码）
      activeName: "-1", // 分类列表当前选中的id
      search: "", // 搜索条件
      searchQuery: // 筛选条件
      {
        name:"",
        label:"",//空字符串则全label
        uprice:10000000.15,//不用就设置为int上限
        lprice:-1,
        sortfor:0,//1:销量，2:平均分，3:价格,0:无   降序输出
        isDecent:0,//0降序，1升序,soetfor是0的话这个无所谓
        suid:"",//传就是店铺内搜索，空字符串就是不(这里是字符串)
      },
      inputQuery: //高级检索输入内容
      {
        uprice: "",
        lprice: "",
        sortfor: 0,
        isDecent: 0
      }
    };
  },
  created() {
     //获取分类列表
     this.getCategory();
    if (this.$route.query.search != undefined) {
      this.search = this.$route.query.search;
      this.getData();
  }
    
  },
  activated() {
    this.activeName = "0"; // 初始化分类列表当前选中的id为-1
    this.total = 0; // 初始化商品总量为0
    this.currentPage = 1; //初始化当前页码为1
    console.log(this.$route.query.search);
    // 如果路由没有传递参数，默认为显示全部商品
    if (Object.keys(this.$route.query).length == 0) {
      this.categoryID = [];
      this.activeName = "0";
      return;
    }
    if (this.$route.query.search != undefined) {
      this.search = this.$route.query.search;
    }
    this.getData();
  },
  watch: {
    // 监听点击了哪个分类标签，通过修改分类id，响应相应的商品
    activeName: function(val) {
      
        this.categoryID = [Number(val)];
      
      // 初始化商品总量和当前页码
      this.total = 0;
      this.currentPage = 1;
      // 更新地址栏链接，方便刷新页面可以回到原来的页面
      this.$router.push({
        path: "/goods",
        query: { categoryID: this.categoryID }
      });
      this.getData();
    },
    // 监听搜索条件，响应相应的商品
    // search: function(val) {
    //   if (val != "") {
    //     this.getProductBySearch(val);
    //   }
    // },
    // 监听分类id，响应相应的商品
    categoryID: function() {
      this.getData();
    },
    // 监听路由变化，更新路由传递了搜索条件
    $route: function(val) {
      if (val.path == "/goods") {
        if (val.query.search != undefined ) {
          this.activeName = "";
          this.currentPage = 1;
          this.total = 0;
          this.search = val.query.search;
          this.getData();
        }
      }
    }
  },
  methods: {
    // 返回顶部
    backtop() {
      const timer = setInterval(function() {
        const top = document.documentElement.scrollTop || document.body.scrollTop;
        const speed = Math.floor(-top / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          top + speed;
        if (top === 0) {
          clearInterval(timer);
        }
      }, 30);
    },
    // 页码变化调用currentChange方法
    currentChange(currentPage) {
      this.currentPage = currentPage;
      if(this.search != "")
      this.searchQuery.name = this.search;
      this.getData();
      this.backtop();
    },
    // 向后端请求分类列表数据
    getCategory() {
      this.$http
        .get("/member/Shopping/getLabelList.php")
        .then(res => {
          this.labelNum = res.data.labelNum;
          for(let i=1;i<=this.labelNum;i++){
            this.categoryList.push(res.data[i]);
          }//存储label list
        });
        this.categoryList.push({
          id:0,
          name:"全部",
          comment:"就是所有所有的商品"
          })
    },
    // 向后端请求全部商品或分类商品数据
    getData() {
      console.log(this.categoryID[0]);
      this.searchQuery.name = this.search //这个search其实是名字啦
      //这里应该把高级检索框框里的数据也传到这个 query里
      if(this.inputQuery.uprice!= "")
      this.searchQuery.uprice = this.inputQuery.uprice;
      else this.searchQuery.uprice = 1000000;
      if(this.inputQuery.lprice!= "")
      this.searchQuery.lprice = this.inputQuery.lprice;
      else this.searchQuery.lprice = -1;
      if(this.categoryID[0]!= 0)
      this.searchQuery.label = "(" + this.categoryID[0] + ")"
      else this.searchQuery.label = "";
      this.searchQuery.sortfor = this.inputQuery.sortfor;
      this.searchQuery.isDecent = this.inputQuery.isDecent;

      this.$http.post("/member/Shopping/queryComList.php",this.searchQuery)
      .then(res =>{
        this.total = res.data.comNum;
        let len = res.data.comNum;
        this.productList = [];
        for(let i=1;i<=len;i++){
          this.productList.push(res.data[i]);
        }
        this.dividePage();
        // console.log(this.productList);
      })
      
    },
   // 分页封装
    dividePage() {
      if((this.total/this.pageSize) > parseInt(this.total/this.pageSize)){   
          this.maxpage=parseInt(this.total/this.pageSize)+1;   
          
      }else{   
          this.maxpage=parseInt(this.total/this.pageSize);   
      } 
      //取出当前页面中应该显示的数据，赋值给product
      var startRow = (this.currentPage- 1) * this.pageSize; 
      var endRow = this.currentPage * this.pageSize; 
      endRow = (endRow > this.total)? this.total: endRow;  
      this.product = this.productList.slice(startRow, endRow);
    },
    resetQuery() {
      this.inputQuery.uprice = "";
      this.inputQuery.lprice = "";
      this.inputQuery.sortfor = "";
      this.inputQuery.isDecent = "";
      this.getData();
    },
    filterGo() {
      this.currentPage = 1;
      this.currentChange(1);
      this.getData();
    }
  }
};
</script>

<style scoped>
.goods {
  background-color: #f5f5f5;
}
/* 面包屑CSS */
.el-tabs--card .el-tabs__header {
  border-bottom: none;
}
.goods .breadcrumb {
  height: 50px;
  background-color: white;
}
.goods .breadcrumb .el-breadcrumb {
  width: 1225px;
  line-height: 30px;
  font-size: 16px;
  margin: 0 auto;
}
/* 面包屑CSS END */
.goods .highSearch {
  background-color: white;
}
.goods .highSearch .el-collapse {
  width: 1225px;
  line-height: 30px;
  font-size: 16px;
  margin: 0 auto;
}
/* 分类标签CSS */
.goods .nav {
  background-color: white;
}
.goods .nav .product-nav {
  width: 1225px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
}
.nav .product-nav .title {
  width: 50px;
  font-size: 16px;
  font-weight: 700;
  float: left;
}
/* 分类标签CSS END */

/* 高级搜索的css 我真尼玛css不会弄啊 谁弄一下*/
.highSearch {
  margin:0 auto;
  background-color: white;
}

/* 主要内容区CSS */
.goods .main {
  margin: 0 auto;
  max-width: 1225px;
}
.goods .main .list {
  min-height: 650px;
  padding-top: 14.5px;
  margin-left: -13.7px;
  overflow: auto;
}
.goods .main .pagination {
  height: 50px;
  text-align: center;
}
.goods .main .none-product {
  color: #333;
  margin-left: 13.7px;
}
/* 主要内容区CSS END */
</style>