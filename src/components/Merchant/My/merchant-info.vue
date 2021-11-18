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
       			<div class="avatar_box">
        	    <img src="../xiaogougou.png" alt="" />
      	    </div> 
            <div class="uploadphoto">
				      <el-button type="primary" @click="dialogVisible = true">点我上传头像</el-button>
				      <uploadAvatar :dialogVisible="dialogVisible" @on-close="closeDialog"></uploadAvatar>
            </div>
        <el-divider></el-divider>
        <div class="personal-relation">
        <div class="relation-item">手机号:  <div style="float: right; padding-right:20px;">{{dataForm.phone}}</div></div>
    </div>
    <div class="personal-relation">
      <div class="relation-item">所属企业:  <div style="float: right; padding-right:20px;">良心资本家</div></div> 
    </div>
       <div class="personal-relation">
      <div class="relation-item">首页链接:  <div style="float: right; padding-right:20px;">{{dataForm.homeUrl}}</div></div>      
    </div>
    <!-- 修改按钮 -->
    <el-button type="primary" @click="changeinfo=true">修改</el-button>
    </el-card>
    </div>
       </el-col>
      </el-row>

      <!--修改商家信息对话框-->
      <el-dialog title="修改个人信息" :visible.sync="changeinfo" width="50%">
          <!--内容主体区域-->
          <el-form label-width="80px" v-model="dataFrom" size="small" label-position="right">
          <el-form-item label="商家名" prop="nickName">
            <el-input  auto-complete="off" v-model="dataForm.nickName"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="phone">
            <el-input auto-complete="off" v-model="dataForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="homeUrl">
            <el-input  maxlength="18" v-model="dataForm.homeUrl" disabled></el-input>
          </el-form-item>
          <el-form-item label="所在省份" prop="homeUrl">
            <el-input  maxlength="18" v-model="dataForm.homeUrl"></el-input>
          </el-form-item>
          </el-form>
          <!--底部区域-->
          <span slot="footer" class="dialog-footer">
          <el-button @click="changeinfo = false">关 闭</el-button>
          <el-button type="primary" @click="changeinfo = false">提 交</el-button>
          </span>
      </el-dialog>
    </div>
</template>

<script>
	import uploadAvatar from "../../uploadAvatar.vue"
	export default {
		data() {
			return {
				dialogVisible: false,
				dataForm:{nickName:'超级管理员',phone: '173567777777',homeUrl: 'http://www.baidu.com'},
        //控制修改商家信息对话框的显示与隐藏
        changeinfo:false
			}
		},
		components: {
			uploadAvatar
		},
		methods: {
			closeDialog() {
			this.dialogVisible = false
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

  //头像显示设置
  .avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 15px rgb(166, 164, 168);
  position: absolute;
  left: 80%;
  top:18%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }

  //上传图片的按钮设置
  .uploadphoto button{
    position: relative;
    text-align: right;
  }
}
</style>