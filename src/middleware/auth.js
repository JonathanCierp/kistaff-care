import store from "../store/store"
import { useAxiosAuthInstance } from "../plugins/axios"


const useAuth = async () => {
	try {
		const { data } = await useAxiosAuthInstance().get("/contacts")

		store.commit("setUser", { user: data[0], isNew: true })
		store.commit("setIsLogged", true)
	} catch(e) {
		return false
	}
	
	return true
}

export {
	useAuth
}