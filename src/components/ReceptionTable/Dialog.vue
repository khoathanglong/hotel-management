<template>
  <el-dialog :visible="show" @close="$emit('CloseDialog')" :title="title">
    <div style="margin-bottom: 10px;">
      <el-button @click="$emit('TriggerAddService')">Thêm dịch vụ</el-button>
      <el-button type="primary" @click="$router.push('/checkout')"
        >Checkout</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    show: Boolean
  },
  computed: {
    ...mapState(["selectedRoom"]),
    title() {
      return this.selectedRoom ? `Phòng ${this.selectedRoom}` : "";
    }
  }
};
</script>

<style></style>
