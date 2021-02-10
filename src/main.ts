import { createApp } from "vue"
import router from "./router/router"
import App from "./App.vue"
import "./assets/css/app.scss"

createApp(App)
    .use(router)
    .mount("#page-wrapper")
