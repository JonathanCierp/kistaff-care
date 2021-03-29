import Home from "../page/home.vue"
import Offers from "../page/offers.vue"
import Organizations from "../page/organizations.vue"
import Profiles from "../page/profiles.vue"
import Documents from "../page/documents.vue"
import Signin from "../page/auth/signin.vue"
import Signup from "../page/auth/signup.vue"
import PasswordForgot from "../page/password/forgot.vue"

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
  	path: "/profiles",
	  component: Profiles,
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
  	path: "/auth/signin",
	  component: Signin,
	  name: 'Signin',
	  meta: {
		  layout: "blank"
	  }
  },
  {
  	path: "/auth/signup",
	  component: Signup,
	  name: 'Signup',
	  meta: {
		  layout: "blank"
	  }
  },
	{
		path: "/password/forgot",
		component: PasswordForgot,
		name: "PasswordForgot",
		meta: {
			layout: "blank"
		}
	}
]
