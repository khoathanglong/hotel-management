<template>
  <div class="receptionTable">
    <RoomList @openCheckinForm="displayDialog" />
    <el-dialog :visible.sync="dialogVisible" width="80%">
      <GuestForm />
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import RoomList from "@/components/RoomList/RoomList.vue";
import GuestForm from "@/components/GuestForm/GuestForm.vue";
export default {
  components: {
    RoomList,
    GuestForm
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    displayDialog(row) {
      console.log(row);
      this.dialogVisible = true;
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
