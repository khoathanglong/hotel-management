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
import { mapMutations } from "vuex";

export default {
  components: { GuestsList, Receipt },
  data() {
    return {
      guestsList: [],
      receiptNo: 123,
      dateIssued: new Date(Date.now()),
      issuer: "Ngoc Nguyen",
      customer: "Long Khoa",
      checkinDateTime: new Date(Date.now() - 24 * 3600 * 1000 * 2),
      redInvoice: false,
      receiptTable: []
    };
  },
  methods: {
    ...mapMutations(["setSelectedRoom"])
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
