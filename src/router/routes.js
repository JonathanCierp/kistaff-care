import Home from "../page/home.vue"
import Offers from "../page/offers.vue"
import Organizations from "../page/organizations.vue"
import Settings from "../page/settings.vue"
import Documents from "../page/documents.vue"
import MissionsSingle from "../page/missions-single.vue"
import Signin from "../page/signin.vue"

export default [
  {
  	path: "/",
	  component: Home,
	  meta: {
  		layout: "default"
	  }
  },
  {
  	path: "/offers",
	  component: Offers,
	  meta: {
  		layout: "default"
	  }
  },
  {
  	path: "/organizations",
	  component: Organizations,
	  meta: {
  		layout: "default"
	  }
  },
  {
  	path: "/settings",
	  component: Settings,
	  meta: {
  		layout: "default"
	  }
  },
  {
  	path: "/documents",
	  component: Documents,
	  meta: {
  		layout: "default"
	  }
  },
  {
  	path: "/missions/:mission_id",
	  component: MissionsSingle,
	  meta: {
  		layout: "default"
	  }
  },
  {
  	path: "/auth/signin",
	  component: Signin,
	  name: 'Signin',
	  meta: {
		  layout: "blank"
	  }
  }
]