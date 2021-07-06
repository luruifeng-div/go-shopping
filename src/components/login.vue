<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区 -->
      <el-form
        label-width="0px"
        class="login_form"
        :model="loginForm"
        :rules="loginRules"
        ref="loginFromRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="login_btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      //   表单验证对象
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在3到8个字符之间", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 6,
            max: 11,
            message: "长度在3到11个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //重置按钮函数
    resetLoginForm() {
      this.$refs.loginFromRef.resetFields();
      // console.log(this);
    },
    //登录预验证
    login(){
      // console.log(this);
    this.$refs.loginFromRef.validate( async valid => {
      if(!valid) return;
    const {data: result} = await this.$http.post("login",this.loginForm)
      if(result.meta.status !== 200) return this.$message.error("登录失败");
      this.$message.success("登录成功")
      //1.将登录成功后的token,保存到客户端 sessionStorage中
        // 项目中除了登录之外的其他Api接口,必须登录后才能访问
        //  token只在当前网站打开期间生效,所以将token保存在sessionStorage中
        // 2.通过编程式导航跳转到后台主页,路由地址是"/home"
      // console.log(result)
      sessionStorage.setItem('token',result.data.token);
      this.$router.push("/home")
    })
    }   
  },
};
</script>

<style lang="less">
.login_container {
  background: #2b3b4b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 100px;
  width: 100px;
  border: 1px solid black;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px;
  background: pink;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: pink;
  }
}
.login_form {
  position: absolute;
  padding: 0 20px;
  box-sizing: border-box;
  bottom: 0;
  width: 100%;
}
.login_btn {
  text-align: center;
}
</style>