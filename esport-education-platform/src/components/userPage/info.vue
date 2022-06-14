<template>
  <div id="user-info">
    <el-descriptions class="margin-top" title="个人信息" :column="2" border>
      <template slot="extra">
        <el-button type="primary" size="small" @click="editInfo"
          >修改信息</el-button
        >
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          昵称
        </template>
        <el-input v-model="userInfo.name" :disabled="modifyInfo"> </el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          用户名
        </template>
        {{ userInfo.account }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          手机号
        </template>
        <el-input v-model="userInfo.phone" :disabled="modifyInfo"> </el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          邮箱地址
        </template>
        <el-input v-model="userInfo.email" :disabled="modifyInfo"> </el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          用户类型
        </template>
        <el-input v-model="userInfo.type" :disabled="modifyInfo"> </el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          性别
        </template>
        <el-input v-model="userInfo.sex" :disabled="modifyInfo"> </el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          出生日期
        </template>
        <el-input v-model="userInfo.birthday" :disabled="modifyInfo">
        </el-input>
      </el-descriptions-item>
    </el-descriptions>
    <el-button
      v-show="!modifyInfo"
      type="primary"
      size="small"
      class="save-btn"
      @click="saveEdit"
      >保存修改</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      modifyInfo: true,
    };
  },
  async created() {
    try {
      let res = await this.$axios.get(
        `/users/info?account=${this.$route.query.account}`
      );
      this.userInfo = res.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    editInfo() {
      this.modifyInfo = false;
    },
    async saveEdit() {
      this.modifyInfo = true;
      await this.$axios.patch("/users/changeInfo", {
        account: this.userInfo.account,
        name: this.userInfo.name,
        phone: this.userInfo.phone,
        email: this.userInfo.email,
        type: this.userInfo.type,
        sex: this.userInfo.sex,
        birthday: this.userInfo.birthday,
      });
      this.$message({
        message: "修改信息成功",
        type: "success",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#user-info {
  .save-btn {
    float: right;
    margin-top: 20px;
  }
}
</style>