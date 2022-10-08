<template>
  <div id="course-library">
    <Navigation />
    <div class="library-main">
      <div class="library-bar">
        <CourseDisplay :courseLibrary="courseLibrary"></CourseDisplay>
      </div>
    </div>
    <Bottom />
  </div>
</template>

<script>
import CourseDisplay from "@/components/CourseDisplay.vue";

export default {
  components: {
    CourseDisplay,
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