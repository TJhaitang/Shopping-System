<!-- 参考项目：https://github.com/PanJiaChen/vue-element-admin -->
<!-- 基本布局：收入流水、信誉评级变化折线图 + 订单分类卡片 -->
<template>
  <div class="tab-container">
    <!-- 搜索框部分 -->
    <div class="filter-container">
      <el-input
        v-model="orderQuery.id"
        placeholder="订单id"
        style="
          width: 200px;
          margin-right: 15px;
          margin-left: 15px;
          margin-bottom: 15px;
        "
      />
      <el-input
        v-model="orderQuery.uid"
        placeholder="会员id"
        style="width: 200px; margin-right: 15px"
      />
      <el-select
        v-model="orderQuery.status"
        placeholder="订单状态"
        style="margin-right: 15px"
      >
        <el-option label="待审核" value="1"></el-option>
        <el-option label="待发货" value="2"></el-option>
        <el-option label="待收货" value="3"></el-option>
        <el-option label="交易完成" value="4"></el-option>
      </el-select>
      <el-button v-waves type="primary" icon="el-icon-search" @click="getList">
        搜索
      </el-button>
      <el-button
        v-waves
        type="primary"
        icon="el-icon-delete"
        @click="resetQuery"
      >
        清空
      </el-button>
    </div>
    <!-- 订单展示 -->
    <el-card class="box-card" style="top=15px;"> </el-card>

    <el-table :data="orders" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form
            v-for="item in props.row.items"
            :key="item.comName"
            label-position="left"
            inline
            class="demo-table-expand"
            style="display: flex"
          >
            <el-form-item
              label="商品-规格名称"
              style="margin-left: 20px; margin-bottom: 0; width: 35%"
            >
              <span>{{ item.comName }}</span>
            </el-form-item>
            <el-form-item
              label="数量"
              style="margin-left: 20px; margin-bottom: 0; width: 35%"
            >
              <span>{{ item.quantity }}</span>
            </el-form-item>
          </el-form>
          <el-form
            label-position="left"
            inline
            class="demo-table-expand"
            style="display: flex"
          >
            <el-form-item
              label="总数量"
              style="margin-left: 20px; margin-bottom: 0; width: 35%"
            >
              <span>{{ props.row.itemNum }}</span>
            </el-form-item>
            <el-form-item
              label="总金额"
              style="margin-left: 20px; margin-bottom: 0; width: 35%"
            >
              <span>{{ props.row.cost }}</span>
            </el-form-item>
            <el-form-item
              label="操作"
              style="margin-left: 20px; margin-bottom: 0; width: 35%"
            >
              <span>
                <el-popover>
                  <p>确认将这一单改成下一个状态吗？</p>
                  <div style="text-align: right; margin: 10px 0 0">
                    <el-button
                      type="primary"
                      size="medium"
                      @click="toNextStatus(props.row.code)"
                      >确定</el-button
                    >
                  </div>
                  <i
                    class="el-icon-s-check"
                    slot="reference"
                    style="font-size: 18px"
                  ></i> </el-popover
              ></span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="订单 ID" prop="code"> </el-table-column>
      <el-table-column label="订单状态" prop="status"> </el-table-column>
      <el-table-column label="时间" prop="time"> </el-table-column>
      <el-table-column label="地址" prop="addr.address"> </el-table-column>
      <el-table-column label="收货人姓名" prop="addr.consignee">
      </el-table-column>
      <el-table-column label="电话" prop="addr.phone"> </el-table-column>
      <el-table-column label="用户id" prop="addr.vuid"> </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="orderQuery.pagenum"
      :page-sizes="[5, 10, 20, 100]"
      :page-size="orderQuery.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 15px"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  //每个卡片对应的状态参数

  data() {
    return {
      total: 9,

      orderQuery: {
        //查询数据预先设置
        id: "",
        uid: "",
        status: "",
      },
      orderList: [],
      orders: [],
      pageNum: 1,
      pageSize: 10,
      maxPage: 1,
      loading: false,
      editDialogVisible: false,
      editForm: {
        id: "",
        comName: "",
        comQuantity: "",
        cost: "",
        addr: "",
        ifChangeStatus: "",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.loading = true;
      const { data: result } = await this.$http.get(
        "/merchant/getOrderList.php",
        this.orderQuery
      );
      //  if(result.meta.status !== 200){
      //       return this.$message.error('获取订单失败惹（╥ ﹏ ╥）')
      //   }

      //数据赋值
      this.total = result.orderNum;
      this.orderList = [];
      for (let i = 1; i <= result.orderNum; i++) {
        this.orderList.push(result[i]);
        console.log(this.orderList[i - 1]);
        if (this.orderList[i - 1].status == "1") {
          this.orderList[i - 1].status = "待审核";
        } else if (this.orderList[i - 1].status == "2") {
          this.orderList[i - 1].status = "待发货";
        } else if (this.orderList[i - 1].status == "3") {
          this.orderList[i - 1].status = "待收货";
        } else {
          this.orderList[i - 1].status = "订单完成";
        }
      }
      console.log(this.orderList);
      //分页
      if (this.total / this.pageSize > parseInt(this.total / this.pageSize)) {
        this.maxpage = parseInt(this.total / this.pageSize) + 1;
      } else {
        this.maxpage = parseInt(this.total / this.pageSize);
      }

      //取出当前页面中应该显示的数据，赋值给orderList
      var startRow = (this.pageNum - 1) * this.pageSize;
      var endRow = this.pageNum * this.pageSize;
      console.log(startRow);
      endRow = endRow > this.total ? this.total : endRow;
      this.orders = this.orderList.slice(startRow, endRow);
    },
    resetQuery() {
      this.orderQuery.id = "";
      this.orderQuery.uid = "";
      this.orderQuery.status = "";
      this.getList();
    },

    //修改订单信息并提交
    toNextStatus(code) {
      this.$http
        .post("/merchant/changeOrderToNextStatus.php", {
          id: code,
        })
        .then((result) => {
          console.log(result);
          if (result.data.status == "success") {
            //关闭对话框
            this.getList(); //修改之后再次获取一下订单列表
            this.$message.success("修改成功o(*￣▽￣*)ブ");
          } else return this.$message.error("修改失败了！");
        });
    },
    //监听页面大小改变事件
    handleSizeChange(newsize) {
      this.pageSize = newsize;
      this.getList();
    },
    //监听切换页面
    handleCurrentChange(newPage) {
      this.pageNum = newPage;
      this.getList(); //切换页面重新get一遍
    },
  },
};
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>