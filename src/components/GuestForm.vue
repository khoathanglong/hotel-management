<template>
  <el-card class="guessForm">
    <div slot="header" class="clearfix">
      {{ title }}
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Đặt phòng"
    }
  }
};
</script>

<style lang="scss" scoped>
.guessForm {
  .el-card {
    &__header {
      .clearfix {
        text-align: left !important;
        font-weight: bold !important;
      }
    }
  }
}
</style>
