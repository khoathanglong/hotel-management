<template>
  <el-card class="guestForm" shadow="never">
    <div slot="header" class="clearfix">{{ title }}</div>
    <el-row :gutter="20">
      <el-col :xs="12" :sm="8">
        <div class="header">Chọn phòng</div>
        <el-select
          v-model="localSelectedRooms"
          multiple
          collapse-tags
          filterable
          placeholder="Chọn phòng"
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
      <el-col :xs="12" :sm="8">
        <div class="header">Giờ trả phòng</div>
        <el-date-picker
          v-model="time"
          type="datetime"
          placeholder="Chọn ngày và giờ"
        ></el-date-picker>
      </el-col>
      <el-col :xs="12" :sm="8">
        <div class="header">Tổng số khách</div>
        <el-input-number
          v-model="numberOfGuests"
          controls-position="right"
          :min="0"
          :max="6"
        ></el-input-number>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Check in"
    },
    selectedRooms: {
      type: Array,
      default: () => []
    },
    selectedRoomTypes: {
      type: Array,
      default: () => [1]
    },
    checkoutDateTime: {
      type: Date,
      default: null
    },
    totalGuests: {
      type: Number,
      default: 1
    },
    availableRooms: {
      type: Array,
      default: () => []
    }
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
    numberOfGuests: {
      get() {
        return this.totalGuests;
      },
      set(value) {
        this.$emit("SetTotalGuests", value);
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
    &__header {
      padding: 0 !important;
      .clearfix {
        text-align: left !important;
        font-weight: bold !important;
        font-size: 2em;
      }
    }
    &__body {
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
