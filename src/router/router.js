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

	if (!isAuthenticated && !isSigninPath)  {
		return "/auth/signin"
	}

	if(isAuthenticated && isSigninPath) {
		return "/"
	}
})

export default router