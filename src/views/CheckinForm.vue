<template>
  <el-card class="checkin-form">
    <div slot="header" style="text-align: left;">
      <span style="font-weight: bold; font-size: 24px;">CHECKIN</span>
      <el-button
        style="float: right; padding: 3px 0"
        type="text"
        circle
        icon="el-icon-close"
        @click="$router.go(-1)"
        v-loading="loading"
        element-loading-text="Đang xử lý..."
      ></el-button>
    </div>
    <GeneralCheckinInfo
      :selected-rooms="selectedRooms"
      :checkout-date-time="checkoutDateTime"
      :available-rooms="availableRooms"
      @SetCheckoutDateTime="onSetCheckoutDateTime"
      @SelectRooms="onSelectRooms"
    />
    <GuestsList
      @ClickAddButton="onClickAddButton"
      @EditGuest="onEditGuest"
      @DeleteGuest="onDeleteGuest"
      :guests-list="guestsList"
      :max-guests="maxGuests"
    />
    <div class="buttons">
      <el-button @click="$router.go(-1)">Thoát</el-button>
      <el-button type="success" @click="checkin">Check-in</el-button>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="beforeCloseDialog"
      title="Thông tin khách"
    >
      <AddGuestForm
        v-if="dialogVisible"
        :form="guestsList[selectedGuestIndex]"
        :room-options="selectedRooms"
        @SaveGuestInfo="onSaveGuestInfo"
      />
    </el-dialog>
  </el-card>
</template>

