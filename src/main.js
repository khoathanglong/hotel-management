import { firestorePlugin } from "vuefire";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./plugins/element.js";
import { auth, users } from "./firebase";
Vue.config.productionTip = false;
// config firebase
Vue.use(firestorePlugin);
// handle page reloads
let app;
auth().onAuthStateChanged(user => {
  if (user) {
    // set user Info each time new user is login
    // also this set user info to the system when user press f5
    const { uid } = user;
    users
      .doc(uid)
      .get()
      .then(doc => {
        console.log(doc);
        // set user info for later use
        store.commit("setUserInfo", doc.data());
      });
  }
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      store,
      render: h => h(App)
    });
  }
});
