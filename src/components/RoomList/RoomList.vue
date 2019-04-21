<template>
  <el-card class="roomTable">
    <div slot="header" class="clearfix">Danh sách phòng</div>
    <el-row class="filterButtons">
      <el-col :md="4" :sm="24">
        <el-radio v-model="filteredRadio" label="all">Tất cả</el-radio>
      </el-col>
      <el-col :md="5" :sm="24">
        <el-radio v-model="filteredRadio" label="available"
          >Đang trống</el-radio
        >
      </el-col>
      <el-col :md="4" :sm="24">
        <el-radio v-model="filteredRadio" label="used">Đang sử dụng</el-radio>
      </el-col>
      <el-col class="roomFiltering" :md="{ span: 8, offset: 2 }" :sm="24">
        <el-input
          placeholder="Tìm kiếm theo số phòng"
          v-model.number="roomFiltered"
          maxlength="3"
          prefix-icon="el-icon-search"
        >
        </el-input>
      </el-col>
    </el-row>
    <el-button type="primary" @click="handleBooking">Đặt trước</el-button>
    <el-table
      :data="tableData ? tableData : []"
      stripe
      height="70vh"
      style="width:100%"
      @row-click="handleRowClick"
    >
      <el-table-column label="Phòng" sortable>
        <template slot-scope="scope">
          <i
            class="el-icon-circle-check"
            style="color: green;"
            v-show="scope.row.isAvailable"
          ></i>
          <i
            class="el-icon-warning"
            style="color: red;"
            v-show="!scope.row.isAvailable"
          ></i>
          <span style="margin-left: 10px">{{ scope.row.roomNo }}</span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="roomType"
        label="Loại Phòng"
      ></el-table-column>
      <el-table-column
        sortable
        prop="checkinTime"
        label="Nhận phòng"
      ></el-table-column>
      <el-table-column
        sortable
        prop="checkoutTime"
        label="Trả phòng"
      ></el-table-column>
      <el-table-column
        sortable
        prop="dailyPrice"
        label="Giá qua đêm"
      ></el-table-column>
      <el-table-column
        sortable
        prop="firstHourPrice"
        label="Giá giờ đầu"
      ></el-table-column>
      <el-table-column
        sortable
        prop="secondHourPrice"
        label="Giá giờ kế"
      ></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  props: {
    roomList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      filteredRadio: "all",
      roomFiltered: null
    };
  },
  computed: {
    tableData() {
      // combine filter here
      if (this.roomFiltered) {
        return this.roomList.filter(room => {
          return room.roomNo.toString().includes(this.roomFiltered.toString());
        });
      }
      if (this.filteredRadio === "all") return this.roomList;
      if (this.filteredRadio === "used")
        return this.roomList.filter(room => !room.isAvailable);
      return this.roomList.filter(room => room.isAvailable);
    }
  },
  methods: {
    handleRowClick(room) {
      if (!room.isAvailable) {
        this.$message({
          message: "Phòng " + room.roomNo + " đang có khách ở",
          type: "warning"
        });
        return;
      }
      this.$emit("openCheckinForm", room);
    },

    handleBooking() {}
  }
};
</script>

<style lang="scss">
.roomTable {
  .cell {
    padding: 0 !important;
  }
  .el-card {
    &__header {
      .clearfix {
        text-align: left;
        font-weight: bold;
        font-size: 2em;
      }
    }
    &__body {
      .el-button {
        float: left !important;
        padding: 5px 10px;
      }
      .el-table__header-wrapper {
        margin-top: 30px;
      }
      .el-row {
        margin-bottom: 15px;
        .el-col {
          text-align: left !important;
          label {
            line-height: 40px;
          }
          .el-input {
            vertical-align: middle !important;
          }
        }
      }
    }
  }
}
</style>
