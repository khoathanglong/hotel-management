<template>
  <el-card class="revenue">
    <div slot="header" style="text-align: left;">
      <span style="font-weight: bold; font-size: 24px;">
        DOANH THU
      </span>
    </div>

    <el-row :gutter="10">
      <el-col :xs="24" :sm="16">
        <el-date-picker
          v-model="sortBy.dateTimeRange"
          type="datetimerange"
          range-separator="Đến"
          start-placeholder="Bắt đầu"
          end-placeholder="Kết thúc"
          style="width: 100%"
          :picker-options="customPickerOptions"
        />
      </el-col>
      <el-col :xs="24" :sm="8">
        <el-select
          v-model="sortBy.roomNo"
          placeholder="Số phòng"
          clearable
          filterable
        >
          <el-option
            v-for="room in roomList"
            :key="room"
            :value="room.value"
            :label="room.label"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-alert :title="alertTitle" type="success" center :closable="false" />

    <el-table :data="revenueData" striped>
      <el-table-column prop="date" label="Thời gian" />
      <el-table-column prop="roomNo" label="Số phòng" />
      <el-table-column prop="total" label="Tổng hóa đơn" align="right">
        <template slot-scope="scope">
          <span>{{ scope.row.total.toLocaleString() }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      sortBy: {
        dateTimeRange: null,
        roomNo: null
      },
      revenueData: [
        // {
        //   date, roomNo, total
        // }
      ],
      customPickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  computed: {
    roomList() {
      return this.$store.state.rooms.map(each => ({
        label: `Phòng ${each.roomNo}`,
        value: each.roomNo
      }));
    },
    totalRevenue() {
      return this.revenueData.length
        ? this.revenueData.reduce((total, nextVal) => total + nextVal)
        : 0;
    },
    alertTitle() {
      return `TỔNG DOANH THU: ${this.totalRevenue.toLocaleString()} VNĐ`;
    }
  }
};
</script>

<style lang="scss">
.revenue {
  .el-alert {
    font-weight: bold;
    margin: 20px 0;

    &__content {
      padding: 5px 0;

      span {
        font-size: 16px;
      }
    }
  }

  .el-select {
    width: 100%;
  }
}
</style>
