import Vue from "vue";
import Router from "vue-router";
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
