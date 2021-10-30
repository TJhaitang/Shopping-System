<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box"><!-- 头像 -->
                <img src="../assets/xiaogougou.png" alt="">
            </div>
            <!-- 登录表单  -->
            <el-form :model="loginForm" :rules="loginFormRules" label-width="40px" class="login_form">
                <el-form-item prop="username" label="邮箱">
                    <el-input type="e-mail" v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input type="password" v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary">登录</el-button>
                    <el-button type="primary">验证码登录</el-button>
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
                username: '',
                password: '',
            },
            loginFormRules: {
                username: [ 
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    }
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: #22476d;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%)
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
    transform: translate(-50%,-50%);
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
