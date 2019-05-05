<template>
  <el-card class="room-service">
    <div slot="header" style="text-align: left;">
      <span style="font-weight: bold; font-size: 24px;">
        QUẢN LÝ DỊCH VỤ PHÒNG
      </span>
      <el-button
        style="float: right; padding: 3px 0"
        type="text"
        circle
        icon="el-icon-close"
        @click="$router.go(-1)"
      ></el-button>
    </div>

    <el-button type="primary" @click="addService" style="float: left">
      Thêm dịch vụ
    </el-button>

    <service-table
      :data="serviceList"
      @EditService="onEditService"
      @DeleteService="onDeleteService"
    />

    <el-dialog :visible.sync="dialogVisible" title="Thông tin dịch vụ">
      <service-form
        :form-data="formData"
        @SaveServiceInfo="onSaveServiceInfo"
      />
    </el-dialog>
  </el-card>
</template>

<script>
import ServiceTable from "@/components/RoomService/ServiceTable";
import ServiceForm from "@/components/RoomService/ServiceForm";

export default {
  components: { ServiceTable, ServiceForm },
  data() {
    return {
      serviceList: [
        {
          name: "Service 1",
          unit: "unit",
          unitPrice: 100000,
          isActive: true
        }
      ],
      dialogVisible: false,
      formData: {
        name: "",
        unit: "",
        unitPrice: 0,
        isActive: true
      },
      selectedServiceIndex: null
    };
  },
  methods: {
    addService() {
      this.selectedServiceIndex = this.serviceList.length;
      this.formData = {
        name: "",
        unit: "",
        unitPrice: 0,
        isActive: true
      };
      this.dialogVisible = true;
    },
    onEditService(index) {
      this.selectedServiceIndex = index;
      this.formData = { ...this.serviceList[index] };
      this.dialogVisible = true;
    },
    onDeleteService(index) {
      this.serviceList.splice(index, 1);
    },
    onSaveServiceInfo(serviceInfo) {
      const { name, unit, unitPrice, isActive } = serviceInfo;
      if (this.selectedServiceIndex === this.serviceList.length) {
        this.serviceList.push({});
      }
      this.serviceList[this.selectedServiceIndex].name = name;
      this.serviceList[this.selectedServiceIndex].unit = unit;
      this.serviceList[this.selectedServiceIndex].unitPrice = unitPrice;
      this.serviceList[this.selectedServiceIndex].isActive = isActive;
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss">
.room-service {
  .icons {
    .cell {
      i {
        cursor: pointer;

        &.el-icon-edit {
          margin-right: 5px;
        }

        &.el-icon-delete {
          margin-left: 5px;
          color: red;
        }
      }
    }
  }

  .el-dialog__body {
    padding-bottom: 5px;
  }
}
</style>
