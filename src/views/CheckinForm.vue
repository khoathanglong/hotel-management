<template>
  <el-card>
    <GeneralCheckinInfo
      title="Check in"
      :selected-rooms="selectedRooms"
      :selected-room-types="selectedRoomTypes"
      :checkout-date-time="checkoutDateTime"
      :total-guests="totalGuests"
      :available-rooms="availableRooms"
      @SetCheckoutDateTime="onSetCheckoutDateTime"
      @SetTotalGuests="onSetTotalGuests"
      @SelectRooms="onSelectRooms"
    />
    <GuestsList
      @ClickAddButton="onClickAddButton"
      @EditGuest="onEditGuest"
      @DeleteGuest="onDeleteGuest"
      :guestsList="guestsList"
    />

    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="beforeCloseDialog"
      title="Thông tin khách"
    >
      <AddGuestForm
        v-if="dialogVisible"
        :form="guestsList[selectedGuestIndex]"
        @SaveGuestInfo="onSaveGuestInfo"
      />
    </el-dialog>
  </el-card>
</template>

<script>
import GeneralCheckinInfo from "@/components/CheckinForm/GeneralCheckinInfo.vue";
import GuestsList from "@/components/CheckinForm/GuestsList.vue";
import AddGuestForm from "@/components/CheckinForm/AddGuestForm.vue";
export default {
  components: { GeneralCheckinInfo, GuestsList, AddGuestForm },
  data() {
    return {
      dialogVisible: false,
      selectedRooms: [],
      selectedRoomTypes: [],
      checkoutDateTime: null,
      totalGuests: 1,
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
      //   {
      //     id: 2,
      //     label: "Standard",
      //     children: [
      //       {
      //         id: 201,
      //         label: 201
      //       },
      //       {
      //         id: 202,
      //         label: 202
      //       }
      //     ]
      //   }
      // ],
      guestsList: [
        {
          sequence: 0,
          adult: true,
          fullName: "John",
          roomNo: "101",
          idNo: "1234",
          dateIssued: "",
          placeIssued: ""
        }
      ],
      selectedGuestIndex: null
    };
  },
  methods: {
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
    onSetTotalGuests(value) {
      this.totalGuests = value;
    },
    onSelectRooms(checkedNodes) {
      /**
       * checkedNodes include both parent and children nodes,
       * filter to get only children checked,
       * each tree node parent has value id under 10
       **/
      const selectedRoomIds = checkedNodes.filter(each => each > 10);
      this.selectedRooms = selectedRoomIds;
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
      // delete line in the guest list if not fill in the form
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
    }
  },
  computed: {
    availableRooms() {
      return this.filterAvailableRooms(this.$store.state.rooms);
    }
  },
  mounted() {
    const roomNo = this.$route.params.roomNo;
    this.selectedRooms.push(roomNo);

    for (let i = 0; i < this.availableRooms.length; i++) {
      const hasRoomNo = !!this.availableRooms[i].children.find(
        each => each.id == roomNo
      );
      if (hasRoomNo) {
        this.selectedRoomTypes.push(this.availableRooms[i].id);
        break;
      }
    }
  }
};
</script>

<style></style>
