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
        :rules="loginFormRules"
        label-width="40px"
        class="login_form"
      >
        <el-form-item prop="username" label="邮箱">
          <el-input type="e-mail" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="emailcode" label="验证码">
          <el-input type="emailcode" v-model="loginForm.emailcode"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary">发送验证码</el-button>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="primary" @click="getCode">获取验证码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //登录表单数据绑定
      loginForm: {
        username: "",
        password: "",
        emailcode: "",

      },
      loginFormRules: {
        username: [
          { required: false, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        password: [{ required: false, message: "请输入密码", trigger: "blur" }],
        emailcode: [{ required: false, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return; //如果预验证失败就返回
        const result = await this.$http.post(
          "/login/loginCheck.php",
          [this.loginForm.username, this.loginForm.password,this.loginForm.emailcode]
        ); //用post方法向后端发登陆表单的数据
        console.log(result);
      });
    },
    getCode() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return; //如果预验证失败就返回
        const result = await this.$http.post(
          "/login/getMail.php",
          this.loginForm
        ); //用post方法向后端发登陆表单的数据
        console.log(result);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #22476d;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 400px;
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
