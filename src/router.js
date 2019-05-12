import Vue from "vue";
import Router from "vue-router";
import ReceptionTable from "./views/ReceptionTable.vue";
import CheckinForm from "./views/CheckinForm.vue";
import CheckoutForm from "./views/CheckoutForm.vue";
import RoomService from "./views/RoomService.vue";
import Revenue from "./views/Revenue.vue";

import SignIn from "./views/SignIn.vue";
import SignUp from "./views/SignUp.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: ReceptionTable
    },
    {
      path: "/sign-in",
      name: "Sign In",
      component: SignIn
    },
    {
      path: "/sign-up",
      name: "Sign Up",
      component: SignUp
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
    },
    {
      path: "/revenue",
      name: "Revenue",
      component: Revenue
    }
  ]
});
