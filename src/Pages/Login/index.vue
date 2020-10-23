<template>
  <div class="login-page">
    <video
      muted="muted"
      src="../../assets/video/bg_video.mp4"
      autoplay="autoplay"
      loop="loop"
      preload="auto"
      class="bg_video"
    ></video>
    <img src="../../assets/styles/bg.jpg" alt="" class="img1" />
    <img src="../../assets/styles/bg_b.png" alt="" class="img2" />
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-loginForm"
    >
      <h1 class="title">千锋管理系统</h1>
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">
          提交
          </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//登入逻辑：
//1 手机用户输入的username和password传递给后端
// 登入通过后，将后端返回的token存到本地
//校验token成功后每次请求的时候携带token
//展示token校验正确的数据
//校验不通过，
import { login } from "@/api";
import { mapMutations } from "vuex";

export default {
  /**
   * @ root验证的字段
   * @param {Object} rule就是一个表单验证对象
   * @param {String} rule 输入值
   * @param {Function} callback
   */
  data() {
    var validateUsername = (rule, value, callback) => {
      //用户名正则，4到16位（字母，数字，下划线，减号）
      // var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!value) {
        callback("请输入用户名");
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      //  var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!value) {
        callback("请输入密码");
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["SET_USERINFO"]),
    submitForm(formName) {
      //是一个处理函数
      this.$refs[formName].validate(valid => {
        if (valid) {
          //代表本地校验通过
          //打开登入加载动画
          const loading = this.$loading({
            lock: true,
            text: "正在登录",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          let { username, password } = this.loginForm;
          login(username, password) //发送请求
            .then(res => {
              //服务器响应，关闭loading
              loading.close();
              // console.log(res);
              if (res.data.state) {
                this.$message.success("登录成功");
                localStorage.setItem("wf-token", res.data.token);
                localStorage.setItem(
                  "wf-userInfo",
                  JSON.stringify(res.data.userInfo)
                );
                //设置vuex中的state[userInfo]的值
                this.SET_USERINFO(res.data.userInfo);
                //跳转到主页
                this.$router.push("/Welcome");
              } else {
                //用户名密码错误
                this.$message.error("用户名或密码错误");
              }
            })
            .catch(err => {
              console.log(err);
            });
          // alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.login-page {
  position: relative;
  width: 100%;
  height: 100%;
}
.el-form {
  position: absolute;
  left: 0;
  right: 0;
  width: 300px;
  padding: 40px 40px 15px 40px;
  margin: 150px auto;
  background: rgba(107, 90, 236, 0.4);
  border-radius: 30px;
  height: 400px;
  margin-right: 100px;
}
el-form-item {
  border-radius: 20px;
}
.el-button {
  width: 300px;
  background: linear-gradient();
}
.bg_video {
  display: block;
  margin: auto;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0.5;
}
.title {
  color: #fff;
  margin-top: 100px;
  margin-bottom: 50px;
  text-align: center;
}
.el-button {
  width: 100%;
  background: linear-gradient(90deg, #8473e0, #180a91e3);
}
.img1 {
  position: absolute;
  opacity: 0.1;
}
.img2 {
  position: absolute;
  left: 15%;
  top: 30%;
  width: 300px;
  height: 300px;
  z-index: 2;
}
</style>
