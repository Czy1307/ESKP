<template>
  <div id="course">
    <Navigation></Navigation>
    <div class="course-page">
      <div class="course-bar">
        <div class="title-bar">{{ title }}</div>
        <div class="video-bar">
          <div v-if="payShow" class="pay-back"></div>
          <div v-if="payShow" class="pay-bar">
            <div class="pay-info">此课程为付费课程，请购买后观看</div>
            <div class="pay-btn" @click="toCourseOrder">购买课程</div>
          </div>
          <iframe
            :src="videoUrl"
            scrolling="no"
            border="0"
            frameborder="no"
            framespacing="0"
            allowfullscreen="true"
            width="1260px"
            height="800px"
          >
          </iframe>
        </div>
        <div></div>
      </div>
    </div>
    <Bottom />
  </div>
</template>

<script>
import Navigation from "./public/Navigation.vue";
import Bottom from "./homePage/Bottom.vue";
import { getStore } from "@/utils/storage";
import date from "date-and-time";

export default {
  components: {
    Navigation,
    Bottom,
  },
  data() {
    return {
      title: "",
      videoUrl: "",
      imgUrl: "",
      author: "",
      price: "",
      courseList: [],
    };
  },
  async created() {
    await this.getCourseData();
    await this.addHistory();
    await this.getMyCourse();
  },
  methods: {
    async getCourseData() {
      try {
        let res = await this.$axios.get(
          `/goods/courseDetail?courseId=${this.$route.query.courseId}`
        );
        let { goods_name, goods_url, goods_img, goods_author, goods_price } =
          res.data;
        this.title = goods_name;
        this.videoUrl = goods_url;
        this.imgUrl = goods_img;
        this.author = goods_author;
        this.price = goods_price;
      } catch (error) {
        console.log(error);
      }
    },
    async addHistory() {
      try {
        let now = new Date();
        let time = date.format(now, "YYYY/MM/DD HH:mm:ss");
        let account = getStore("account");
        await this.$axios.post("/users/addHistory", {
          account: account,
          historyList: {
            id: this.$route.query.courseId,
            time: time,
            imgUrl: this.imgUrl,
            title: this.title,
            author: this.author,
          },
        });
        let res = await this.$axios.post();
        let { goods_name, goods_url } = res.data;
        this.title = goods_name;
        this.videoUrl = goods_url;
      } catch (error) {
        console.log(error);
      }
    },
    toCourseOrder() {
      this.$router.push(`/courseOrder?courseId=${this.$route.query.courseId}`);
    },
    async getMyCourse() {
      let account = getStore("account");
      let res = await this.$axios.get(`/users/myCourse?account=${account}`);
      this.courseList = JSON.parse(res.data.courseList);
    },
  },
  computed: {
    payShow() {
      let inMyCourse = this.courseList.some((course) => {
        return course.title === this.title;
      });
      let isPrice = this.price !== "0.00";
      return isPrice && !inMyCourse;
    },
  },
};
</script>

<style lang="scss" scoped>
#course {
  .course-page {
    background-color: #f7f7f7;
    padding-bottom: 100px;
    .course-bar {
      width: 1260px;
      margin: 0 auto;
      .video-bar {
        position: relative;
        .pay-back {
          position: absolute;
          background-color: #3b3b3b;
          width: 1260px;
          height: 800px;
        }
        .pay-bar {
          position: absolute;
          left: 30%;
          top: 30%;
          width: 540px;
          height: 300px;
          background-color: #242424;
          position: absolute;
          box-sizing: border-box;
          font-size: 14px;
          color: #999;
          .pay-info {
            text-align: center;
            font-size: 18px;
            color: #fff;
            font-weight: 700;
            border-bottom: 1px solid #333;
            padding: 40px 0;
            margin: 40px 0;
          }
          .pay-btn {
            cursor: pointer;
            margin: 0 auto;
            width: 260px;
            height: 40px;
            border-radius: 20px;
            background-image: -webkit-linear-gradient(
              0deg,
              #ffdf89 0,
              #f2ca5b 100%
            );
            background-image: linear-gradient(90deg, #ffdf89 0, #f2ca5b 100%);
            text-align: center;
            line-height: 40px;
            color: #663d00;
            font-size: 15px;
            font-weight: 700;
          }
        }
      }
      .title-bar {
        height: 26px;
        font-size: 18px;
        margin-bottom: 8px;
        padding-top: 30px;
      }
    }
  }
}
</style>