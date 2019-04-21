<template>
  <el-container id="app">
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import { db } from "@/firebase.js";

export default {
  name: "app",
  components: {},
  created() {
    this.$store.dispatch("getRoomsData", db.collection("rooms"));
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
