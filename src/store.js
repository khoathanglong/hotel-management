import Vue from "vue";
import Vuex from "vuex";
import { firestoreAction, vuexfireMutations } from "vuexfire";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rooms: []
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    getRoomsData: firestoreAction(({ bindFirestoreRef }, ref) => {
      // this will unbind any previously bound ref to 'todos'
      bindFirestoreRef("rooms", ref);
      // you can unbind any ref easily
      // unbindFirestoreRef("user");
    })
  }
});
