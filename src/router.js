import Vue from "vue";
import Router from "vue-router";
import ReceptionTable from "./views/ReceptionTable.vue";
import CheckinForm from "./views/CheckinForm.vue";
import CheckoutForm from "./views/CheckoutForm.vue";
import RoomService from "./views/RoomService.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: ReceptionTable
    },
    {
      path: "/check-in",
      name: "Checkin Form",
      component: CheckinForm
    },
    {
      path: "/check-out",
      name: "Checkout Form",
      component: CheckoutForm
    },
    {
      path: "/room-service",
      name: "Room Service",
      component: RoomService
    }
  ]
});
