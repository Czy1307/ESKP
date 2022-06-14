<template>
  <div id="course-library">
    <navigation></navigation>
    <div class="library-main">
      <div class="library-bar">
        <course-display :courseLibrary="courseLibrary"></course-display>
      </div>
    </div>
    <Bottom />
  </div>
</template>

<script>
import navigation from "./public/Navigation.vue";
import courseDisplay from "./homePage/Main/CourseDisplay.vue";
import Bottom from "./homePage/Bottom.vue";

export default {
  components: {
    navigation,
    courseDisplay,
    Bottom,
  },
  data() {
    return {
      courseLibrary: false,
    };
  },
  created() {
    this.courseLibrary = true;
  },
};
</script>

<style lang="scss" scoped>
#course-library {
  .library-main {
    background-color: #f7f7f7;
    .library-bar {
      width: 1260px;
      margin: 0 auto;
      padding-bottom: 100px;
    }
  }
}
</style>