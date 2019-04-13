import firebase from "firebase";

var config = {
  apiKey: "AIzaSyC1lwUQEEa8-f4UR5Qnze0yU7OCaYMP3E0",
  authDomain: "hotel-management-d27ed.firebaseapp.com",
  databaseURL: "https://hotel-management-d27ed.firebaseio.com",
  projectId: "hotel-management-d27ed",
  storageBucket: "hotel-management-d27ed.appspot.com",
  messagingSenderId: "978742066877"
};
if (typeof firebase === "undefined")
  throw new Error(
    "Có vấn đề với firebase, liên hệ lập trình viên để kiểm tra chi tiết"
  );
firebase.initializeApp(config);

export const db = firebase.firestore();
