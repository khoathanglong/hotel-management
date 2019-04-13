<template>
  <div class="checkinGuests">
    <div class="checkinGuests--alignLeft">Danh sách khách</div>
    <div
      class="checkinGuests--alignLeft"
      v-if="$route.fullPath.includes('check-in')"
    >
      <el-button
        type="primary"
        @click="$emit('ClickAddButton')"
        :disabled="guestsList.length >= maxGuests"
        style="margin-right: 10px;"
        >Thêm khách</el-button
      >
      <span style="font-weight: normal; font-size: 12px; font-style: italic;"
        >(Số khách tối đa: {{ maxGuests }})</span
      >
    </div>
    <el-table :data="tableData">
      <el-table-column prop="sequence" label="#"></el-table-column>
      <el-table-column prop="fullName" label="Họ tên"></el-table-column>
      <el-table-column
        class="hidden-xs-only"
        prop="idNo"
        label="ID"
      ></el-table-column>
      <el-table-column prop="roomNo" label="Số phòng"></el-table-column>
      <el-table-column
        class-name="icons"
        label="Sửa/Xóa"
        align="center"
        v-if="$route.fullPath.includes('check-in')"
      >
        <template slot-scope="scope">
          <i class="el-icon-edit" @click="$emit('EditGuest', scope.$index)"></i>
          <i
            class="el-icon-delete"
            @click="$emit('DeleteGuest', scope.$index)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    guestsList: {
      type: Array,
      default: () => []
    },
    maxGuests: {
      type: Number,
      default: 0
    }
  },
  computed: {
    tableData() {
      return this.guestsList.map(each => ({
        ...each,
        sequence: each.sequence + 1
      }));
    }
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

  .el-table {
    &__body-wrapper {
      table {
        tbody {
          .el-table__row {
            .icons {
              .cell {
                i {
                  cursor: pointer;

                  &.el-icon-edit {
                    margin-right: 10px;
                  }

                  &.el-icon-delete {
                    margin-left: 10px;
                    color: red;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
