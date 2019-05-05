<template>
  <el-card class="roomTable">
    <div slot="header" style="text-align: left;">
      <span style="font-weight: bold; font-size: 24px;">
        DANH SÁCH PHÒNG
      </span>
    </div>
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
        ></el-input>
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
      <el-table-column sortable prop="roomType" label="Loại"></el-table-column>
      <el-table-column
        sortable
        prop="checkinTime"
        label="Nhận phòng"
        width="200px"
      ></el-table-column>
      <el-table-column
        sortable
        prop="checkoutTime"
        label="Trả phòng"
        width="200px"
      ></el-table-column>
      <el-table-column
        sortable
        prop="dailyPrice"
        label="Qua đêm"
      ></el-table-column>
      <el-table-column
        sortable
        prop="firstHourPrice"
        label="Giờ đầu"
      ></el-table-column>
      <el-table-column
        sortable
        prop="secondHourPrice"
        label="Giờ kế"
      ></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { db } from "@/firebase";
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
      this.$emit("OpenForm", room);
    },

    handleBooking() {}
  },
  created() {
    this.$store.dispatch("getRoomsData", db.collection("rooms"));
  }
};
</script>

<style lang="scss">
.roomTable {
  td {
    cursor: pointer;
  }
  .cell {
    padding: 0 !important;
  }
  .el-card {
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
