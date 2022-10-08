<template>
  <div id="home-bottom">
    <div class="logo-bar">
      <img src="@/assets/logo.png" alt="" />
      <div class="logo-dsc">
        关于电子竞技知识的专业平台，提供大量免费的电竞教学课程。
      </div>
    </div>
    <div class="about-us">
      <div>关于我们</div>
      <ul class="about-bar">
        <li>关于我们</li>
        <li>学校云</li>
        <li>联系我们</li>
        <li>常见问题</li>
        <li>常见反馈</li>
        <li>法律条款</li>
      </ul>
    </div>
    <div class="follow-us">
      <div class="follow-title">关注我们</div>
      <img src="@/assets/img/icon/wechat.png" alt="" />
      <img src="@/assets/img/icon/weibo.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Bottom",
};
</script>

<style lang="scss" scoped>
#home-bottom {
  background-color: #272727;
  height: 210px;
  position: relative;
  .logo-bar {
    top: 30px;
    width: 600px;
    color: #999999;
    font-size: 16px;
    position: absolute;
    left: 25%;
    img {
      width: 400px;
    }
    .logo-dsc {
      margin-top: 15px;
    }
  }
  .about-us {
    position: absolute;
    right: 40%;
    color: #cccccc;
    top: 30px;
    .about-bar {
      margin-top: 20px;
      width: 150px;
      height: 100px;
      li {
        float: left;
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
      }
    }
  }
  .follow-us {
    position: absolute;
    right: 30%;
    top: 30px;
    .follow-title {
      margin-bottom: 10px;
      color: #cccccc;
    }
    img {
      width: 50px;
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
</style>