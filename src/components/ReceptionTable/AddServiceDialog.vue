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
              :key="service.label"
              :label="service.label"
              :value="service.value"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :md="3" :sm="4" :xs="8">
          <label class="input-label">{{ quantityLabel }}</label>
        </el-col>
        <el-col :md="9" :sm="8" :xs="16">
          <el-input v-model="form.quantity" type="number"></el-input>
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

    <el-table :data="tableData">
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
      serviceList: [
        // {
        //   label: "Service name",
        //   value: "service1",
        //   unit: "kg",
        //   unitPrice: 10000
        // }
      ],
      tableData: [
        // {
        //   name: "mi bo",
        //   quantity: 1,
        //   unit: "cai",
        //   unitPrice: 10000,
        //   subTotal: 10000
        // }
      ]
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
            this.serviceList.find(each => each.value === this.form.name).unit
          })`
        : "Số lượng";
    },
    selectedUnitPrice() {
      return this.form.name
        ? this.serviceList.find(each => each.value === this.form.name).unitPrice
        : 0;
    }
  },
  methods: {
    resetLocalData() {
      this.form = {
        name: null,
        quantity: null
      };
      this.tableData = [];
      this.serviceList = [];
    },
    addService() {
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
      this.resetLocalData();
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
