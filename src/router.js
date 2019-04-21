import Vue from "vue";
import Router from "vue-router";
import ReceptionTable from "./views/ReceptionTable.vue";
import CheckinForm from "./views/CheckinForm.vue";
import Receipt from "./components/Payment/Receipt.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: ReceptionTable
    },
    {
      path: "/check-in/:roomNo",
      name: "Checkin Form",
      component: CheckinForm
    },
    {
      path: "/payment",
      name: "Payment",
      component: Receipt
    }
  ]
});
