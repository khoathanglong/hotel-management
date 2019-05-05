<template>
  <el-card class="guestForm" shadow="never">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12">
        <div class="header">Chọn phòng</div>
        <el-select
          v-model="localSelectedRooms"
          multiple
          collapse-tags
          filterable
          placeholder="Chọn phòng"
          style="width: 100%;"
        >
          <el-option-group
            v-for="group in availableRooms"
            :key="group.id"
            :label="group.label"
          >
            <el-option
              v-for="item in group.children"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-option-group>
        </el-select>
      </el-col>
      <el-col :xs="24" :sm="12">
        <div class="header">Giờ trả phòng</div>
        <el-date-picker
          v-model="time"
          type="datetime"
          placeholder="Chọn ngày và giờ"
          style="width: 100%;"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    selectedRooms: {
      type: Array,
      default: () => []
    },
    checkoutDateTime: {
      type: Date,
      default: null
    },
    availableRooms: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      pickerOptions: {
        disabledDate: date => {
          const disabledDate = new Date(date);
          const currentDate = new Date();
          return (
            disabledDate.getTime() < currentDate.getTime() - 60 * 60 * 24 * 1000
          );
        }
      }
    };
  },
  computed: {
    time: {
      get() {
        return this.checkoutDateTime;
      },
      set(value) {
        this.$emit("SetCheckoutDateTime", value);
      }
    },
    localSelectedRooms: {
      get() {
        return this.selectedRooms;
      },
      set(value) {
        this.$emit("SelectRooms", value);
      }
    }
  }
};
</script>

<style lang="scss">
.guestForm {
  border: none !important;
  .el-card {
    &__body {
      padding: 0;
      &--roomSelection {
        text-align: left !important;
        span {
          padding-right: 10px;
        }
        margin-bottom: 20px;
      }
      .el-row {
        .el-col {
          text-align: left;
          margin-bottom: 15px;
        }
        .header {
          text-align: left;
          padding-bottom: 2px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
