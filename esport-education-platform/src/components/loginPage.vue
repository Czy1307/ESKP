<template>
  <div id="login-page">
    <div class="login-background"></div>
    <div class="login-bar">
      <div class="login-close">
        <i class="el-icon-close" @click="closeHandler"></i>
      </div>
      <login
        @changePassword="changePasswordHandler"
        @registShow="registShowHandler"
        @close="closeHandler"
        v-show="loginActive"
      ></login>
      <regist
        @close="closeHandler"
        @loginShow="loginShowHandler"
        v-show="registActive"
      ></regist>
      <change-password
        @loginShow="loginShowHandler"
        v-show="changePasswordActive"
      ></change-password>
    </div>
  </div>
</template>

<script>
import ChangePassword from "./LoginComponents/changePassword.vue";
import login from "./LoginComponents/login.vue";
import regist from "./LoginComponents/regist.vue";

export default {
  data() {
    let accountCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let passwordCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ validator: accountCheck, trigger: "blur" }],
        password: [{ validator: passwordCheck, trigger: "blur" }],
      },
      loginActive: true,
      registActive: false,
      changePasswordActive: false,
    };
  },
  components: {
    login,
    regist,
    ChangePassword,
  },
  methods: {
    closeHandler() {
      this.$emit("close");
    },
    registShowHandler() {
      this.registActive = true;
      this.loginActive = false;
    },
    loginShowHandler() {
      this.registActive = false;
      this.loginActive = true;
      this.changePasswordActive = false;
    },
    changePasswordHandler() {
      this.changePasswordActive = true;
      this.loginActive = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#login-page {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  .login-background {
    background-color: #3b3b3b;
    opacity: 0.75;
    z-index: 10000;
    height: 100%;
    width: 100%;
    position: fixed;
  }
  .login-bar {
    position: absolute;
    z-index: 10002;
    left: 40%;
    top: 30%;
    width: 400px;
    background: #ffffff;
    border: 1px solid #dddddd;
    .login-close {
      height: 40px;
      font-size: 20px;
      text-align: right;
      .el-icon-close {
        cursor: pointer;
      }
    }
  }
}
</style>