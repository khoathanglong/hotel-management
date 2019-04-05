<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <RoomList msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import RoomList from "@/components/RoomList.vue";

export default {
  name: "home",
  components: {
    RoomList
  }
};
</script>
