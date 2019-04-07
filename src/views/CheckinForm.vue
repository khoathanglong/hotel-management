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
      <AddGuestForm :form="guestsList[selectedGuestIndex]" />
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
      const lastGuest = this.guestsList[this.selectedGuestIndex];
      if (!lastGuest.fullName)
        this.guestsList.splice(this.selectedGuestIndex, 1);
      this.dialogVisible = false;
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
