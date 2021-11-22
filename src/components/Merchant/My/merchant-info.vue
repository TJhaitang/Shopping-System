<template>
    <div>
	<el-row :gutter="20" style="margin-top:10px;">
  <!--显示商家当前的个人信息-->
    <el-col :span="8" >
      <div class="grid-content bg-purple">
        <el-card class="box-card" style="width:1000px">
        <div slot="header" class="clearfix">
          <span>个人中心</span>
        </div>
        <div class="name-role">
          <span class="sender">名称 - {{dataForm.nickName}}</span>  
        </div>
       	<div class="avatar_select" id="img0">
        	<img :src="userphoto" alt="" />
          <!--图片地址动态绑定-->
      	</div> 
        <el-divider></el-divider>
        <div class="personal-relation">
          <div class="relation-item">手机号:  <div style="float: right; padding-right:20px;">{{dataForm.phone}}</div></div>
        </div>
        <div class="personal-relation">
          <div class="relation-item">个性签名： <div style="float: right; padding-right:20px;">{{dataForm.self}}</div></div> 
        </div>
        <div class="personal-relation">
          <div class="relation-item">发货地址:  <div style="float: right; padding-right:20px;">{{dataForm.addr}}</div></div>      
        </div>
        <!-- 修改按钮 -->
        <el-button type="primary" @click="changeinfo=true">修改个人信息</el-button>
        <el-button type="primary" @click="changephoto = true">点我修改头像</el-button>
        </el-card>
      </div>
    </el-col>
  </el-row>

      <!--修改商家信息对话框-->
      <el-dialog title="修改个人信息" :visible.sync="changeinfo" width="50%" style="height=50%">
          <!--内容主体区域-->
          <el-form :model="editForm" :rules="editInfoRules" ref="editInfoRef" label-width="80px" size="small" label-position="right">
          <el-form-item label="商家名" prop="nickName">
            <el-input  v-model="editForm.nickName"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input  v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="editForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="homeUrl">
            <el-input  maxlength="18" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="homeUrl">
            <el-input  maxlength="18" disabled></el-input>
          </el-form-item>
          <el-form-item label="所在省份" prop="homeUrl">
            <el-input  maxlength="18" v-model="editForm.addr"></el-input>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input  maxlength="18" v-model="editForm.self"></el-input>
          </el-form-item>
          </el-form>
          <!--底部区域-->
          <span slot="footer" class="dialog-footer">
          <el-button @click="changeinfo = false">关 闭</el-button>
          <el-button type="primary" @click="changeinfo = false">提 交</el-button>
          </span>
      </el-dialog>

      <!--修改头像对话框-->
      <el-dialog class="dialogstyle" title="修改头像" :visible.sync="changephoto" width="70%">
        <div id="img1" class="avatar_select">
        	<img :src="userPhotolist.url1" alt="" />
      	</div>
        <div class="avatar_select" id="img2">
        	<img :src="userPhotolist.url2" alt="" />
      	</div>
        <div class="avatar_select" id="img3">
        	<img :src="userPhotolist.url3" alt="" />
      	</div>
        <div class="avatar_select" id="img4">
        	<img :src="userPhotolist.url4" alt="" />
      	</div>
        <div class="avatar_select" id="img5">
        	<img :src="userPhotolist.url5" alt="" />
      	</div>
        <el-button class="buttonPos" type="primary" style="width:140px" @click="userphoto=userPhotolist.url1">选它</el-button>
        <el-button class="buttonPos" type="primary" style="width:140px" @click="userphoto=userPhotolist.url2">选它</el-button>
        <el-button class="buttonPos" type="primary" style="width:140px" @click="userphoto=userPhotolist.url3">选它</el-button>
        <el-button class="buttonPos" type="primary" style="width:140px" @click="userphoto=userPhotolist.url4">选它</el-button>
        <el-button class="buttonPos" type="primary" style="width:140px" @click="userphoto=userPhotolist.url5">选它</el-button>
      </el-dialog>
    </div>
</template>

