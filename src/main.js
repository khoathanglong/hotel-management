import { firestorePlugin } from "vuefire";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./plugins/element.js";
import "./firebase.js";
Vue.config.productionTip = false;
// config firebase
Vue.use(firestorePlugin);

// define global variable

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
