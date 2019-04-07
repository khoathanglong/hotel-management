<template>
  <el-card class="guessForm">
    <div slot="header" class="clearfix">
      {{ title }}
    </div>
    <!-- <div class="el-card__body--roomSelection">
      <div class="header">Loại phòng</div>
      <el-tree
        :data="availableRooms"
        show-checkbox
        node-key="id"
        :default-checked-keys="[101]"
        :default-expanded-keys="[101]"
        @check-change="handleCheckChanged"
        :getCheckedKeys="true"
        ref="tree"
      >
      </el-tree>
    </div> -->
    <el-row>
      <el-col :xs="12" :sm="8">
        <div class="header">Loại phòng</div>
        <el-tree
          :data="availableRooms"
          show-checkbox
          node-key="id"
          :default-checked-keys="[101]"
          :default-expanded-keys="[101]"
          @check-change="handleCheckChanged"
          :getCheckedKeys="true"
          ref="tree"
        >
        </el-tree>
      </el-col>
      <el-col :xs="12" :sm="8">
        <div class="header">Tổng số khách</div>
        <el-input-number
          v-model="numberOfGuests"
          controls-position="right"
          :min="1"
          :max="6"
        ></el-input-number>
      </el-col>

      <el-col :xs="12" :sm="8">
        <div class="header">Giờ trả phòng</div>
        <el-date-picker
          v-model="time"
          type="datetime"
          placeholder="Chọn ngày và giờ"
        >
        </el-date-picker>
      </el-col>
    </el-row>

    <CheckinGuests />
  </el-card>
</template>

<script>
import CheckinGuests from "./CheckinGuests.vue";
export default {
  components: {
    CheckinGuests
  },
  props: {
    title: {
      type: String,
      default: "Check in"
    }
  },
  data() {
    return {
      time: "",
      numberOfGuests: 1,
      availableRooms: [
        {
          id: 1,
          label: "Superior",
          children: [
            {
              id: 101,
              label: 101
            },
            {
              id: 102,
              label: 102
            }
          ]
        },
        {
          id: 2,
          label: "Standard",
          children: [
            {
              id: 201,
              label: 201
            },
            {
              id: 202,
              label: 202
            }
          ]
        }
      ],
      selectedRooms: []
    };
  },
  methods: {
    handleCheckChanged() {
      const checkedNodes = this.$refs.tree.getCheckedKeys();
      // getCheckedKeys return both parent and children node
      // filter to get only children checked
      this.selectedRooms = checkedNodes.filter(each => each > 10);
      // each tree node parent has value id under 10
    }
  },
  mounted() {
    this.handleCheckChanged();
  }
};
</script>

<style lang="scss" scoped>
.guessForm {
  .el-card {
    &__header {
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
