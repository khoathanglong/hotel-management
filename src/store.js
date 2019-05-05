import Vue from "vue";
import Vuex from "vuex";
import { firestoreAction, vuexfireMutations } from "vuexfire";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rooms: [],
    selectedRoom: null,
    user: {
      email: "",
      role: ""
    }
  },
  mutations: {
    setSelectedRoom(state, value) {
      state.selectedRoom = value;
    },
    setUserInfo(state, userInfo) {
      state.user.email = userInfo.email;
      state.user.role = userInfo.role;
    },
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
