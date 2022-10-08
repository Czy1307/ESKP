<template>
  <el-row class="tac">
    <el-menu router>
      <el-menu-item @click="toPersonInfo" index="info">
        <i class="el-icon-user"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item @click="toHistroy" index="history">
        <i class="el-icon-time"></i>
        <span slot="title">观看记录</span>
      </el-menu-item>
      <el-menu-item @click="toMyCourse" index="myCourse">
        <i class="el-icon-goods"></i>
        <span slot="title">我的课程</span>
      </el-menu-item>
      <el-menu-item @click="outLogin">
        <i class="el-icon-switch-button"></i>
        <span slot="title">退出登录</span>
      </el-menu-item>
    </el-menu>
  </el-row>
</template>

<script>
import { getStore, removeStore } from "@/utils/storage";

export default {
  methods: {
    outLogin() {
      removeStore("token");
      this.$router.replace("/");
    },
    toHistroy() {
      let account = getStore("account");
      this.$router.push(`/history?account=${account}`);
    },
    toPersonInfo() {
      let account = getStore("account");
      this.$router.push(`/info?account=${account}`);
    },
    toMyCourse() {
      let account = getStore("account");
      this.$router.push(`/myCourse?account=${account}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  .el-menu-item {
    height: 100px;
    line-height: 100px;
    font-size: 17px;
  }
}
</style>