import Vue from "vue";
import Router from "vue-router";
// import AddGuestForm from "./components/GuestForm/AddGuestForm.vue";
// import GuestForm from "./components/GuestForm/GuestForm.vue";
import ReceptionTable from "./views/ReceptionTable.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: ReceptionTable
    }
  ]
});
