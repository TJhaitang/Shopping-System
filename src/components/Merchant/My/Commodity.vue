<template>
    <div>
    
        <el-card class="box-card">

          <el-row :gutter="20">
              <el-col :span="8">
                <el-input placeholder="请输入要搜索的商品" v-model="queryInfo.query" clearable @clear="getGoodsList">
                  <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
                </el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" @click="addDialogVisible = true">添加商品</el-button>
              </el-col>
          </el-row>
          
          <el-table :data="goodslist" border stripe>
            <el-table-column prop="id" label="商品id" width="100">
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="150">
            </el-table-column>
            <el-table-column prop="category" label="商品种类" width="60">
            </el-table-column>
            <el-table-column prop="price" label="商品价格" width="60">
            </el-table-column>
            <el-table-column prop="picture" label="商品图片" width="100">
            </el-table-column>
            <el-table-column prop="inventory" label="商品库存" width="60">
            </el-table-column>
            <el-table-column prop="information" label="商品详细信息" width="200">
            </el-table-column>
            <el-table-column prop="comment" label="商品评论" width="100">
            </el-table-column>
            <el-table-column prop="activity" label="商品活动" width="100">
            </el-table-column>
            <el-table-column label="操作" width="120px">
              <template slot-scope="scope">
                <!-- 修改按钮 -->
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                <!-- 删除按钮 -->
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeGoodsById(scope.row.id)"></el-button>
                           
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页器 -->
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-card>
        <!-- 添加商品的对话框 -->
        <el-dialog title="添加商品" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
          <!-- 内容主体 -->
          <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
            <el-form-item label="商品名称" prop="name" label-width="100px">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品标签" prop="label" label-width="100px">
              <el-input v-model="addForm.label"></el-input>
            </el-form-item>
            <el-form-item label="详细信息" prop="information" label-width="100px">
              <el-input v-model="addForm.information"></el-input>
            </el-form-item>
            
            <el-form-item
             v-for="(domain, index) in addForm.domains_pic"
             :label="'图片' + (index+1)"
             :key="domain.key"
             :prop="'domains.' + index + '.picture'"
             :rules="{
             required: true, message: '类别名不能为空', trigger: 'blur' 
             }"
             label-width="300px"
            >
            <img-inputer v-model="domain.picture" theme="light" size="3px" type="file" accept="image/*" placeholder="请上传商品图片！" :on-change="chooseImg" />
             <el-button @click.prevent="removeDomain_pic(domain)">删除</el-button>
            
            </el-form-item>
            <el-form-item>
             <el-button @click="addDomain_pic">新增图片</el-button>
            </el-form-item>
            <el-row>
            <el-form-item
             v-for="(domain, index) in addForm.domains"
             :label="'类别' + (index+1)+'(请依次输入类别名、价格与库存)'"
             :key="domain.key"
             :prop="'domains.' + index + '.add_sort'"
             :rules="{
             required: true, message: '类别名不能为空', trigger: 'blur' 
             }"
             label-width="300px"
            >
             <el-input v-model="domain.value"></el-input>
             <el-input v-model="domain.price"></el-input>
             <el-input v-model="domain.sort_inventory"></el-input><el-button @click.prevent="removeDomain1(domain)">删除</el-button>
            
            </el-form-item>
            <el-form-item>
             <el-button @click="addDomain1">新增类别</el-button>
            </el-form-item>
            <el-switch
             v-model="addForm.ifActivity1"
             active-color="#13ce66"
             inactive-color="#eee"
             active-text="不参与满300-60活动"
             inactive-text="参与满300-60活动">
            </el-switch> 
            </el-row>
            <el-row></el-row>
            <el-row>
            <el-switch
             v-model="addForm.ifActivity2"
             active-color="#13ce66"
             inactive-color="#eee"
             active-text="不参与满200-30活动"
             inactive-text="参与满200-30活动">
            </el-switch> 
            </el-row>
          </el-form>
          <!-- 底部区域 -->
          <span slot="footer" class="dialog-footer">
              <el-button @click="addDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUser">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 修改商品的对话框 -->
        <el-dialog title="修改商品信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
          <!-- 内容主体区域 -->
          <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
            <el-form-item label="商品id" label-width="100px">
              <el-input v-model="editForm.id" disabled></el-input>
            </el-form-item>  
            <el-form-item label="商品名称" prop="name" label-width="100px">
              <el-input v-model="editForm.name"></el-input>
            </el-form-item>
            <el-form-item label="详细信息" prop="information" label-width="100px">
              <el-input v-model="editForm.information"></el-input>
            </el-form-item>
            <el-form-item
             v-for="(domain, index) in editForm.domains"
             :label="'类别' + (index+1)+'(请依次输入类别名、价格与库存)'"
             :key="domain.key"
             :prop="'domains.' + index + '.edit_sort'"
             :rules="{
             required: true, message: '类别名不能为空', trigger: 'blur' 
             }"
             label-width="300px"
            >
             <el-input v-model="domain.value"></el-input>
             <el-input v-model="domain.price"></el-input>
             <el-input v-model="domain.sort_inventory"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
            </el-form-item>
            <el-form-item>
             <el-button @click="addDomain">新增类别</el-button>
            </el-form-item>
            <el-row>
            <el-switch
             v-model="editForm.ifActivity1"
             active-color="#13ce66"
             inactive-color="#eee"
             active-text="不参与满300-60活动"
             inactive-text="参与满300-60活动">
            </el-switch> 
            </el-row>
            <el-row>
            <el-switch
             v-model="editForm.ifActivity2"
             active-color="#13ce66"
             inactive-color="#eee"
             active-text="不参与满200-30活动"
             inactive-text="参与满200-30活动">
            </el-switch> 
            </el-row>
            
          </el-form>
          <!-- 底部区域 -->
          <span slot="footer" class="dialog-footer">
              <el-button @click="editDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="editUserInfo">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 获取用户列表的参数
  
      headerObj:{
        Authorization:
        window.sessionStorage.getItem
        ('token')
      },
      queryInfo: {
          query: '',
          pagenum: 1,
          pagesize: 2
      },
      pageNum: 1,
      pageSize: 10,
      goodslist: [{
          id: '***',
          name: '数据库大作业代写',
          category: '服务类',
          price: '999',
          picture: '点击查看',
          inventory: '999',
          information: '代写大作业，质量保证',
          comment: '点击查看',
          activity: '满300-60'
      },
      {  id: '***',
          name: '强力生发水',
          category: '洗护类',
          price: '888',
          picture: '点击查看',
          inventory: '999',
          information: '还你茂密头发',
          comment: '点击查看',
          activity: '满200-30'
          },
      { id: '***',
          name: '上课代答到',
          category: '服务类',
          price: '666',
          picture: '点击查看',
          inventory: '999',
          information: '声音学谁像谁',
          comment: '点击查看',
          activity: '满200-30'
          }], //先增添一些默认的user
      total: 3,
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        //id: '',
        picture: '',
        information: '',
        name: '',
        label: '',
        ifActivity1: '',
        ifActivity2: '',
        domains: [{
          value: '',
          sort_inventory: '',
          sort_price: '',
        }],
        domains_pic: [{
          picture: '',
        }],
      },
      // 添加表单的验证规则对象
      addFormRules: {
        //id: [
          //{ required: true, message: '请输入商品id', trigger: 'blur' },
          //{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        //],
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        //price: [
          //{ required: true, message: '请输入商品价格', trigger: 'blur' },
          //{ min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        //],
        picture: [
          { required: true, message: '请输入图片', trigger: 'blur' },
          //{ validator: checkEmail, trigger: 'blur' }
        ],
        label: [
          { required: true, message: '请输入商品标签', trigger: 'blur' },
        ],
        //inventory: [
          //{ required: true, message: '请输入商品库存', trigger: 'blur' },
          //{ validator: checkMobile, trigger: 'blur' }
        //],
        information: [
          { required: true, message: '请输入商品详细信息', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ]
      },
      editDialogVisible: false,
      editForm: {
        id: '',
        //price: '',
        picture: '',
        name: '',
        label: '',
        inventory: '',
        information: '',
        ifActivity1: '',
        ifActivity2: '',
        domains: [{
          value: '',
          sort_inventory: '',
          sort_price: ''
        }],
      },
      // 修改表单的验证规则对象
      editFormRules: {
        name:[
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        picture: [
          { required: true, message: '请输入商品图片', trigger: 'blur' },
          //{ validator: checkMobile, trigger: 'blur' }
        ],
        label: [
          { required: true, message: '请输入商品标签', trigger: 'blur' },
          //{ validator: checkEmail, trigger: 'blur' }
        ],
        information: [
          { required: true, message: '请输入商品详细信息', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
          //{ validator: checkMobile, trigger: 'blur' }
        ],
      },
      GoodsInfo: {},
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      const { data: res } = await this.$http.get('getComIist.php', { params: this.queryInfo })
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取商品列表失败！')
      this.goodslist = res.data.goods

      this.total = res.comNum
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
        this.GoodsList = this.goods.slice(startRow,endRow)

        
      console.log(res) 

    },
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.Pagesize = newSize
      this.getGoodsList()
    },
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.Pagenum = newPage
      this.getGoodsList()
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 添加新商品
    addGoods(){
      this.$http.post('/merchant/insertCommodity.php',
      {
        name: this.addForm.name,
        discription: this.addForm.information,
        sort:this.addForm.domains
      }).then(function(result) {
        if(result.data.status == 'success') {
          //关闭对话框
          this.addDialogVisible = false;
          this.getList();//添加之后再次获取一下订单列表
          this.$message.success('添加成功o(*￣▽￣*)ブ')}
        else return this.$message.error('添加失败了！')
      })
    },
    async showEditDialog(row) {
      this.editForm.id = row.id
      this.editForm.price = row.price
      this.editForm.picture = row.picture
      this.editForm.inventory = row.inventory
      this.editForm.information = row.information
      this.editForm.ifActivity1 = row.ifActivity1
      this.editForm.ifActivity2 = row.ifActivity2
      for (const index in row.domains) {
        this.editForm.domains[index] = row.domains[index]
      }
      console.log(this.editForm.ifActivity1)
      this.editDialogVisible = true;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 修改信息并提交
    editGoodsInfo() {
      
      this.$http.post('/merchant/updateCommodity.php',
      {
        operation: "update",
        comId: this.editForm.id,
        name: this.editForm.name,
        description: this.editForm.information,
        sort: this.editForm.domains
      }).then(function(result) {
        if(result.data.status == 'success') {
          //关闭对话框
          this.editDialogVisible = false;
          this.getList();//修改之后再次获取一下订单列表
          this.$message.success('修改成功o(*￣▽￣*)ブ')}
        else return this.$message.error('修改失败了！')
      })
    },
    // 根据id删除对应的用户信息
    async removeGoodsById(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 确认删除，返回confirm
      // 取消删除，返回cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      // 发起删除商品的请求
      //const { data: res } = await this.$http.delete('users/' + id)
      //if(res.meta.status !== 200) {
      //  return this.$message.error('删除商品失败！')
      //}
      this.$http.post('/merchant/updateCommodity.php',
      {
        operation: "delete",
        comId: this.editForm.id
      }).then(function(result) {
        if(result.data.status == 'success') {
          //关闭对话框
          this.editDialogVisible = false;
          this.getList();//删除之后再次获取一下订单列表
          this.$message.success('删除成功o(*￣▽￣*)ブ')}
        else return this.$message.error('删除失败了！')
      })
      //this.$message.success('删除商品成功！')
      //this.getGoodsList()
    },
    removeDomain(item) {
      var index = this.editForm.domains.indexOf(item)
      if (index !== -1) {
        this.editForm.domains.splice(index, 1)
      }
    },  
    addDomain() {
      this.editForm.domains.push({
        value: '',
        sort_inventory: '',
        key: Date.now()
      });
    },
    removeDomain1(item) {
      var index = this.addForm.domains.indexOf(item)
      if (index !== -1) {
        this.addForm.domains.splice(index, 1)
      }
    },
    addDomain1() {
      this.addForm.domains.push({
        value: '',
        sort_inventory: '',
        key: Date.now()
      });
    },
    removeDomain_pic(item) {
      var index = this.addForm.domains_pic.indexOf(item)
      if (index !== -1) {
        this.addForm.domains_pic.splice(index, 1)
      }
    },
    addDomain_pic() {
      this.addForm.domains_pic.push({
        picture: '',
        key: Date.now()
      });
    },
    /*chooseImg () {          //上传照片时将图片转为base64

          let file = this.file1   //file1是绑定的file对象
          let reader = new FileReader()
          let img = new Image()
          // 读取图片
          reader.readAsDataURL(file)
          // 读取完毕后的操作
          reader.onloadend = (e) => {
            img.src = e.target.result
            this.addForm.domains_pic.picture = reader.result
          }
    }*/

  }
}
</script>

<style lang="less" scoped>

</style>