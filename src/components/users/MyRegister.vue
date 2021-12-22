<template>
  <div id="register">
    <el-dialog title="注册" width="300px" center :visible.sync="isRegister">
      <el-form
        :model="RegisterUser"
        :rules="rules"
        status-icon
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            placeholder="请输入用户名"
            v-model="RegisterUser.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            prefix-icon="el-icon-phone"
            type="phone"
            placeholder="请输入电话号码"
            v-model="RegisterUser.phone"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            prefix-icon="el-icon-message"
            type="phone"
            placeholder="请输入邮箱地址"
            v-model="RegisterUser.email"
          ></el-input>
        </el-form-item>
        <el-form-item prop="province" label="你所在省份">
          <el-input v-model="RegisterUser.province" suffix-icon="el-icon-s-home" list="province_list"></el-input>
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
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
            placeholder="请输入密码"
            v-model="RegisterUser.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPass">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
            placeholder="请再次输入密码"
            v-model="RegisterUser.confirmPass"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="Register" style="width:100%;">注册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "MyRegister",
  props: ["register"],
  data() {
    // 用户名的校验方法
    
    // 密码的校验方法
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.RegisterUser.confirmPass !== "") {
          this.$refs.ruleForm.validateField("confirmPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.RegisterUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkMobile = (rule,value,cb) =>{
            const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ 
            if (regMobile.test(value)) { 
                //合法的手机号码
                return cb() 
            }
            cb(new Error('手机号码格式不正确'))     
        }
    return {
      isRegister: false, // 控制注册组件是否显示
      RegisterUser: {
        username: "",
        password: "",
        confirmPass: "",
        phone: "",
        province: "",
        type: "V",
        email: ""
      },
      // 用户信息校验规则,validator(校验方法),trigger(触发方式),blur为在组件 Input 失去焦点时触发
      rules: {
        username:[
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 20, message: "长度在3到20个字符", trigger: "blur" },
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        confirmPass: [{ validator: validatePass2, trigger: "blur" }],
        phone: [{ validator: checkMobile, trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ]
      }
    };
  },
  watch: {
    // 监听父组件传过来的register变量，设置this.isRegister的值
    register: function(val) {
      if (val) {
        this.isRegister = val;
      }
    },
    // 监听this.isRegister变量的值，更新父组件register变量的值
    isRegister: function(val) {
      if (!val) {
        this.$refs["ruleForm"].resetFields();
        //没懂 为啥要用什么父子组件的方法呀
        this.$emit("fromChild", val);
      }
    }
  },
  methods: {
    Register() {
      // 通过element自定义表单校验规则，校验用户输入的用户信息
      this.$refs["ruleForm"].validate(valid => {
        //如果通过校验开始注册
        if (valid) {
          this.$http
            .post("/login/userSignUp.php", this.RegisterUser)
            .then(res => {
              // “001”代表注册成功，其他的均为失败
              console.log('hahaha');
              if (res.data.status === "success") {
                // 隐藏注册组件
                this.isRegister = false;
                // 弹出通知框提示注册成功信息
                this.$message.success("注册成功了哦~~")
              } else {
                // 弹出通知框提示注册失败信息
                this.$message.error("注册失败了ww")
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