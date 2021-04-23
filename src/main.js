import { createApp } from "vue"
import router from "./router/router"
import store from "./store/store"
import App from "./App.vue"
import { useComponents } from "./components.js"
import "./plugins/registerServiceWorker.js"
import "./assets/css/app.scss"

import * as PusherPushNotifications from "@pusher/push-notifications-web"

const beamsClient = new PusherPushNotifications.Client({
	instanceId: "6e63f37a-050b-417b-bdb5-19f2e130c1bd"
})

beamsClient.start()
	.then(() => beamsClient.addDeviceInterest("hello"))
	.then(() => console.log("Successfully registered and subscribed!"))
	.catch(console.error)

let app = createApp(App)
	.use(router)
	.use(store)
app = useComponents(app)
app.mount("#page-wrapper")
