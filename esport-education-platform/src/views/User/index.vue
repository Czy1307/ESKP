<template>
  <div id="user">
    <el-container>
      <el-header class="user-head">
        <Navigation />
      </el-header>
      <el-container>
        <el-aside width="250px">
          <SideNavigation />
        </el-aside>
        <el-main class="user-main">
          <keep-alive> <router-view></router-view> </keep-alive
        ></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideNavigation from "@/views/User/SideNavigation";

export default {
  name: "user",
  components: {
    SideNavigation,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
#user {
  .user-main {
    background-color: #f7f7f7;
    min-height: 894px;
    padding: 3% 15%;
  }
  .user-head {
    margin-bottom: 14px;
  }
}
</style>