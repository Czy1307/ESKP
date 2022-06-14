<template>
  <div :id="courseClass">
    <div
      class="course-item"
      v-for="course in courseData"
      :key="course.goods_name"
      @click="toCourseDetail(course.id)"
    >
      <img class="play-icon" src="@/assets/img/icon/play.png" alt="" />
      <img
        v-show="course.goods_price !== '0.00'"
        class="pay-icon"
        src="@/assets/img/icon/pay.png"
        alt=""
      />
      <img class="course-img" :src="course.goods_img" alt="" />
      <div class="course-info">
        <div class="info-title">{{ course.goods_name }}</div>
        <div class="info-author">{{ course.goods_author }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      courseData: [],
      courseClass: "",
    };
  },
  props: ["courseTitle", "courseLibrary"],
  async created() {
    let getData = await this.$axios.get("/goods/courseData");
    let courseList = getData.data;
    // 区别不同分区
    let areaList = _.filter(courseList, (item) => {
      return this.courseTitle.includes(item.goods_area);
    });
    if (this.courseLibrary) {
      this.courseData = areaList;
      this.courseClass = "course-library";
    } else {
      // 随机抽取三个在首页展示
      this.courseData = _.sampleSize(areaList, 3);
      this.courseClass = "course-home";
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
#course-home {
  width: 100%;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  .course-item {
    position: relative;
    display: inline-block;
    border-radius: 8px;
    overflow: hidden;
    height: 400px;
    width: 400px;
    background: #fff;
    cursor: pointer;
    .course-img {
      height: 70%;
      width: 100%;
    }
    .course-info {
      height: 30%;
      margin: 10px;
      line-height: 24px;
      .info-title {
        font-size: 20px;
        margin-bottom: 10px;
      }
      .info-author {
        color: #999;
      }
    }
    .play-icon {
      position: absolute;
      width: 100px;
      top: 22%;
      left: 38%;
      opacity: 0;
      transition: opacity 0.5s;
    }
    .pay-icon {
      width: 50px;
      position: absolute;
      right: 0;
    }
  }
  :hover .play-icon {
    opacity: 1;
  }
}
#course-library {
  width: 100%;
  .course-item {
    margin: 15px 25px 10px 0;
    position: relative;
    display: inline-block;
    border-radius: 8px;
    overflow: hidden;
    height: 300px;
    width: 290px;
    background: #fff;
    cursor: pointer;
    .course-img {
      height: 70%;
      width: 100%;
    }
    .course-info {
      height: 30%;
      margin: 10px;
      line-height: 24px;
      .info-title {
        font-size: 16px;
      }
      .info-author {
        color: #999;
      }
    }
    .play-icon {
      position: absolute;
      width: 80px;
      top: 20%;
      left: 35%;
      opacity: 0;
      transition: opacity 0.5s;
    }
    .pay-icon {
      width: 50px;
      position: absolute;
      right: 0;
    }
  }
  .course-item:hover .play-icon {
    opacity: 1;
  }
}
</style>