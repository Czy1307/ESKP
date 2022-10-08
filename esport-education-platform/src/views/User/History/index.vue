<template>
  <div id="user-history">
    <div class="history-bar">
      <el-timeline v-for="history in userHistory" :key="history.time">
        <el-timeline-item :timestamp="history.time" placement="top">
          <el-card class="course-card">
            <div @click="toCourseDetail(history.id)">
              <div class="course-img">
                <img :src="history.imgUrl" alt="" />
              </div>
              <div class="course-info">
                <div class="info-title">{{ history.title }}</div>
                <div class="info-author">{{ history.author }}</div>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userHistory: [],
    };
  },
  async created() {
    try {
      let res = await this.$axios.get(
        `/users/history?account=${this.$route.query.account}`
      );
      this.userHistory = JSON.parse(res.data.historyList);
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
#user-history {
  padding: 0 130px;
  .history-bar {
    min-width: 830px;
    .course-card {
      cursor: pointer;
      height: 210px;
      .course-img {
        float: left;
        img {
          width: 300px;
        }
      }
      .course-info {
        padding: 5px;
        float: left;
        margin-left: 30px;
        width: 420px;
        line-height: 30px;
        .info-title {
          height: 100px;
          font-size: 22px;
          margin-bottom: 30px;
        }
        .info-author {
          height: 20px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>