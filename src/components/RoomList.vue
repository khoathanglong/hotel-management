<template>
  <el-card class="roomTable">
    <div slot="header" class="clearfix">
      Danh sách phòng
    </div>
    <el-row class="filterButtons" align="middle">
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
        <el-input placeholder="Tìm kiếm theo số phòng"></el-input>
      </el-col>
    </el-row>
    <el-button type="primary" @click="handeBooking">Đặt trước</el-button>
    <el-table
      :data="tableData"
      stripe
      style="width:100%"
      @row-click="handleRowClick"
    >
      <el-table-column label="Phòng">
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
      <el-table-column prop="roomType" label="Loại Phòng"></el-table-column>
      <el-table-column prop="checkinTime" label="Nhận phòng"></el-table-column>
      <el-table-column prop="checkoutTime" label="Trả phòng"></el-table-column>
      <el-table-column prop="unitPrice" label="Đơn giá"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      filteredRadio: "all",
      tableData: [
        {
          roomNo: 101,
          roomType: "Phòng đôi",
          checkinTime: "5/4/2019, 16:20",
          checkoutTime: "6/4/2019, 16:20",
          unitPrice: "500 000"
        }
      ]
    };
  },
  methods: {
    handleRowClick(row) {
      console.log(row);
    }
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
