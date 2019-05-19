<template>
  <el-dialog
    :visible="show"
    @close="closeDialog"
    :title="title"
    width="80%"
    class="service-dialog"
  >
    <div class="add-service">
      <el-row :gutter="10">
        <el-col :md="3" :sm="4" :xs="8">
          <label class="input-label">Tên dịch vụ:</label>
        </el-col>
        <el-col :md="9" :sm="8" :xs="16">
          <el-select v-model="form.name" placeholder="Chọn dịch vụ">
            <el-option
              v-for="service in serviceList"
              :key="service.itemId"
              :value="service.name"
              :name="service.name"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :md="3" :sm="4" :xs="8">
          <label class="input-label">{{ quantityLabel }}</label>
        </el-col>
        <el-col :md="9" :sm="8" :xs="16">
          <el-input v-model.number="form.quantity" type="number"></el-input>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :md="3" :sm="4" :xs="8"><label>Đơn giá</label></el-col>
        <el-col :md="9" :sm="8" :xs="16">
          <span>{{ selectedUnitPrice.toLocaleString() }}</span>
        </el-col>

        <el-col :md="3" :sm="4" :xs="8"><label>Thành tiền</label></el-col>
        <el-col :md="9" :sm="8" :xs="16">
          <span>
            {{ (selectedUnitPrice * form.quantity).toLocaleString() }}</span
          >
        </el-col>
      </el-row>

      <el-button
        type="primary"
        :disabled="!form.name || !form.quantity"
        @click="addService"
        >Thêm</el-button
      >
    </div>

    <el-table :data="selectedRoomData">
      <el-table-column prop="name" label="Tên dịch vụ" />
      <el-table-column prop="quantity" label="Số lượng">
        <template slot-scope="scope">
          {{ scope.row.quantity.toLocaleString() }} {{ scope.row.unit }}
        </template>
      </el-table-column>
      <el-table-column prop="unitPrice" label="Đơn giá" align="right">
        <template slot-scope="scope">
          {{ scope.row.unitPrice.toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column prop="subTotal" label="Thành tiền" align="right">
        <template slot-scope="scope">
          {{ scope.row.subTotal.toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="Xóa" align="center">
        <template slot-scope="scope">
          <i
            class="el-icon-delete"
            @click="deleteService(scope.row)"
            style="color: red"
          ></i>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
import { rooms } from "@/firebase";
export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      form: {
        name: null,
        quantity: null
      },
      serviceList: this.$store.state.services
    };
  },
  computed: {
    ...mapState(["selectedRoom"]),
    title() {
      return this.selectedRoom ? `Thêm dịch vụ phòng ${this.selectedRoom}` : "";
    },
    quantityLabel() {
      return this.form.name
        ? `Số lượng (${
            this.serviceList.find(each => each.name === this.form.name).unit
          })`
        : "Số lượng";
    },
    selectedUnitPrice() {
      return this.form.name
        ? this.serviceList.find(each => each.name === this.form.name).unitPrice
        : 0;
    },
    selectedRoomData() {
      const selectedRoomData = this.$store.state.rooms.find(
        room => room.roomNo == this.selectedRoom
      );
      return selectedRoomData ? selectedRoomData.extraServices : [];
    }
  },
  methods: {
    addService() {
      const extraServices = this.selectedRoomData;
      extraServices.push({ ...this.form, updatedAt: Date.now() });
      rooms.doc(this.selectedRoom.toString()).update({
        extraServices: extraServices
      });
      this.form = {
        name: null,
        quantity: null
      };
    },
    deleteService(item) {
      console.log(item);
    },
    closeDialog() {
      this.$emit("CloseAddServiceDialog");
    }
  }
};
</script>

<style lang="scss">
.service-dialog {
  .add-service {
    text-align: left;

    .el-select {
      width: 100%;
    }

    .el-button {
      margin: 10px 0;
    }

    label {
      font-weight: bold;

      &.input-label {
        line-height: 40px;
      }
    }

    .el-col {
      margin: 10px 0;
    }
  }

  .el-icon-delete {
    cursor: pointer;
  }
}
</style>
