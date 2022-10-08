<template>
  <div id="course-display">
    <div class="course-display" v-for="item in titleList" :key="item">
      <div class="game-title">{{ item.title }}</div>
      <div>
        <course-item
          :courseLibrary="courseLibrary"
          :courseTitle="item.title"
        ></course-item>
      </div>
    </div>
  </div>
</template>

<script>
import CourseItem from "@/components/CourseItem.vue";
export default {
  name: "CourseDisplay",
  data() {
    return {
      titleList: [
        { title: "英雄联盟 | LOL" },
        { title: "APEX" },
        { title: "绝地求生 | PUBG" },
        { title: "王者荣耀" },
      ],
    };
  },
  props: ["courseLibrary"],
  components: {
    CourseItem,
  },
};
</script>

<style lang="scss" scoped>
#course-display {
  .course-display {
    padding: 40px 0;
  }
  .game-title {
    color: #333;
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
  }
}
</style>