<template>
  <div id="change-password-page">
    <i @click="loginShowHandler" class="el-icon-back"></i>
    <div class="changePassword-title">修改密码</div>
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
          placeholder="原密码"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item prop="newPassword">
        <el-input
          type="password"
          v-model="ruleForm.newPassword"
          autocomplete="off"
          placeholder="新密码"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="submitChangePassword"
          class="confirm-btn"
          type="primary"
          >确定</el-button
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
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        account: "",
        password: "",
        newPassword: "",
      },
      rules: {
        account: [{ validator: accountCheck, trigger: "blur" }],
        password: [{ validator: passwordCheck, trigger: "blur" }],
      },
      loginActive: true,
    };
  },
  methods: {
    closeHandler() {
      this.$emit("close");
    },
    loginShowHandler() {
      this.$emit("loginShow");
    },
    async submitChangePassword() {
      let res = await this.$axios.post("/users/login", {
        user_name: this.ruleForm.account,
        password: this.ruleForm.password,
      });
      let { token, userInfo } = res.data.result;
      let { id, user_name } = userInfo;
      setStore("token", token);
      setStore("id", id);
      setStore("account", user_name);
      await this.$axios.patch("/users", {
        password: this.ruleForm.newPassword,
      });
      this.$message({
        message: "修改密码成功",
        type: "success",
      });
      this.loginShowHandler();
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
#change-password-page {
  padding: 0 55px;
  .changePassword-title {
    font-size: 20px;
    height: 40px;
    justify-content: center;
    display: flex;
  }
  .el-icon-back {
    font-size: 25px;
    cursor: pointer;
  }
  .confirm-btn {
    width: 290px;
    margin-bottom: 20px;
  }
}
</style>