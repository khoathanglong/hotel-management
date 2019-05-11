<template>
  <el-card class="checkout-form">
    <div slot="header" style="text-align: left;">
      <span style="font-weight: bold; font-size: 24px;">CHECKOUT</span>
      <el-button
        style="float: right; padding: 3px 0"
        type="text"
        circle
        icon="el-icon-close"
        @click="$router.go(-1)"
      ></el-button>
    </div>
    <GuestsList :guests-list="guestsList" style="margin-bottom: 20px;" />
    <Receipt
      :receipt-no="receiptNo"
      :date-issued="dateIssued"
      :issuer="issuer"
      :customer="customer"
      :checkin-date-time="checkinDateTime"
      :red-invoice="redInvoice"
      :table-data="receiptTable"
      @ToggleRedInvoice="redInvoice = !redInvoice"
    />
    <div class="buttons">
      <el-button @click="$router.go(-1)">Thoát</el-button>
      <el-button type="success">Check-out</el-button>
    </div>
  </el-card>
</template>

<script>
import GuestsList from "@/components/CheckinForm/GuestsList.vue";
import Receipt from "@/components/Payment/Receipt.vue";
import { mapMutations, mapState } from "vuex";

export default {
  components: { GuestsList, Receipt },
  data() {
    return {
      // guestsList: [],
      receiptNo: 123,
      dateIssued: Date.now(),
      // dateIssued: moment(new Date()).format("DD-MM-YYYY h:mm:ss"),
      issuer: "Ngoc Nguyen",
      redInvoice: false,
      receiptTable: {
        items: [],
        sum: {}
      }
    };
  },
  computed: {
    ...mapState({
      checkoutRoom: state =>
        state.rooms.find(room => room.roomNo == state.selectedRoom)
    }),
    checkinDateTime() {
      return this.checkoutRoom.checkinTime;
    },
    guestsList() {
      return this.checkoutRoom && this.checkoutRoom.guests;
    },
    customer() {
      return this.guestsList && this.guestsList[0].fullName;
    },
    timeUsingHotel() {
      // over  15 min => round up to 1 hour
      // over 6 hours round up to 1 day

      let timeUsingHotel =
        this.dateIssued - new Date(this.checkoutRoom.checkinTime).getTime();
      let numOfHours = 0;
      let numOfDays = 0;
      let numOfMins;
      const oneMin = 60 * 1000;
      const oneHour = 3600 * 1000;
      const oneDay = 3600 * 24 * 1000;
      while (timeUsingHotel > oneDay) {
        numOfDays += 1;
        timeUsingHotel -= oneDay;
      }
      while (timeUsingHotel > oneHour) {
        numOfHours += 1;
        timeUsingHotel -= oneHour;
      }
      numOfMins = timeUsingHotel / oneMin; // remaining time is in minutes
      if (numOfMins > 15) {
        numOfHours += 1;
      }
      if (numOfHours > 6) {
        numOfDays += 1;
        numOfHours = 0;
      }
      return {
        days: numOfDays,
        hours: numOfHours
      };
    }
  },
  methods: {
    ...mapMutations(["setSelectedRoom"]),
    calculateRoomFee() {
      let { days, hours } = this.timeUsingHotel;
      const { firstHourPrice, secondHourPrice, dailyPrice } = this.checkoutRoom;
      const dailyFee = days * dailyPrice;
      const firstHourFee = firstHourPrice * hours;
      const nextHoursFee = hours === 0 ? 0 : secondHourPrice * (hours - 1);
      const total = dailyFee + firstHourFee + nextHoursFee;
      this.receiptTable.items.push({
        content: this.checkoutRoom.roomNo,
        quantity: days,
        unit: "Ngày",
        unitPrice: dailyPrice,
        subTotal: dailyFee
      });
      if (hours > 0) {
        this.receiptTable.items.push({
          content: this.checkoutRoom.roomNo,
          quantity: hours,
          unit: "Giờ (đầu)",
          unitPrice: firstHourFee,
          subTotal: firstHourFee
        });
      }
      if (hours > 1) {
        this.receiptTable.items.push({
          content: this.checkoutRoom.roomNo,
          quantity: hours,
          unit: "Giờ (thứ 2)",
          unitPrice: secondHourPrice,
          subTotal: nextHoursFee
        });
      }
    }
  },
  created() {
    this.calculateRoomFee();
  },
  beforeDestroy() {
    this.setSelectedRoom(null);
  }
};
</script>

<style lang="scss">
.checkout-form {
  .buttons {
    float: right;
    margin: 30px 0 30px 0;
  }

  .el-card__body {
    padding-top: 0;
  }
}
</style>
