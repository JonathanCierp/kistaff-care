import store from "../store/store"
import { useAxiosAuthInstance } from "../plugins/axios"


const useAuth = async () => {
	try {
		const { data } = await useAxiosAuthInstance().get("/contacts")

		store.commit("setUser", data[0])
		store.commit("setIsLogged", true)
	} catch(e) {
		return false
	}
	
	return true
}

export {
	useAuth
}