<script>
  import url1 from '../xiyangyang.png';
  import url2 from '../meiyangyang.png';
  import url3 from '../lanyangyang.png';
  import url4 from '../feiyangyang.png';
  import url5 from '../nuanyangyang.png';
	export default {
		data() {
			return {
				dataForm:{nickName:'超级管理员',phone: '88888888888',addr: '人大',self:'当个好老板',email:'88888@qq.com',gender:'女'},
        //控制修改商家信息对话框的显示与隐藏
        changeinfo:false,
        //控制修改头像对话框的显示与隐藏
        changephoto:false,
        userPhotolist:{url1:url1,url2:url2,url3:url3,url4:url4,url5:url5},
        //初始头像
        userphoto:url4,

        editInfo:{},
        // 修改个人信息的验证规则
        editInfoRules: {
          nickName: [
            { required: true, message: '请输入修改后的商家昵称', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入修改后的电话', trigger: 'blur' },
            //{ validator: checkMobile, trigger: 'blur' }
          ],
          addr: [
            { required: true, message: '请输入修改后的省份', trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入修改后的邮箱', trigger: 'blur' },
          ],
        },

        //定义修改后的表单
        editForm:{
          nickName:'',
          phone:'',
          addr:'',
          email:'',
          self:''
        }
			}
		},
		components: {
			
		},
		methods: {
			closeDialog() {
			this.dialogVisible = false
			},

      //获取当前用户信息，显示在我们的界面上
      async getinfo(){
        this.loading = true
        const {data:result} = await this.$http.get('/merchant/getInfo.php')

        //检验获取数据是否成功
        if(result.meta.status !== 200){
          return this.$message.error('获取信息失败惹（╥﹏╥）')
        }

        //读取得到用户信息
        this.nickName=result.username
        this.phone=result.phone
        this.addr=result.addr
        this.email=result.email
        this.gender=result.gender
        this.self=result.signature
      },

      //修改信息并提交
      editInfo(){
        this.$http.post('/merchant/getInfo.php',
        {
          addr:this.editForm.addr,
          username:this.editForm.nickName,
          phone:this.editForm.phone,
          email:this.editForm.email,
          signature:this.editForm.self
        }).then(function(result) {
          if(result.data.status == 'success') {
            //关闭对话框
            this.editDialogVisible = false;
            this.getinfo();//修改之后再次获取一下用户信息
            this.$message.success('修改成功o(*￣▽￣*)ブ')}
          else return this.$message.error('修改失败了！')
        })
      }
		}
	};
</script>

<style lang="less" scoped>
//卡片样式
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
//文本样式区
  .name-role {
    font-size: 16px;
    padding: 5px;
   text-align:center;
  }
   .sender{
      text-align:center;
    }
.registe-info{
  text-align: center;
  padding-top:10px;
}
.personal-relation {
  font-size: 16px;
  padding: 0px 5px 15px;
  margin-right: 1px;
    width: 100%
}

.relation-item {
  padding: 12px;
   
}
.dialog-footer{
  padding-top:10px ;
  padding-left: 10%;
}
//布局样式区
   .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  //调节分割线样式
  .el-divider{
    margin: 18px 0;
    background: 0 0;
    border-top: 1px solid #0d0d0e;
  }
  
  //选择图像对话框的样式
  .dialogstyle {
    display: flex;
    height: 80%;
  }     

  //选择头像时的样式
  .avatar_select{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 15px rgb(166, 164, 168);    
    transform: translate(-50%, -50%);
    background-color: rgb(250, 248, 248);
    img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
  }
  #img0{
    position: absolute;
    left: 80%;
    top:13%;
  }
  #img1{
    position: absolute;
    left: 10%;
    top:73%;
  }
  #img2{
    position: absolute;
    left: 30%;
    top:73%;
  }
  #img3{
    position: absolute;
    left: 50%;
    top:73%;
  }
  #img4{
    position: absolute;
    left: 70%;
    top:73%;
  }
  #img5{
    position: absolute;
    left: 90%;
    top:73%;
  }

  //选择头像的按钮样式
  .buttonPos{
    margin-left: 20px;
    margin-right: 18px;
  }
</style>