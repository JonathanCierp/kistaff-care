import { createApp } from "vue"
import router from "./router/router"
import store from "./store/store"
import App from "./App.vue"
import { useComponents } from "./components.js"
import "./assets/css/app.scss"

let app = createApp(App)
    .use(router)
    .use(store)
app = useComponents(app)
app.mount("#page-wrapper")
