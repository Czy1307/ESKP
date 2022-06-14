<template>
  <div id="login-content">
    <ul class="chose-bar">
      <li class="active-li">登录</li>
      |
      <li @click="registShow">注册</li>
    </ul>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="ruleForm">
      <el-form-item prop="account">
        <el-input
          placeholder="帐号"
          v-model="ruleForm.account"
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
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="loginHander('ruleForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
    <div class="link-bar">
      <el-link @click="changePassword" type="info">修改密码</el-link>
    </div>
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
    };
  },
  methods: {
    loginHander(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return;
        try {
          let res = await this.$axios.post("/users/login", {
            user_name: this.ruleForm.account,
            password: this.ruleForm.password,
          });
          this.$message({
            message: "登陆成功",
            type: "success",
          });
          let { token, userInfo } = res.data.result;
          let { id, user_name } = userInfo;
          setStore("token", token);
          setStore("id", id);
          setStore("account", user_name);
          location.reload();
        } catch (error) {
          this.$message({
            message: "账号或密码错误",
            type: "error",
          });
        }
      });
    },
    changePassword() {
      this.$emit("changePassword");
    },
    registShow() {
      this.$emit("registShow");
    },
  },
};
</script>

<style lang="scss" scoped>
#login-content {
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
  .login-btn {
    width: 290px;
  }
  .link-bar {
    margin-bottom: 30px;
    float: right;
  }
  .el-input {
    font-size: 16px;
  }
}
</style>