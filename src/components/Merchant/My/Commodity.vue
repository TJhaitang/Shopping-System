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
            <el-table-column prop="name" label="商品名称" width="150">
            </el-table-column>
            <el-table-column prop="label_" label="商品标签" width="150">
            </el-table-column>
            <el-table-column prop="description" label="商品详细信息" width="200">
            </el-table-column>
            <el-table-column prop="minus_" label="商品活动" width="200">
            </el-table-column>
            <!--<el-table-column prop="activity" label="商品活动" width="100">
            </el-table-column>-->
            <el-table-column label="操作" width="150px">
              <template slot-scope="scope">
                <!-- <el-button type="text" @click="domainDialogVisible = true">查看商品分类</el-button> -->
                <!-- 修改按钮 -->
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
                <!-- 删除按钮 -->
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeGoodsById(scope.row.id)"></el-button>
                           
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页器 -->
          <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination> -->
        </el-card>

        <!-- <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <span>这是一段信息</span>
          <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog> -->


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
            <el-form-item label="详细信息" prop="description" label-width="100px">
              <el-input v-model="addForm.description"></el-input>
            </el-form-item>
            
            <el-form-item
             v-for="(domain, index) in addForm.domains_pic"
             :label="'图片' + (index+1)"
             :key="domain.key"
             :prop="'domains.' + index + '.picture'"
             
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
             :label="'类别' + (index+1)"
             :key="domain.key"
             :prop="'domains.' + index + '.add_sort'"
             label-width="50px"
            >
            <el-form-item label="类别名" prop="sort_name" label-width="100px">
              <el-input v-model="domain.name"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="sort_price" label-width="100px">
              <el-input v-model="domain.sort_price"></el-input>
            </el-form-item>
            <el-form-item label="库存" prop="sort_inventory" label-width="100px">
              <el-input v-model="domain.sort_inventory"></el-input>
              <el-button @click.prevent="removeDomain1(domain)">删除</el-button>
            </el-form-item>
             <!-- <el-input v-model="domain.name"></el-input>
             <el-input v-model="domain.sort_price"></el-input>
             <el-input v-model="domain.sort_inventory"></el-input> -->
            
            
            </el-form-item>
            <el-form-item>
             <el-button @click="addDomain1">新增类别</el-button>
            </el-form-item>
            <el-switch
             v-model="addForm.ifActivity1"
             active-color="#13ce66"
             inactive-color="#eee"
             active-text="参与满200-30活动"
             inactive-text="不参与满200-30活动">
            </el-switch> 
            </el-row>
            <el-row></el-row>
            <el-row>
            <el-switch
             v-model="addForm.ifActivity2"
             active-color="#13ce66"
             inactive-color="#eee"
             active-text="参与满300-60活动"
             inactive-text="不参与满300-60活动">
            </el-switch> 
            </el-row>
          </el-form>
          <!-- 底部区域 -->
          <span slot="footer" class="dialog-footer">
              <el-button @click="addDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addGoods">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 修改商品的对话框 -->
        <el-dialog title="修改商品信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
          <!-- 内容主体区域 -->
          <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
            <el-form-item label="商品id" prop="comId" label-width="100px">
              <el-input v-model="editForm.comId" disabled></el-input>
            </el-form-item>  
            <el-form-item label="商品名称" prop="name" label-width="100px">
              <el-input v-model="editForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品标签" prop="label" label-width="100px">
              <el-input v-model="editForm.label"></el-input>
            </el-form-item>
            <el-form-item label="详细信息" prop="description" label-width="100px">
              <el-input v-model="editForm.description"></el-input>
            </el-form-item>
            <el-form-item
             v-for="(domain, index) in editForm.domains"
             :label="'类别' + (index+1)"
             :key="domain.key"
             :prop="'domains.' + index + '.edit_sort'"
             :rules="{
             //required: true, message: '类别名不能为空', trigger: 'blur' 
             }"
             label-width="50px"
            >
             <!-- <el-input v-model="domain.name"></el-input>
             <el-input v-model="domain.sort_price"></el-input>
             <el-input v-model="domain.sort_inventory"></el-input>
             <el-button @click.prevent="removeDomain(domain)">删除</el-button> -->
             <el-form-item label="类别名" prop="sort_name" label-width="100px">
              <el-input v-model="domain.name"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="sort_price" label-width="100px">
              <el-input v-model="domain.sort_price"></el-input>
            </el-form-item>
            <el-form-item label="库存" prop="sort_inventory" label-width="100px">
              <el-input v-model="domain.sort_inventory"></el-input>
              <el-button @click.prevent="removeDomain(domain)">删除</el-button>
            </el-form-item>
            </el-form-item>
            <el-form-item>
             <el-button @click="addDomain">新增类别</el-button>
            </el-form-item>
            <el-row>
            <el-switch
             v-model="editForm.ifActivity1"
             active-color="#13ce66"
             inactive-color="#eee"
             active-text="参与满200-30活动"
             inactive-text="不参与满200-30活动">
            </el-switch> 
            </el-row>
            <el-row>
            <el-switch
             v-model="editForm.ifActivity2"
             active-color="#13ce66"
             inactive-color="#eee"
             active-text="参与满300-60活动"
             inactive-text="不参与满300-60活动">
            </el-switch> 
            </el-row>
            
          </el-form>
          <!-- 底部区域 -->
          <span slot="footer" class="dialog-footer">
              <el-button @click="editDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="editGoodsInfo">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 获取用户列表的参数
   editDialogVisible: false,
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
      //pageNum: 1,
      //pageSize: 10,
      goodslist: [],
           //先增添一些默认的user
      total: 3,
      addDialogVisible: false,
      domainDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        //id: '',
        picture: '',
        description: '',
        name: '',
        label: '',
        ifActivity1: '',
        ifActivity2: '',
        //suid: '',
        //minus: '',
        domains: [],
        //domains_pic: [{
          //picture: '',
        //}],
      },
      // 添加表单的验证规则对象
      addFormRules: {
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
        description: [
          { required: true, message: '请输入商品详细信息', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ]
      },
      editForm: {
        operation: "update",
        comId: '',
        //price: '',
        //picture: '',
        name: '',
        label: '',
        //minus: '',
        //inventory: '',
        description: '',
        ifActivity1: '',
        ifActivity2: '',
        domains: [],
      },
      // 修改表单的验证规则对象
      editFormRules: {
        name:[
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        minus: [
          { required: true, message: '请输入商品活动', trigger: 'blur' },
          //{ validator: checkMobile, trigger: 'blur' }
        ],
        label: [
          { required: true, message: '请输入商品标签', trigger: 'blur' },
          //{ validator: checkEmail, trigger: 'blur' }
        ],
        description: [
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
    getGoodsList(){
      console.log("getGoodsList")
      this.goodslist = []
      this.$http.post("/merchant/getComList.php",{})
      .then(res => {
      //this.goodslist = res.data;
      console.log(res.data.data)
      //console.log(res.data.data[1])
      for(let i=1;i<=res.data.data.comNum;i++){
        
        //console.log(i)
        this.goodslist.push({
          id: '',
          name: '',
          //category: '',
          //price: '',
          //picture: '',
          //inventory: '',
          description: '',
          //comment: '',
          //activity: '',
          suid: '',
          minus: '',
          label: '',
          domainlength: 0,
          label_: '',
          minus_: '',
          ifActivity1: '',
          ifActivity2: '',
          domains: [],
        });
        this.goodslist[i-1].id = res.data.data[i].commodityId
        this.goodslist[i-1].name = res.data.data[i].name
        this.goodslist[i-1].label = res.data.data[i].slabel
        this.goodslist[i-1].description = res.data.data[i].description
        this.goodslist[i-1].minus = res.data.data[i].minus
        this.goodslist[i-1].suid = res.data.data[i].suid
        if(this.goodslist[i-1].label == '-1') this.goodslist[i-1].label_ = '测试商品'
        if(this.goodslist[i-1].label == '1') this.goodslist[i-1].label_ = '男上装'
        if(this.goodslist[i-1].label == '2') this.goodslist[i-1].label_ = '男下装'
        if(this.goodslist[i-1].label == '3') this.goodslist[i-1].label_ = '男套装'
        if(this.goodslist[i-1].label == '4') this.goodslist[i-1].label_ = '女上装'
        if(this.goodslist[i-1].label == '5') this.goodslist[i-1].label_ = '女下装'
        if(this.goodslist[i-1].label == '6') this.goodslist[i-1].label_ = '女套装'
        if(this.goodslist[i-1].label == '7') this.goodslist[i-1].label_ = '鞋'
        if(this.goodslist[i-1].label == '8') this.goodslist[i-1].label_ = '包'
        if(this.goodslist[i-1].label == '9') this.goodslist[i-1].label_ = '其他'
        if(this.goodslist[i-1].minus == '0'){
          this.goodslist[i-1].minus_ = '无活动'
          this.goodslist[i-1].ifActivity1 = false
          this.goodslist[i-1].ifActivity2 = false
        }
        if(this.goodslist[i-1].minus == '1'){
          this.goodslist[i-1].minus_ = '满200-30'
          this.goodslist[i-1].ifActivity1 = true
          this.goodslist[i-1].ifActivity2 = false
        }
        if(this.goodslist[i-1].minus == '2'){
          this.goodslist[i-1].minus_ = '满300-60'
          this.goodslist[i-1].ifActivity1 = false
          this.goodslist[i-1].ifActivity2 = true
        } 
        if(this.goodslist[i-1].minus == '3'){
          this.goodslist[i-1].minus_ = '满200-30，满300-60'
          this.goodslist[i-1].ifActivity1 = true
          this.goodslist[i-1].ifActivity2 = true
        } 
        //this.goodslist[i-1].
        //console.log(res.data.data[i].domains)
        if(res.data.data[i].domains.stdNum > 0){
          this.goodslist[i-1].domainlength = res.data.data[i].domains.stdNum
          for(let j=0;j<res.data.data[i].domains.stdNum;j++)
          {
            this.goodslist[i-1].domains.push({
              //value: '',
              sort_inventory: '',
              sort_price: '',
              name: '',
              //sort_standards: '',
              //sort_sales: '',
              //sort_comId: '',
            })
            //console.log("j1")
            this.goodslist[i-1].domains[j].value = res.data.data[i].domains[j+1].id
            this.goodslist[i-1].domains[j].sort_inventory =  res.data.data[i].domains[j+1].stock
            this.goodslist[i-1].domains[j].sort_price = res.data.data[i].domains[j+1].price
            this.goodslist[i-1].domains[j].name = res.data.data[i].domains[j+1].name
            this.goodslist[i-1].domains[j].sort_sales = res.data.data[i].domains[j+1].sales 
            this.goodslist[i-1].domains[j].sort_standards = res.data.data[i].domains[j+1].standards 
            this.goodslist[i-1].domains[j].sort_comId = res.data.data[i].domains[j+1].commodityId
            //console.log("j2")
            
          } 
        }
      } 
      });
      
    },
    handleSizeChange(newSize) {
      // console.log(newSize)
      query.pagesize = newSize
      this.getGoodsList()
    },
    handleCurrentChange(newPage) {
      // console.log(newPage)
      query.pagenum = newPage
      this.getGoodsList()
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 添加新商品
    addGoods(){
      console.log(this.addForm)
      if(this.addForm.label ==  '测试商品') this.addForm.label = '-1'
      if(this.addForm.label ==  '男上装') this.addForm.label = '1'
      if(this.addForm.label ==  '男下装') this.addForm.label = '2'
      if(this.addForm.label ==  '男套装') this.addForm.label = '3'
      if(this.addForm.label ==  '女上装') this.addForm.label = '4'
      if(this.addForm.label ==  '女下装') this.addForm.label = '5'
      if(this.addForm.label ==  '女套装') this.addForm.label = '6'
      if(this.addForm.label ==  '鞋') this.addForm.label = '7'
      if(this.addForm.label ==  '包') this.addForm.label = '8'
      if(this.addForm.label ==  '其他') this.addForm.label = '9'
      this.$http.post('/merchant/insertCommodity.php',this.addForm
      ).then(result=>{
        console.log("addGoods")
        console.log(result)
        if(result.status !== 'fail'){
          //关闭对话框
          this.addDialogVisible = false;
          this.addForm.domains = []
          this.addForm.ifActivity1 = false;
          this.addForm.ifActivity2 = false;
          this.getGoodsList();//添加之后再次获取一下订单列表
          this.$message.success('添加成功o(*￣▽￣*)ブ')}
        else return this.$message.error('添加失败了！')
      })
    },
    showEditDialog(row) {
      //this.editForm.id = row.id
      this.editForm.name = row.name
      //this.editForm. = row.inventory
      //this.editForm.minus = row.minus
      this.editForm.description = row.description
      this.editForm.comId = row.id
      this.editForm.label = row.label_
      this.editForm.ifActivity1 = row.ifActivity1
      this.editForm.ifActivity2 = row.ifActivity2
      if(row.domainlength>0){
        this.editForm.domains = []
        for(let i=0;i<row.domainlength;i++){
          this.editForm.domains.push({
            name: '',
            sort_inventory: '',
            sort_price: '',
            //sort_name: '',
            //sort_standards: '',
            //sort_sales: '',
            stdId: '',
          })
          //console.log("std")
          //console.log(row.domains[i].value)
          this.editForm.domains[i].name= row.domains[i].name
          this.editForm.domains[i].sort_inventory = row.domains[i].sort_inventory
          this.editForm.domains[i].sort_price = row.domains[i].sort_price
          //this.editForm.domains[i].sort_name = row.domains[i].sort_name
          //this.editForm.domains[i].sort_standards = row.domains[i].sort_standards
          //this.editForm.domains[i].sort_sales = row.domains[i].sort_sales
          this.editForm.domains[i].stdId = row.domains[i].value

        }
      }
      //console.log(this.editForm)
      this.editDialogVisible = true;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改信息并提交
    editGoodsInfo() {
      console.log(this.editForm)
      if(this.editForm.label ==  '测试商品') this.editForm.label = '-1'
      if(this.editForm.label ==  '男上装') this.editForm.label = '1'
      if(this.editForm.label ==  '男下装') this.editForm.label = '2'
      if(this.editForm.label ==  '男套装') this.editForm.label = '3'
      if(this.editForm.label ==  '女上装') this.editForm.label = '4'
      if(this.editForm.label ==  '女下装') this.editForm.label = '5'
      if(this.editForm.label ==  '女套装') this.editForm.label = '6'
      if(this.editForm.label ==  '鞋') this.editForm.label = '7'
      if(this.editForm.label ==  '包') this.editForm.label = '8'
      if(this.editForm.label ==  '其他') this.editForm.label = '9'
      this.$http.post('/merchant/updateCommodity.php',
      this.editForm
      ).then(result => {
        console.log(result)
        if(result.data.status !== 'fail') {
          this.editDialogVisible = false;
          this.getGoodsList();
          this.$message.success('修改成功o(*￣▽￣*)ブ')
          }  
        else return this.$message.error('修改失败了！')
      })
      // this.getList();//修改之后再次获取一下订单列表
    },
    // 根据id删除对应的用户信息
    async removeGoodsById(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      this.editForm.operation = 'delete'
      this.editForm.comId = id
      console.log(this.editForm)
      this.$http.post('/merchant/updateCommodity.php',
      this.editForm
      ).then(result => {
        if(result.data.status !== 'fail') {
          //关闭对话框
          console.log("delete1")
          this.editDialogVisible = false;
          this.getGoodsList();//删除之后再次获取一下订单列表
          this.$message.success('删除成功o(*￣▽￣*)ブ')
          console.log("delete2")}
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
        name: '',
        sort_inventory: '',
        sort_price: '',
        //sort_name: '',
        //sort_standards: '',
        //sort_sales: '',
        //sort_comId: '',
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
        name: '',
        sort_inventory: '',
        sort_price: '',
        //sort_name: '',
        //sort_standards: '',
        //sort_sales: '',
        //sort_comId: '',
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

  //}

  }
}
</script>

<style lang="less" scoped>

</style>