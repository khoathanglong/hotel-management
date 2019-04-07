<template>
  <div class="checkinGuests">
    <div class="checkinGuests--alignLeft">Danh Sách Khách</div>
    <div class="checkinGuests--alignLeft">
      <el-button type="primary">Thêm khách</el-button>
    </div>
    <div>
      <el-table :data="tableData">
        <el-table-column prop="sequence" label="#"> </el-table-column>
        <el-table-column prop="name" label="Họ tên"> </el-table-column>
        <el-table-column prop="id" label="CMND/Passport"> </el-table-column>
        <el-table-column prop="room" label="Số phòng"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          sequence: 0,
          name: "JOHN DOE",
          id: 123123,
          room: 101
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.checkinGuests {
  &--alignLeft {
    text-align: left !important;
    font-weight: bold;
    margin: 15px 0;
    button {
      padding: 5px 10px;
    }
  }
}
</style>
