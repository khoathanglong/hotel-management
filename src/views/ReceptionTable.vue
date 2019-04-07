<template>
  <div class="receptionTable">
    <RoomList @openCheckinForm="onOpenCheckinForm" />
  </div>
</template>

<script>
// @ is an alias to /src
import RoomList from "@/components/RoomList/RoomList.vue";
export default {
  components: {
    RoomList
  },
  methods: {
    onOpenCheckinForm(row) {
      this.$router.push(`/check-in/${row.roomNo}`);
    }
  }
};
</script>

<style lang="scss">
.receptionTable {
  .el-dialog__body {
    padding: 10px !important;
  }
}
</style>
