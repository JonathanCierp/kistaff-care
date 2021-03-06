import firebase from "firebase/app";
import "firebase/firebase-messaging";
let messaging = {};

if (navigator.userAgent.match(/Windows/i) === "Windows") {
  const firebaseConfig = {
    apiKey: "AIzaSyCEGAdrzPEMlikaQc3p4EK5NH8eOXiNKW0", //import.meta.env.VITE_API_KEY,
    authDomain: "test-vue-pwa-notification.firebaseapp.com", //import.meta.env.VITE_AUTH_DOMAIN,
    projectId: "test-vue-pwa-notification", //import.meta.env.VITE_PROJECT_ID,
    storageBucket: "test-vue-pwa-notification.appspot.com", //import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: "224931150973", //import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: "1:224931150973:web:1713b3e414b2f1af2f8514", //import.meta.env.VITE_APP_ID,
    measurementId: "G-2648EVM8FR", //import.meta.env.VITE_MEASUREMENT_ID
  };

  firebase.initializeApp(firebaseConfig);

  messaging = firebase.messaging();
}

export default messaging;
