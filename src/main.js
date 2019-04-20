import { firestorePlugin } from "vuefire";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./plugins/element.js";
Vue.config.productionTip = false;
// config firebase
Vue.use(firestorePlugin);

Vue.config.productionTip = false;
const fb = require("./firebase.js");
Vue.prototype.$db = fb.db;

// handle page reloads
let app;
fb.auth.onAuthStateChanged(user => {
  console.log(user);
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      store,
      render: h => h(App)
    });
  }
});
