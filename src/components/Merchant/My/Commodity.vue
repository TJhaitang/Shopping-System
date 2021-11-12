<template>
    <div>
    
        <el-card class="box-card">

          <el-row :gutter="20">
              <el-col :span="8">
                <el-input placeholder="请输入要搜索的商品" v-model="queryInfo.query" clearable @clear="getUserList">
                  <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                </el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" @click="addDialogVisible = true">添加商品</el-button>
              </el-col>
          </el-row>
          
          <el-table :data="goodslist" border stripe>
            <el-table-column prop="id" label="商品id" width="60">
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
            <el-table-column label="活动" width="250">
              <template slot-scope="scope">
                <el-row>
                 <el-col>
                  <span>是否参加满300-60活动</span>
                  <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
                  </el-switch>
                 </el-col>
                 <el-col>
                   <span>是否参加满200-30活动</span>
                  <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
                  </el-switch>
                 </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="售卖状态" width="100">
              <template slot-scope="scope">
               <span>售卖中</span>
               <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
               </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180px">
              <template slot-scope="scope">
                <!-- 修改按钮 -->
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                <!-- 删除按钮 -->
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
                <!-- 分配角色按钮 -->
                <!--<el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                  <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
                </el-tooltip>  -->              
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
          <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
            <el-form-item label="商品id" prop="id">
              <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <el-form-item label="商品图片" prop="picture">
              <el-input v-model="addForm.email"></el-input>
            </el-form-item>
            <el-form-item label="商品库存" prop="inventory">
              <el-input v-model="addForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="详细信息" prop="information">
              <el-input v-model="addForm.mobile"></el-input>
            </el-form-item>
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
            <el-form-item label="商品id">
              <el-input v-model="editForm.username" disabled></el-input>
            </el-form-item>  
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <el-form-item label="商品图片" prop="picture">
              <el-input v-model="addForm.email"></el-input>
            </el-form-item>
            <el-form-item label="商品库存" prop="inventory">
              <el-input v-model="addForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="详细信息" prop="information">
              <el-input v-model="addForm.mobile"></el-input>
            </el-form-item>
          </el-form>
          <!-- 底部区域 -->
          <span slot="footer" class="dialog-footer">
              <el-button @click="editDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="editUserInfo">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 分配角色的对话框 
        <el-dialog title="分配角色" :visible.sync="setRoleDialogVisible" width="50%"  @close="setRoleDialogClosed">
          <div>
            <p>当前的用户：{{userInfo.username}}</p>
            <p>当前的角色：{{userInfo.role_name}}</p>
            <p>分配新角色：
              <el-select v-model="selectedRoleId" placeholder="请选择">
                <el-option v-for="item in rolesList" :key="item.id"
                  :label="item.roleName" :value="item.id">
                  <! label是文本值，绑定的是角色名称；value绑定的实际上是id值，v-model绑定的是当前选中的id值 
                </el-option>
              </el-select>
            </p>
          </div>
          
          <span slot="footer" class="dialog-footer">
              <el-button @click="setRoleDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
          </span>
        </el-dialog> -->
    </div>
</template>

