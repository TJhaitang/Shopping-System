<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <!-- 头像 -->
        <img src="../assets/xiaogougou.png" alt="" />
      </div>
      <!-- 登录表单  -->
      <el-form
        :model="loginForm"
        ref="loginFormRef"
        :rules="Rules"
        label-width="60px"
        class="login_form"
        :label-position="left"
      >
        <el-form-item prop="email" label="邮箱">
          <el-input type="e-mail" v-model="loginForm.email"></el-input>
          <el-button type="primary" @click="getCode">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="emailcode" label="验证码">
          <el-input type="emailcode" v-model="loginForm.emailcode"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="primary" @click="dialogVisible = true"
            >注册</el-button
          >
<<<<<<< HEAD
=======
          <el-button type="primary" @click="test">test</el-button>
          <el-button type="primary" @click="goHome">跳转</el-button>
>>>>>>> 184306357a45fad0d8bfe5ba416192bb0d556260
        </el-form-item>
      </el-form>
    </div>
    <!-- 注册的弹框内容 -->
    <el-dialog
      title="商家注册"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 在此添加注册表单内容 -->
      <el-form
      :model="registerForm" 
      :rules="Rules" 
      ref="registerFormRef" 
      label-width="90px"
      label-position="left"
      >
        <el-form-item label="商家名" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" >
          <el-input float:left v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="真实姓名">
          <el-input  v-model="registerForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="id" label="身份证号">
          <el-input v-model="registerForm.identity"></el-input>
        </el-form-item>
        <el-form-item prop="province" label="所在省份">
          <el-input v-model="registerForm.province"></el-input>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="register">确定</el-button>
      </span>
    </el-dialog>
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
          if (this.registerForm.checkPass !== '') {
            this.$refs.registerForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.pass) {
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
      //登录表单数据绑定
      loginForm: {
        email: "",
        password: "",
        emailcode: "",
        type: "S",
      },

      registerForm: {
        username: "",
        email: "",
        //emailcode: "",
        password: "",
        name: "",
        identity: "",
        type: "S",
        province: "",
      },

      Rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }],
        emailcode: [
          { required: false, message: "请输入验证码", trigger: "blur" },
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' }
        ],
       //设置密码时的动态校验规则
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        id: [
          { required: true, validator: checkIdNum, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur'},
          { min: 2, max: 3, trigger: 'blur'}
        ],
        //省份是否用自动生成的方式替代，或者用下拉框优化
        province: [
          { required: true,message: '请输入你所在的省份',trigger:'blur'}
        ]
      },
   
      
      //注册对话框默认不显示
      dialogVisible: false,
      testForm: {
        type: "S",
        password: "123456",
        name: "xxx",
        email: "1319377413@qq.com",
        province: "SD",
        identity: "37000020333068366",
        username: "TJhat",
        gender: "F",
      }

    }
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return; //如果预验证失败就返回
        const result = await this.$http.post("/login/loginCheck.php", [
          this.loginForm.username,
          this.loginForm.password,
        ]); //用post方法向后端发登陆表单的数据
        //弹窗提示
        if (result.status == "success")
          return this.$message.success("登录成功啦");
        this.$message.error("登录失败/(ㄒoㄒ)/~~");
        //window.sessionStorage.setItem("token" , "结果里的token值")
      });
    },
    //注册方法：
    register() {
      //先预校验
      this.$refs.registerFormRef.validate(valid => {
        if (!valid) return //如果预验证失败就返回
        const result = await this.$http.post(
          "/login/signUp.php",
          this.registerForm
        ); //用post方法向后端发登陆表单的数据
        //弹窗提示
        console.log(result);
        if (result.status == "success")
          return this.$message.success("注册成功啦");
        this.$message.error("注册失败(T_T)检查下哪里写错错了");
      })
    },
    getCode() {
      this.$refs.loginFormRef.validate(async (valid) => {
        const result = await this.$http.post(
          "/login/getMail.php",
          this.loginForm
        ); //用post方法向后端发登陆表单的数据
        console.log(result);
      });
    },
<<<<<<< HEAD
    handleClose(done) {
        this.$confirm('确认取消注册？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    
  }
=======
    goHome() {
        this.$router.push("/home");
    },
  },
>>>>>>> 184306357a45fad0d8bfe5ba416192bb0d556260
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #22476d;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 350px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 15px rgb(166, 164, 168);
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}
</style>
