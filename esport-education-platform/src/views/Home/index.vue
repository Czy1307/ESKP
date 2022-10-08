<template>
  <div id="home-page">
    <Navigation @loginShow="loginShowHandler"></Navigation>
    <MainBar />
    <Bottom />
    <LoginPage @close="closeHandler" v-if="loginShow"></LoginPage>
  </div>
</template>

<script>
import MainBar from "@/views/Home/MainBar";

export default {
  name: "home",
  data() {
    return {
      loginShow: false,
    };
  },
  methods: {
    loginShowHandler() {
      this.loginShow = true;
    },
    closeHandler() {
      this.loginShow = false;
    },
  },
  components: {
    MainBar,
  },
};
</script>

<style lang="scss" scoped>
</style>