<script>
export default {
  data () {
    // 验证邮箱的规则
    //var checkEmail = (rule, value, cb) => {
    //  const regEmail = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
    //  if (regEmail.test(value)) {
    //    return cb()
    //  }
    //  cb(new Error('请输入合法的邮箱'))
    //}
    // 验证手机号的规则
    //var checkMobile = (rule, value, cb) => {
    //  const regMobile = /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/
    //  if(regMobile.test(value)) {
    //    return cb()
    //  }
    //  cb (new Error('请输入合法的手机号'))
    //}
    return {
      // 获取用户列表的参数
      queryInfo: {
          query: '',
          pagenum: 1,
          pagesize: 2
      },
      goodslist: [{
          id: '***',
          name: '数据库大作业代写',
          category: '服务类',
          price: '999',
          picture: '点击查看',
          inventory: '999',
          information: '代写大作业，质量保证',
          comment: '点击查看'
      },
      {  id: '***',
          name: '强力生发水',
          category: '洗护类',
          price: '888',
          picture: '点击查看',
          inventory: '999',
          information: '还你茂密头发',
          comment: '点击查看'
          },
      { id: '***',
          name: '上课代答到',
          category: '服务类',
          price: '666',
          picture: '点击查看',
          inventory: '999',
          information: '声音学谁像谁',
          comment: '点击查看'
          }], //先增添一些默认的user
      total: 3,
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        id: '',
        price: '',
        picture: '',
        inventory: '',
        information: ''
      },
      // 添加表单的验证规则对象
      addFormRules: {
        id: [
          { required: true, message: '请输入商品id', trigger: 'blur' },
          //{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          //{ min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        picture: [
          { required: true, message: '请输入图片', trigger: 'blur' },
          //{ validator: checkEmail, trigger: 'blur' }
        ],
        inventory: [
          { required: true, message: '请输入商品库存', trigger: 'blur' },
          //{ validator: checkMobile, trigger: 'blur' }
        ],
        information: [
          { required: true, message: '请输入商品详细信息', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ]
      },
      editDialogVisible: false,
      editForm: {},
      // 修改表单的验证规则对象
      editFormRules: {
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          //{ validator: checkEmail, trigger: 'blur' }
        ],
        picture: [
          { required: true, message: '请输入商品图片', trigger: 'blur' },
          //{ validator: checkMobile, trigger: 'blur' }
        ],
        inventory: [
          { required: true, message: '请输入商品库存', trigger: 'blur' },
          //{ validator: checkMobile, trigger: 'blur' }
        ],
        information: [
          { required: true, message: '请输入商品详细信息', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
          //{ validator: checkMobile, trigger: 'blur' }
        ]
      },
      setRoleDialogVisible: false,
      userInfo: {},
      rolesList: [],
      selectedRoleId: ''
    }
  },
  created() {
    //this.getUserList()
    this.getGoodsList()
  },
  methods: {
    //async getUserList() {
    //  const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      // console.log(res)
    //  if (res.meta.status !== 200) return this.$message.error('获取用户列表失败！')
    //  this.userlist = res.data.users
    //  this.total = res.data.total
    //},
    async getGoodsList() {
      const { data: res } = await this.$http.get('goods', { params: this.queryInfo })
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取商品列表失败！')
      this.goodslist = res.data.goods
      //this.userlist = res.data.users
      this.total = res.data.total
    },
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    async userStateChanged(userInfo) {
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if (res.meta.status !== 200) {
        // 修改用户状态失败
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('更新用户状态失败！')
      }
      this.$message.success('更新用户状态成功！')
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) 
        return 
        const { data: res } = await this.$http.post('users', this.addForm)
         if(res.meta.status !== 201) {
           return this.$message.error('添加用户失败！')
        }
        this.$message.success('添加用户成功！')
        this.addDialogVisible = false
        this.getUserList()
      })
    },
    //编辑商品
    async showEditDialog(id) {
      this.editDialogVisible = true
      console.log(id)
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      this.editForm = res.data
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('users/' + this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        if (res.meta.status !== 200) {
          return this.$message.error('更新用户信息失败！')
        }
        this.editDialogVisible = false
        this.getUserList()
        this.$message.success('更新用户信息成功！')
      })
    },
    // 根据id删除对应的用户信息
    async removeUserById(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
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
      // 发起删除用户的请求
      const { data: res } = await this.$http.delete('users/' + id)
      if(res.meta.status !== 200) {
        return this.$message.error('删除用户失败！')
      }
      this.$message.success('删除用户成功！')
      this.getUserList()
    },
    // 展示分配角色的对话框
    async setRole(userInfo) {
      this.userInfo = userInfo
      // 在展示对话框之前，获取所有角色的列表
      const { data: res } = await this.$http.get('roles')
      if(res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败！')
      }
      this.rolesList = res.data
      this.setRoleDialogVisible = true
    },
    // 点击确定按钮，分配角色
    async saveRoleInfo() {
      if(!this.selectedRoleId) {
        return this.$message.error('请选择要分配的角色')
      }
      // 发送分配用户角色的请求
      const { data: res } = await this.$http.put(`users/${this.userInfo.id}/role`, { rid: this.selectedRoleId })
      if(res.meta.status !== 200) {
        return this.$message.error('更新角色失败')
      }
      this.$message.success('更新角色成功')
      this.getUserList()
      this.setRoleDialogVisible = false
    },
    // 监听分配角色对话框的关闭事件
    setRoleDialogClosed() {
      this.selectedRoleId = ''
      this.userInfo = {}
    }
  }
}
</script>

<style lang="less" scoped>
</style>