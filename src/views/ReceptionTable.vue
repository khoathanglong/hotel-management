<template>
  <div class="receptionTable">
    <RoomList @OpenForm="onOpenForm" :roomList="filteredRoomList" />
    <Dialog
      :show="dialogVisible"
      @CloseDialog="onCloseDialog"
      @TriggerAddService="onTriggerAddService"
    />
    <AddServiceDialog
      :show="showServiceDialog"
      @CloseAddServiceDialog="onCloseAddServiceDialog"
      v-if="showServiceDialog"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import RoomList from "@/components/ReceptionTable/RoomList.vue";
import Dialog from "@/components/ReceptionTable/Dialog.vue";
import AddServiceDialog from "@/components/ReceptionTable/AddServiceDialog.vue";
import { mapState, mapMutations } from "vuex";
import moment from "moment";
export default {
  components: {
    RoomList,
    Dialog,
    AddServiceDialog
  },
  data() {
    return {
      dialogVisible: false,
      showServiceDialog: false
    };
  },
  computed: {
    ...mapState(["rooms"]),
    filteredRoomList() {
      return (
        this.rooms &&
        this.rooms.map(each => {
          const {
            roomNo,
            roomType,
            checkinTime,
            checkoutTime,
            dailyPrice,
            lateCheckout,
            secondHourPrice,
            firstHourPrice,
            isAvailable
          } = each;
          return {
            roomNo,
            roomType,
            checkinTime:
              checkinTime && moment(checkinTime).format("DD-MM-YYYY h:mm:ss"),
            checkoutTime:
              checkoutTime && moment(checkoutTime).format("DD-MM-YYYY h:mm:ss"),
            dailyPrice,
            lateCheckout,
            secondHourPrice: secondHourPrice.toLocaleString(),
            firstHourPrice: firstHourPrice.toLocaleString(),
            isAvailable
          };
        })
      );
    }
  },
  methods: {
    ...mapMutations(["setSelectedRoom"]),
    onOpenForm(row) {
      this.setSelectedRoom(row.roomNo);
      if (row.isAvailable) {
        this.$router.push("/check-in");
      } else this.dialogVisible = true;
    },
    onCloseDialog() {
      this.dialogVisible = false;
    },
    onTriggerAddService() {
      this.dialogVisible = false;
      this.showServiceDialog = true;
    },
    onCloseAddServiceDialog() {
      this.showServiceDialog = false;
      this.setSelectedRoom(null);
    }
  }
};
</script>

<style lang="scss">
.receptionTable {
  .el-dialog__body {
    padding: 10px !important;
  }
}
</style>
