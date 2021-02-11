import Home from "../page/home.vue"
import Offers from "../page/offers.vue"
import Organizations from "../page/organizations.vue"
import Settings from "../page/settings.vue"
import Documents from "../page/documents.vue"
import MissionsSingle from "../page/missions-single.vue"

export default [
  { path: "/", component: Home },
  { path: "/offers", component: Offers },
  { path: "/organizations", component: Organizations },
  { path: "/settings", component: Settings },
  { path: "/documents", component: Documents },
  { path: "/missions/:mission_id", component: MissionsSingle }
]