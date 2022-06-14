<template>
  <div id="regist-content">
    <ul class="chose-bar">
      <li @click="loginHandler">登录</li>
      |
      <li class="active-li">注册</li>
    </ul>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item prop="account">
        <el-input
          v-model="ruleForm.account"
          placeholder="帐号"
          autocomplete="off"
          prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          placeholder="密码"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input
          type="password"
          v-model="ruleForm.confirmPassword"
          autocomplete="off"
          placeholder="确认密码"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="regist-btn"
          type="primary"
          @click="registHandler('ruleForm')"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setStore } from "@/utils/storage";
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
      } else if (value.length < 6) {
        callback(new Error("密码长度不能少于6位"));
      } else {
        callback();
      }
    };
    let confirmPassword = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        account: "",
        password: "",
        confirmPassword: "",
      },
      rules: {
        account: [{ validator: accountCheck, trigger: "blur" }],
        password: [{ validator: passwordCheck, trigger: "blur" }],
        confirmPassword: [{ validator: confirmPassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    registHandler(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return;
        // 注册账号
        await this.$axios.post("/users/register", {
          user_name: this.ruleForm.account,
          password: this.ruleForm.password,
        });
        // 自动登录
        let res = await this.$axios.post("/users/login", {
          user_name: this.ruleForm.account,
          password: this.ruleForm.password,
        });
        let { token, userInfo } = res.data.result;
        let { id, user_name } = userInfo;
        setStore("token", token);
        setStore("id", id);
        setStore("account", user_name);
        this.$message({
          message: "注册成功，已自动登录",
          type: "success",
        });
        location.reload();
      });
    },
    loginHandler() {
      this.$emit("loginShow");
    },
  },
};
</script>

<style lang="scss" scoped>
#regist-content {
  padding: 0 55px;
  .chose-bar {
    display: flex;
    height: 40px;
    font-size: 20px;
    justify-content: center;
    margin: 10px;
    li {
      cursor: pointer;
      margin: 0 10px;
      padding: 0 10px;
      color: #999;
    }
    .active-li {
      border-bottom: 2px solid #00cc7e;
      color: #333;
    }
  }
  .regist-btn {
    width: 290px;
    margin-bottom: 20px;
  }
  .el-input {
    font-size: 16px;
  }
}
</style>