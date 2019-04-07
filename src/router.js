import Vue from "vue";
import Router from "vue-router";
<<<<<<< HEAD
// import AddGuestForm from "./components/GuestForm/AddGuestForm.vue";
=======
>>>>>>> 85d98cbf8cc507431e97ee12dd0308985d14a979
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
