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
    "Có vấn đề với Firebase, liên hệ lập trình viên để kiểm tra chi tiết"
  );
firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// firebase collections
const rooms = db.collection("rooms");
const users = db.collection("users");
export { db, rooms, auth, currentUser, users };
// // add ref Data

// let rooms = [
//   101,
//   102,
//   103,
//   104,
//   105,
//   201,
//   202,
//   203,
//   204,
//   205,
//   301,
//   302,
//   303,
//   304,
//   305,
//   401,
//   402,
//   403,
//   404,
//   405,
//   501,
//   502,
//   503,
//   504,
//   505
// ];

// rooms.forEach(room => {
//   const doc = room.toString();
//   let roomType;
//   let dailyPrice;
//   let secondHourPrice;
//   let firstHourPrice;
//   let lateCheckout;
//   if (doc.endsWith("02") || doc.endsWith("03") || doc === "104") {
//     dailyPrice = 300000;
//     roomType = "Standard";
//     secondHourPrice = 20000;
//     lateCheckout = 20000;
//     firstHourPrice = 60000;
//   } else if (doc.endsWith("01")) {
//     dailyPrice = 350000;
//     roomType = "Superior";
//     secondHourPrice = 20000;
//     lateCheckout = 20000;
//     firstHourPrice = 60000;
//   } else if (doc.endsWith("04")) {
//     dailyPrice = 500000;
//     roomType = "VIP";
//     secondHourPrice = 30000;
//     lateCheckout = 30000;
//     firstHourPrice = 80000;
//   } else if (doc.endsWith("05")) {
//     dailyPrice = 500000;
//     roomType = "Family";
//     secondHourPrice = 30000;
//     lateCheckout = 30000;
//     firstHourPrice = 80000;
//   }

//   db.collection("rooms")
//     .doc(room.toString())
//     .set({
//       roomNo: room,
//       checkinTime: null,
//       checkoutTime: null,
//       dailyPrice,
//       guests: [],
//       extraServices: [],
//       firstHourPrice,
//       secondHourPrice,
//       isAvailable: true,
//       roomType,
//       lateCheckout,
//       cumulativeInvoiceValue: 0
//     });
// });
