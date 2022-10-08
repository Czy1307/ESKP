<template>
  <div id="main">
    <div class="main-bar">
      <Swiper />
      <CourseDisplay />
    </div>
  </div>
</template>

<script>
export default {
  name: "main",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
#main {
  background-color: #f7f7f7;
  padding-bottom: 100px;
  .main-bar {
    width: 1260px;
    margin: 0 auto;
  }
}
</style>