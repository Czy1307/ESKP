<template>
  <div id="my-course">
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="course in courseList" :key="course">
        <img @click="toCourseDetail(course.id)" :src="course.imgUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courseList: [],
    };
  },
  async created() {
    try {
      let res = await this.$axios.get(
        `/users/myCourse?account=${this.$route.query.account}`
      );
      this.courseList = JSON.parse(res.data.courseList);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    toCourseDetail(id) {
      this.$router.push(`/courseDetail?courseId=${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
#my-course {
  img {
    height: 100%;
    width: 100%;
  }
}
</style>