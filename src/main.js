import { firestorePlugin } from "vuefire";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./plugins/element.js";
import { auth } from "./firebase";
Vue.config.productionTip = false;
// config firebase
Vue.use(firestorePlugin);
// handle page reloads
let app;
auth().onAuthStateChanged(user => {
  console.log("user", user);
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      store,
      render: h => h(App)
    });
  }
});
