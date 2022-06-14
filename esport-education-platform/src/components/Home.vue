<template>
  <div id="home-page">
    <Navigation @loginShow="loginShowHandler"></Navigation>
    <Main />
    <Bottom />
    <login-page @close="closeHandler" v-if="loginShow"></login-page>
  </div>
</template>

<script>
import Navigation from "./public/Navigation.vue";
import Main from "./homePage/Main.vue";
import Bottom from "./homePage/Bottom.vue";
import LoginPage from "./loginPage.vue";

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
    Navigation,
    Main,
    Bottom,
    LoginPage,
  },
};
</script>

<style lang="scss" scoped>
</style>