<template>
  <div id="myLogin">
    <el-dialog title="登录" width="300px" center :visible.sync="isLogin">
      <el-form :model="LoginUser" :rules="rules" status-icon ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" placeholder="请输入账号" v-model="LoginUser.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
            placeholder="请输入密码"
            v-model="LoginUser.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="Login" style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "MyLogin",
  data() {
    // 用户名的校验方法

    return {
      LoginUser: {
        username: "",
        password: "",
        type: "V",
      },
      // 用户信息校验规则,validator(校验方法),trigger(触发方式),blur为在组件 Input 失去焦点时触发
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 20, message: "长度在3到20个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      }
    };
  },
  computed: {
    // 获取vuex中的showLogin，控制登录组件是否显示
    isLogin: {
      get() {
        return this.$store.getters.getShowLogin;
      },
      set(val) {
        this.$refs["ruleForm"].resetFields();
        this.setShowLogin(val);
      }
    }
  },
  methods: {
    ...mapActions(["setUser", "setShowLogin"]),
    Login() {
      // 通过element自定义表单校验规则，校验用户输入的用户信息
      this.$refs["ruleForm"].validate(valid => {
        //如果通过校验开始登录
        if (valid) {
          this.$http
            .post("/login/loginCheck.php", this.LoginUser)
            .then(res => {
              // “001”代表登录成功，其他的均为失败
              if (res.data.status === "success") {
                // 隐藏登录组件
                this.isLogin = false;
                localStorage.clear()
                localStorage.setItem("userToken", res.data.token);
                // 登录信息存到本地(localstorage)
                // 这里要求登录之后后端就返回存储的用户信息。
                this.$http.get("/member/getInfo.php")
                .then(res => 
                { 
                  let user = res.data;
                  localStorage.setItem("user", JSON.stringify(user));
                  this.setUser(user);
                })
                // 登录信息存到vuex
                // 弹出通知框提示登录成功信息
                this.$message.success('登录成功了！欢迎~')
              } else {
                // 清空输入框的校验状态
                this.$refs["ruleForm"].resetFields();
                // 弹出通知框提示登录失败信息
                this.$message.error('登录失败了！呜呜');
              }
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style>
</style>
