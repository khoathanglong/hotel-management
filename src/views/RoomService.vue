<template>
  <el-card class="room-service">
    <div slot="header" style="text-align: left;">
      <span style="font-weight: bold; font-size: 24px;">
        QUẢN LÝ DỊCH VỤ PHÒNG
      </span>
    </div>

    <el-button type="primary" @click="addService" style="float: left">
      Thêm dịch vụ
    </el-button>

    <service-table
      :services="serviceList"
      @EditService="onEditService"
      @DeleteService="onDeleteService"
    />

    <el-dialog :visible.sync="dialogVisible" title="Thông tin dịch vụ">
      <service-form
        @SaveServiceInfo="onSaveServiceInfo"
        v-if="dialogVisible"
        :selectedServiceIndex="this.selectedServiceIndex"
      />
    </el-dialog>
  </el-card>
</template>

<script>
import ServiceTable from "@/components/RoomService/ServiceTable";
import ServiceForm from "@/components/RoomService/ServiceForm";
import { db } from "@/firebase";
export default {
  components: { ServiceTable, ServiceForm },
  data() {
    return {
      serviceList: this.$store.state.services,
      dialogVisible: false,
      selectedServiceIndex: null
    };
  },
  methods: {
    addService() {
      this.selectedServiceIndex = this.serviceList.length;
      this.dialogVisible = true;
    },
    onEditService(index) {
      this.selectedServiceIndex = index;
      this.dialogVisible = true;
    },
    onDeleteService(index) {
      const deletedItemId = this.serviceList[index].itemId;
      db.collection("services")
        .doc(deletedItemId)
        .delete();
    },
    onSaveServiceInfo(serviceInfo) {
      const services = db.collection("services");
      console.log(serviceInfo);
      services.doc(serviceInfo.itemId).set(serviceInfo);
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
