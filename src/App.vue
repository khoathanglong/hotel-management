<template>
  <el-container id="app">
    <el-header v-show="!$route.path.includes('sign')">
      <the-nav-bar />
    </el-header>
    <el-main>
      <router-view :key="$route.fullPath"></router-view>
    </el-main>
  </el-container>
</template>

<script>
import TheNavBar from "@/components/TheNavBar";
import { db } from "@/firebase";
export default {
  name: "app",
  components: { TheNavBar },
  mounted() {
    this.$store.dispatch("getServices", db.collection("services"));
  }
};
</script>

<style lang="scss">
@media (max-width: 768px) {
  body {
    margin-left: 0 !important;
    margin-right: 0 !important;
    .el-main {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@media screen and (max-width: 784px) {
  .el-dialog {
    width: 80% !important;
  }
}

@media screen and (max-width: 488px) {
  .el-dialog {
    width: 100% !important;
  }
}
</style>
