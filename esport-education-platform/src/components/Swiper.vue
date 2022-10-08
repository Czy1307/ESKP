<template>
  <div id="top-bar">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="@/assets/img/swiper/lol.png" alt="" />
        </div>
        <div class="swiper-slide">
          <img src="@/assets/img/swiper/pubg.png" alt="" />
        </div>
        <div class="swiper-slide">
          <img src="@/assets/img/swiper/wzry.png" alt="" />
        </div>
        <div class="swiper-slide">
          <img src="@/assets/img/swiper/csgo.png" alt="" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <!-- <div class="user-bar">个人信息</div> -->
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  name: "Swiper",
  data() {
    return {};
  },
  mounted() {
    new Swiper(".swiper-container", {
      autoplay: true,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      },
    });
  },
};
</script>

<style lang="scss" scoped>
#top-bar {
  position: relative;
  z-index: 0;
  padding-top: 20px;
  .swiper-container {
    height: 600px;
    width: 1000px;
    .swiper-wrapper {
      .swiper-slide {
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
  // .user-bar {
  //   height: 400px;
  //   width: 300px;
  //   background-color: #fff;
  //   position: absolute;
  //   right: -50px;
  //   top: 0;
  // }
}
</style>