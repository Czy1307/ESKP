<template>
  <div id="navigation" height="70px">
    <div class="top-bar">
      <div class="logo-bar">
        <img @click="toHome" src="@/assets/logo.png" alt="" />
      </div>
      <div class="menu-bar">
        <div>
          <span @click="toHome">首页</span>
        </div>
        <div>
          <span @click="toCourseLibrary">课程库</span>
        </div>
      </div>
      <div v-show="!isLogin" class="login-bar">
        <span @click="loginShow">登录 | 注册</span>
      </div>
      <div v-show="isLogin" class="user-bar">
        <span @click="toUser">个人中心</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getStore } from "@/utils/storage";

export default {
  name: "navigation",
  methods: {
    toUser() {
      let account = getStore("account");
      this.$router.push(`/user?account=${account}`);
    },
    toHome() {
      this.$router.push("/");
    },
    loginShow() {
      this.$emit("loginShow");
    },
    toCourseLibrary() {
      this.$router.push("/courseLibrary");
    },
  },
  computed: {
    isLogin() {
      let loginState = getStore("token");
      return loginState;
    },
  },
};
</script>

<style lang="scss" scoped>
#navigation {
  border-bottom: 2px solid #f7f7f7;
  .top-bar {
    width: 1260px;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    margin: 0 auto;
    .logo-bar {
      margin-right: 200px;
      img {
        cursor: pointer;
        height: 70px;
        width: 300px;
      }
    }
    .menu-bar {
      display: -webkit-flex;
      display: flex;
      -webkit-justify-content: space-between;
      justify-content: space-between;
      div {
        margin: 0 30px;
        line-height: 70px;
        span {
          font-size: 16px;
          cursor: pointer;
        }
        span:hover {
          color: #409eff;
        }
      }
    }
    .user-bar,
    .login-bar {
      margin: 0 30px;
      line-height: 70px;
      span {
        font-size: 16px;
        cursor: pointer;
      }
      span:hover {
        color: #409eff;
      }
    }
  }
}
</style>