<template>
  <el-container id="app">
    <el-header>
      <the-nav-bar />
    </el-header>
    <el-main>
      <router-view :key="$route.fullPath"></router-view>
    </el-main>
  </el-container>
</template>

<script>
import { db } from "@/firebase.js";
import TheNavBar from "@/components/TheNavBar";

export default {
  name: "app",
  components: { TheNavBar },
  created() {
    this.$store.dispatch("getRoomsData", db.collection("rooms"));
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
