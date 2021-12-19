<!-- 参考项目：https://github.com/PanJiaChen/vue-element-admin -->
<!-- 基本布局：收入流水、信誉评级变化折线图 + 订单分类卡片 -->
<template>
  <div class="tab-container">
    <!-- 搜索框部分 -->
    <div class="filter-container"> 
      <el-input v-model="orderQuery.id" placeholder="订单id" style="width: 200px;margin-right:15px;margin-bottom:15px;"   />
      <el-input v-model="orderQuery.uid" placeholder="会员id" style="width: 200px;margin-right:15px;"   />
      <el-select v-model="orderQuery.status"  placeholder="订单状态" style="margin-right:15px;">
        <el-option label="待审核" value="1"></el-option>
        <el-option label="待发货" value="2"></el-option>
        <el-option label="待收货" value="3"></el-option>
        <el-option label="交易完成" value="4"></el-option>
      </el-select>
      <el-button v-waves  type="primary" icon="el-icon-search"   >
        搜索
      </el-button>
      <el-button v-waves  type="primary" icon="el-icon-delete"   >
        清空
      </el-button>
    </div>
    <!-- 订单展示 -->
    <el-card class="box-card" style='top=15px;'>
      <el-table :data="orderList" border fit highlight-current-row style="width: 100%">
        <el-table-column label="订单id" prop='id'></el-table-column>
        <el-table-column label="价格" prop='cost'></el-table-column>
        <el-table-column label="下单时间" prop='time'></el-table-column>
        <el-table-column label="会员id" prop='uid'></el-table-column>
        <el-table-column label="订单状态" prop='status'></el-table-column>
        <el-table-column label='编辑'>
        <template slot-scope = 'scope'>
          <el-button type="primary" icon='el-icon-edit' @click = "showEditDialog(scope.row)"></el-button>
        </template>
        </el-table-column>
      </el-table>

      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="orderQuery.pagenum"
      :page-sizes="[5,10,20,100]"
      :page-size="orderQuery.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top:15px;">
      </el-pagination>

    </el-card>
    <el-dialog title='修改订单状态' :visible.sync = 'editDialogVisible' width = '50%'>
      <el-form
        :model="editForm"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item  label="订单id">
          <el-input v-model="editForm.id" :disabled="true"></el-input>
        </el-form-item> 
        <el-form-item  label="商品名称">
          <el-input v-model="editForm.comName" :disabled="true"></el-input>
        </el-form-item> 
        <el-form-item  label="商品件数">
          <el-input v-model="editForm.comQuantity" :disabled="true"></el-input>
        </el-form-item> 
        <el-form-item  label="订单总金额">
          <el-input v-model="editForm.cost" :disabled="true"></el-input>
        </el-form-item> 
        <el-form-item  label="订单地址">
          <el-input v-model="editForm.addr" ></el-input>
        </el-form-item> 
        <el-switch
          v-model="editForm.ifChangeStatus"
          active-color="#13ce66"
          inactive-color="#eee"
          active-text="切换到下个状态"
          inactive-text="保留当前状态">
        </el-switch>  
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editDialogVisible = false">确认修改</el-button>
        <el-button type="primary" @click="editDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
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
        id: undefined,
        uid: undefined,
        status: undefined,
       
      },
      pageNum: 1,
      pageSize: 10,
      maxPage: 1,
      loading: false,
      editDialogVisible: false,
      editForm: {
        id: '',
        comName: '',
        comQuantity: '',
        cost: '',
        addr: '',
        ifChangeStatus: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {

    async getList() {
      this.loading = true
      const {data:result} = await this.$http.get('路径',
          this.orderQuery
      )
     if(result.meta.status !== 200){
          return this.$message.error('获取订单失败惹（╥ ﹏ ╥）')
      }  
     
      //分页
      //总页数
      this.total = result.orderNum 
       if(this.total/this.pageSize > parseInt(this.total/this.pageSize)){   
            this.maxpage=parseInt(this.total/this.pageSize)+1;   
           
       }else{   
           this.maxpage=parseInt(this.total/this.pageSize);   
       } 

       //取出当前页面中应该显示的数据，赋值给orderList
        var startRow = (this.pageNum - 1) * this.pageSize; 
        var endRow = this.pageNum * this.pageSize; 
        console.log(startRow)
        endRow = (endRow > this.total)? this.total: endRow;  
        this.orderList = this.orders.slice(startRow, endRow);
        
      //map方法处理订单状态显示 
      this.orderList.map(function (val){
        if(val.status == 1) {val.status = '待审核' }
        else if(val.status == 2){val.status = '待发货'}
        else if(val.status == 3){val.status = '待收货'}
        else {val.status = '订单完成'}
      })
      console.log(result) 
    },

    showEditDialog(row) {
      this.editForm.id = row.id
      this.editForm.comName = row.comName
      this.editForm.comQuantity = row.comQuantity
      this.editForm.cost = row.cost
      this.editForm.addr = row.addr
      this.editForm.ifChangeStatus = false
      console.log(this.editForm.ifChangeStatus)
      this.editDialogVisible = true;
    },

    //修改订单信息并提交
    editOrder () {
      this.$http.post('/merchant/changeOrder.php',
      {
        id:this.editForm.id,
        ifChangeStatus:this.editForm.ifChangeStatus
      }).then(function(result) {
        if(result.data.status == 'success') {
          //关闭对话框
          this.editDialogVisible = false;
          this.getList();//修改之后再次获取一下订单列表
          this.$message.success('修改成功o(*￣▽￣*)ブ')}
        else return this.$message.error('修改失败了！')
      })
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
    }
  }
} 

</script>