import { createWebHistory, createRouter } from "vue-router"
import routes from "./routes"
import { useAuth } from "../middleware/auth"

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach(async (to, from) => {
	const isAuthenticated = await useAuth()
	const isSigninPath = to.name === "Signin"
	const isAllowedNoConnected = to.meta.layout === "blank"


	if(isAuthenticated) {
		if(isAllowedNoConnected) {
			return "/"
		}
	}else {
		if(!isAllowedNoConnected) {
			return "/auth/signin"
		}
	}

	return true
})

export default router