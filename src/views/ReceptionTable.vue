<template>
  <div class="receptionTable">
    <RoomList
      @openCheckinForm="onOpenCheckinForm"
      :roomList="filteredRoomList"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import RoomList from "@/components/RoomList/RoomList.vue";
// import GuestForm from "@/components/GuestForm/GuestForm.vue";
import { db } from "@/firebase.js";

export default {
  components: {
    RoomList
    // GuestForm
  },
  data() {
    return {
      dialogVisible: false,
      rooms: []
    };
  },
  computed: {
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
            checkinTime,
            checkoutTime,
            dailyPrice,
            lateCheckout,
            secondHourPrice,
            firstHourPrice,
            isAvailable
          };
        })
      );
    }
  },
  methods: {
    onOpenCheckinForm(row) {
      this.$router.push(`/check-in/${row.roomNo}`);
    }
  },
  firestore: {
    rooms: db.collection("rooms")
  },
  mounted() {}
};
</script>

<style lang="scss">
.receptionTable {
  .el-dialog__body {
    padding: 10px !important;
  }
}
</style>