<script>
import GeneralCheckinInfo from "@/components/CheckinForm/GeneralCheckinInfo.vue";
import GuestsList from "@/components/CheckinForm/GuestsList.vue";
import AddGuestForm from "@/components/CheckinForm/AddGuestForm.vue";
import { mapMutations } from "vuex";
import { db } from "@/firebase";
export default {
  components: { GeneralCheckinInfo, GuestsList, AddGuestForm },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      selectedRooms: [],
      selectedRoomTypes: [],
      checkoutDateTime: null,
      maxGuests: 0,
      // availableRooms: [
      //   {
      //     id: 1,
      //     label: "Superior",
      //     children: [
      //       {
      //         id: 101,
      //         label: 101
      //       },
      //       {
      //         id: 102,
      //         label: 102
      //       }
      //     ]
      //   },
      // ],
      guestsList: [
        // {
        //   sequence: 0,
        //   adult: true,
        //   fullName: "John",
        //   roomNo: "101",
        //   idNo: "1234",
        //   dateIssued: "",
        //   placeIssued: ""
        // }
      ],
      totalGuests: 1,
      selectedGuestIndex: null
    };
  },
  methods: {
    ...mapMutations(["setSelectedRoom"]),
    filterAvailableRooms(roomList) {
      let roomTypeGroups = [];
      let groupId = 1;
      const availableRooms = roomList.filter(room => room.isAvailable);
      availableRooms.forEach(room => {
        if (roomTypeGroups.length == 0) {
          roomTypeGroups.push({
            id: groupId,
            label: room.roomType,
            children: [{ id: room.roomNo, label: room.roomNo }]
          });
          return;
        } else {
          const existingIndex = roomTypeGroups.findIndex(
            el => el.label == room.roomType
          );
          if (existingIndex > -1) {
            roomTypeGroups[existingIndex].children.push({
              id: room.roomNo,
              label: room.roomNo
            });
          } else {
            groupId++;
            roomTypeGroups.push({
              id: groupId,
              label: room.roomType,
              children: [{ id: room.roomNo, label: room.roomNo }]
            });
          }
        }
      });
      return roomTypeGroups;
    },
    onSetCheckoutDateTime(value) {
      this.checkoutDateTime = value;
    },
    onSelectRooms(selectedRoomIds) {
      this.selectedRooms = selectedRoomIds;
      // TODO: create logic to set maximum guests count
      // below code is temporary
      this.maxGuests = this.selectedRooms.length * 2;
    },
    onEditGuest(index) {
      this.selectedGuestIndex = index;
      this.dialogVisible = true;
    },
    onDeleteGuest(index) {
      this.guestsList.splice(index, 1);
    },
    onClickAddButton() {
      this.guestsList.push({
        sequence: this.guestsList.length,
        adult: true,
        fullName: "",
        roomNo: "",
        idNo: "",
        dateIssued: "",
        placeIssued: ""
      });
      this.selectedGuestIndex = this.guestsList.length - 1;
      this.dialogVisible = true;
    },
    beforeCloseDialog() {
      // delete row in the guest list if not fill in the form
      const lastGuest = this.guestsList[this.selectedGuestIndex];
      if (!lastGuest.fullName)
        this.guestsList.splice(this.selectedGuestIndex, 1);
      this.dialogVisible = false;
    },
    onSaveGuestInfo(value) {
      // save in firebase first, then update form if save succesfully
      const { fullName, idNo, adult, roomNo, dateIssued, placeIssued } = value;
      this.guestsList[this.selectedGuestIndex].fullName = fullName;
      this.guestsList[this.selectedGuestIndex].idNo = idNo;
      this.guestsList[this.selectedGuestIndex].adult = adult;
      this.guestsList[this.selectedGuestIndex].dateIssued = dateIssued;
      this.guestsList[this.selectedGuestIndex].placeIssued = placeIssued;
      this.guestsList[this.selectedGuestIndex].roomNo = roomNo;
      this.dialogVisible = false;
    },
    checkin() {
      // TODO:
      // check validation
      // show Loader
      // change room isAvailable status in db
      // update guest list (guests)
      // update checkinTime
      // update checkoutTime if any
      // add cumulativeInvoiceValue if possible
      // remove loader
      // show message if success or error
      let validationMessage;
      if (this.selectedRooms.length == 0)
        validationMessage = "Cần chọn ít nhất 1 phòng để checkin";
      else if (this.guestsList.length < this.totalGuests)
        validationMessage = `Cần điền đủ thông tin của ${
          this.totalGuests
        } khách`;
      if (validationMessage) {
        this.$message({
          message: validationMessage,
          type: "warning"
        });
        return;
      }
      this.loading = true;
      this.selectedRooms.forEach(room => {
        const roomDoc = db.collection("rooms").doc(room.toString()); //select a room doc
        const checkinTime = new Date();
        roomDoc
          .update({
            guests: this.guestsList,
            isAvailable: false,
            checkinTime: checkinTime.toUTCString(),
            checkoutTime:
              this.checkoutDateTime && this.checkoutDateTime.toUTCString()
          })
          .then(() => {
            this.$message({
              message: `Check-in phòng ${room} thành công`,
              type: "success"
            });
            this.$router.go(-1);
          })
          .catch(error => {
            this.$message({
              message:
                "Có lỗi xảy ra, vui lòng kiểm tra lại kết nối và thử lại",
              type: "error"
            });
            console.error(error);
          })
          .finally(() => {
            this.loading = false;
          });
      });
    }
  },
  computed: {
    availableRooms() {
      return this.filterAvailableRooms(this.$store.state.rooms);
    }
  },
  mounted() {
    const roomNo = this.$store.state.selectedRoom;
    if (roomNo) {
      this.selectedRooms.push(Number(roomNo));
      this.maxGuests = 2;
    }
    for (let i = 0; i < this.availableRooms.length; i++) {
      const hasRoomNo = !!this.availableRooms[i].children.find(
        each => each.id == roomNo
      );
      if (hasRoomNo) {
        this.selectedRoomTypes.push(this.availableRooms[i].id);
        break;
      }
    }
  },
  beforeDestroy() {
    this.setSelectedRoom(null); // reset value in store to null
  }
};
</script>

<style lang="scss">
.checkin-form {
  .buttons {
    float: right;
    margin: 30px 0 30px 0;
  }
}
</style>
