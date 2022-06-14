<template>
  <div id="main">
    <div class="main-bar">
      <swiper />
      <course-display></course-display>
    </div>
  </div>
</template>

<script>
import Swiper from "./Main/Top.vue";
import CourseDisplay from "./Main/CourseDisplay.vue";

export default {
  name: "main",
  data() {
    return {};
  },
  components: {
    Swiper,
    CourseDisplay,
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