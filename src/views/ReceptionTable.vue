<template>
  <div class="receptionTable">
    <RoomList @OpenForm="onOpenForm" :roomList="filteredRoomList" />
  </div>
</template>

<script>
// @ is an alias to /src
import RoomList from "@/components/RoomList/RoomList.vue";
// import GuestForm from "@/components/GuestForm/GuestForm.vue";
// import { db } from "@/firebase.js";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    RoomList
    // GuestForm
  },
  data() {
    return {
      dialogVisible: false
      // rooms: []
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
            checkinTime,
            checkoutTime,
            dailyPrice: dailyPrice.toLocaleString(),
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
      } else this.$router.push("/check-out");
    }
  },
  // firestore: {
  //   rooms: db.collection("rooms")
  // },
  created() {}
};
</script>

<style lang="scss">
.receptionTable {
  .el-dialog__body {
    padding: 10px !important;
  }
}
</style>
