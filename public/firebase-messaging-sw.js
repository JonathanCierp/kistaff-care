/*
importScripts("https://www.gstatic.com/firebasejs/8.2.6/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.2.6/firebase-messaging.js")

firebase.initializeApp({
	apiKey: "AIzaSyCEGAdrzPEMlikaQc3p4EK5NH8eOXiNKW0",
	authDomain: "test-vue-pwa-notification.firebaseapp.com",
	projectId: "test-vue-pwa-notification",
	storageBucket: "test-vue-pwa-notification.appspot.com",
	messagingSenderId: "224931150973",
	appId: "1:224931150973:web:1713b3e414b2f1af2f8514",
	measurementId: "G-2648EVM8FR"
})

firebase.messaging().setBackgroundMessageHandler((payload) => {
	console.log("[firebase-messaging-sw.js] Received background message ", payload)

	const data = payload.data
	const notificationTitle = data.title
	const notificationOptions = {
		body: data.body
	}

	return self.registration.showNotification(notificationTitle, notificationOptions)
})*/
importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js")

const firebaseConfig = {
	apiKey: "AIzaSyCEGAdrzPEMlikaQc3p4EK5NH8eOXiNKW0",//import.meta.env.VITE_API_KEY,
	authDomain: "test-vue-pwa-notification.firebaseapp.com",//import.meta.env.VITE_AUTH_DOMAIN,
	projectId: "test-vue-pwa-notification",//import.meta.env.VITE_PROJECT_ID,
	storageBucket: "test-vue-pwa-notification.appspot.com",//import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: "224931150973",//import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: "1:224931150973:web:1713b3e414b2f1af2f8514",//import.meta.env.VITE_APP_ID,
	measurementId: "G-2648EVM8FR"//import.meta.env.VITE_MEASUREMENT_ID
}

const app = firebase.initializeApp(firebaseConfig)

app.messaging().setBackgroundMessageHandler(function (payload) {
	return self.registration.showNotification(payload)
})