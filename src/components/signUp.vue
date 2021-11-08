<template>
  <div class="signup_container">
    <div class="signup_box">
      <!-- 登录表单  -->
      <el-form
        :model="signupForm"
        ref="signupFormRef"
        :rules="Rules"
        label-width="90px"
        class="signup_form"
      >
        <el-form-item label="商家名" prop="username">
          <el-input v-model="signupForm.username" suffix-icon="el-icon-eleme"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" >
          <el-input v-model="signupForm.email" suffix-icon="el-icon-message"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="验证码">
          <el-input type="emailcode" v-model="signupForm.code"></el-input>
          <el-button type="primary" @click="getCode" style="position:absolute;top:0px;z-index:99;right:0px">发送验证码</el-button>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="signupForm.password" autocomplete="off" suffix-icon="el-icon-key"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="signupForm.checkPass" autocomplete="off" suffix-icon="el-icon-key"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="真实姓名">
          <el-input  v-model="signupForm.name" autocomplete="off" suffix-icon="el-icon-s-custom"></el-input>
        </el-form-item>
        <el-form-item prop="identity" label="身份证号">
          <el-input v-model="signupForm.identity" suffix-icon="el-icon-s-opportunity"></el-input>
        </el-form-item>
        <el-form-item prop="province" label="所在省份">
          <el-input v-model="signupForm.province" suffix-icon="el-icon-s-home" list="province_list"></el-input>
          <datalist id="province_list">
              <option value="河北省"/>
              <option value="山西省"/>
              <option value="辽宁省"/>
              <option value="吉林省"/>
              <option value="黑龙江省"/>
              <option value="江苏省"/>
              <option value="浙江省"/>
              <option value="安徽省"/>
              <option value="福建省"/>
              <option value="江西省"/>
              <option value="山东省"/>
              <option value="河南省"/>
              <option value="湖北省"/>
              <option value="湖南省"/>
              <option value="广东省"/>
              <option value="海南省"/>
              <option value="四川省"/>
              <option value="贵州省"/>
              <option value="云南省"/>
              <option value="陕西省"/>
              <option value="甘肃省"/>
              <option value="青海省"/>
              <option value="台湾省"/>
              <option value="内蒙古自治区"/>
              <option value="广西壮族自治区"/>
              <option value="西藏自治区"/>
              <option value="宁夏回族自治区"/>
              <option value="新疆维吾尔自治区"/>
              <option value="北京市"/>
              <option value="天津市"/>
              <option value="上海市"/>
              <option value="重庆市"/>
              <option value="香港特别行政区"/>
              <option value="澳门特别行政区"/>
          </datalist>
        </el-form-item>
        <!-- 按钮位置 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="tologin">去登录</el-button>
          <el-button type="primary" @click="signup">确认注册</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
    //确认密码的校验规则
     var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.signupForm.checkPass !== '') {
            this.$refs.signupFormRef.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.signupForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var checkIdNum = (rule, value, callback) => {
		    const reg =
		      /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)/
		     if (!value) {
		      return callback(new Error('证件号码不能为空'))
		    } else if (!reg.test(value)) {
		      return callback(new Error('证件号码不正确'))
		    } else {
		      callback()
		 }};
    return {
      //注册表单数据绑定
      /*signupForm: {
        username: "",
        email: "",
        password: "",
        name: "",
        identity: "",
        type: "S",
        province: "",
        code: "",
        phone: "",
        addr: "",
        gender: "",
        signature: "",
      },*/

      Rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        /*code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],*/
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在3到20个字符', trigger: 'blur' }
        ],
       //设置密码时的动态校验规则
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        identity: [
          { required: true, trigger: 'blur' ,validator: checkIdNum}
        ],
        name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur'},
          { min: 2, max: 3, trigger: 'blur'}
        ],
        //省份是否用自动生成的方式替代，或者用下拉框优化
        province: [
          { required: true,message: '请输入你所在的省份',trigger:'blur'}
        ],
    
      },
   
      
      signupForm: {
        type: "",
        password: "",
        name: "",
        email: "",
        province: "",
        identity: "",
        username: "",
        gender: "",
        phone: "",
        addr: "",
        gender: "",
        signature: "",
      },

    }
  },
  methods: {
      signup() {
      //先预校验
      this.$refs.signupFormRef.validate(async(valid) => {
        if (!valid) return //如果预验证失败就返回
        const result = await this.$http.post(
          "/login/signUp.php",
          this.signupForm
        ); //用post方法向后端发登陆表单的数据
        //弹窗提示
        console.log(result);
        if (result.status == "success")
          return this.$message.success("注册成功啦");
        this.$message.error("注册失败(T_T)检查下哪里写错错了");
      })
    },
    getCode() {
      this.$refs.signupFormRef.validate(async (valid) => {
        const result = await this.$http.post(
          "/login/getMail.php",
          this.signupForm.email
        ); //用post方法向后端发登陆表单的数据
        console.log(result);
      });
    },
    tologin() {
      this.$router.push("/login")
    },
    reset() {
        this.$refs.signupFormRef.resetFields();
    }
  }
}
</script>

<style lang="less" scoped>
.signup_container {
  background-color: #22476d;
  height: 100%;
  .signup_box {
  width: 50%;
  height: 100%;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
}


.btns {
  display: flex;
  justify-content: flex-end;
}

.signup_form {
  position: absolute;
  bottom: 0;
  width: 90%;
  height: 90%;
  box-sizing: border-box;
  padding: 0 20px;
}
</style>

