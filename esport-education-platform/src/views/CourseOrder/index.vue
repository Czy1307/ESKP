<template>
  <div id="course-order">
    <Navigation />
    <div class="order-page">
      <div class="order-bar">
        <div class="order-title">
          <div class="confirm-order">确认订单信息</div>
          <div class="pay-tip">
            请在30分钟内完成支付！超出时间后，需重新下单
          </div>
        </div>
        <div class="main-bar">
          <div class="order-main">
            <div class="buy-course">购买课程</div>
            <div class="course-info">
              <img :src="imgUrl" alt="" />
              <div class="course-title">
                {{ title }}
              </div>
              <div class="course-price">￥{{ price }}</div>
            </div>
          </div>
          <div class="pay-bar">
            <div class="type-title">支付方式</div>
            <div class="pay-type">
              <span class="dot"></span>
              <el-radio
                class="pay-radio"
                v-model="radio"
                label="1"
                size="medium"
              >
                <img src="@/assets/img/icon/pay-zfb.png" alt="" />
                <span> 支付宝 </span></el-radio
              >
              <el-radio class="pay-radio" size="small" v-model="radio" label="2"
                ><img src="@/assets/img/icon/pay-wechat.png" alt="" />
                <span> 微信 </span></el-radio
              >
            </div>
            <div class="pay-bottom">
              <div class="real-pay">
                实付金额：
                <div class="pay-num">￥ {{ price }}</div>
              </div>
              <el-checkbox class="checkbox" v-model="checked"
                >我已同意《电子竞技知识平台ESKP用户付费协议》</el-checkbox
              >
              <div class="pay-btn" @click="toCourseDetail">立即支付</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Bottom />
  </div>
</template>

<script>
import { getStore } from "@/utils/storage";

export default {
  data() {
    return {
      radio: "1",
      checked: true,
      price: "",
      imgUrl: "",
      title: "",
    };
  },
  created() {
    this.getCourseData();
  },
  methods: {
    async getCourseData() {
      try {
        let res = await this.$axios.get(
          `/goods/courseDetail?courseId=${this.$route.query.courseId}`
        );
        let { goods_name, goods_img, goods_price } = res.data;
        this.title = goods_name;
        this.imgUrl = goods_img;
        this.price = goods_price;
      } catch (error) {
        console.log(error);
      }
    },
    async toCourseDetail() {
      this.$message({
        message: "购买课程成功",
        type: "success",
      });
      try {
        let account = getStore("account");
        await this.$axios.post("/users/addCourse", {
          account: account,
          courseList: {
            id: this.$route.query.courseId,
            title: this.title,
            imgUrl: this.imgUrl,
          },
        });
      } catch (error) {
        console.log(error);
      }
      this.$router.push(`/courseDetail?courseId=${this.$route.query.courseId}`);
    },
  },
};
</script>

<style lang="scss" scoped>
#course-order {
  .order-page {
    background-color: #f7f7f7;
    padding-bottom: 70px;
    .order-bar {
      width: 1260px;
      margin: 0 auto;
      .order-title {
        padding-top: 30px;
        height: 94px;
        .confirm-order {
          font-size: 24px;
          color: #333333;
          margin-bottom: 10px;
          font-weight: bolder;
        }
        .pay-tip {
          font-size: 14px;
          color: #666666;
        }
      }
      .main-bar {
        background: #fff;
        height: 700px;
        padding: 50px;
        .order-main {
          height: 300px;
          margin-bottom: 30px;
          .buy-course {
            font-size: 20px;
            color: #333333;
            font-weight: bold;
            margin-bottom: 30px;
          }
          .course-info {
            background-color: #f8fcff;
            margin-top: 50px;
            position: relative;
            padding: 30px;
            font-size: 18px;
            img {
              height: 150px;
              width: 250px;
              margin-right: 40px;
            }
            .course-title {
              line-height: 210px;
              position: absolute;
              left: 350px;
              top: 0;
            }
            .course-price {
              line-height: 210px;
              position: absolute;
              right: 100px;
              top: 0;
              color: #ff7a3e;
              font-weight: bold;
            }
          }
        }
        .pay-bar {
          .type-title {
            font-size: 20px;
            color: #333333;
            font-weight: bold;
            margin-bottom: 30px;
          }
          .pay-type {
            .pay-radio {
              width: 1200px;
              margin: 10px 0;
              img {
                height: 35px;
                margin: 0 20px;
              }
              span {
                font-size: 15px;
              }
            }
          }
          .pay-bottom {
            height: 300px;
            position: relative;
            text-align: right;
            margin-top: 50px;
            .real-pay {
              font-size: 18px;
              color: #333;
              margin: 10px 0;
              .pay-num {
                display: inline-block;
                margin-left: 3px;
                color: #ff7a3e;
                font-size: 20px;
                font-weight: bold;
              }
            }
            .pay-btn {
              width: 192px;
              height: 48px;
              line-height: 48px;
              top: 50px;
              right: 0;
              margin-top: 15px;
              font-size: 18px;
              -webkit-border-radius: 24px;
              border-radius: 24px;
              text-align: center;
              color: #fff;
              background: #00cc7e;
              cursor: pointer;
              font-weight: bold;
              position: absolute;
            }
            .checkbox {
              float: right;
            }
          }
        }
      }
    }
  }
}
</style>