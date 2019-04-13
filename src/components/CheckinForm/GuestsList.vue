<template>
  <div class="checkinGuests">
    <div class="checkinGuests--alignLeft">Danh Sách Khách</div>
    <div class="checkinGuests--alignLeft">
      <el-button type="primary" @click="$emit('ClickAddButton')"
        >Thêm khách</el-button
      >
    </div>
    <el-table :data="tableData">
      <el-table-column prop="sequence" label="#"></el-table-column>
      <el-table-column prop="fullName" label="Họ tên"></el-table-column>
      <el-table-column
        class="hidden-xs-only"
        prop="idNo"
        label="CMND/Passport"
      ></el-table-column>
      <el-table-column prop="roomNo" label="Số phòng"></el-table-column>
      <el-table-column class-name="icons">
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
                text-align: center;

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
