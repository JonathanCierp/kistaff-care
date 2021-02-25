import { useAxiosInstance } from "../plugins/axios"

export default {
	async login({ commit }, form) {
		try {
			const { data } = await useAxiosInstance().post("/authentication", {
				"strategy": "local",
				"Username": form.email,
				"xAppPassword__c": form.password
			})

			await commit("setUser", data.user)
			await commit("setIsLogged", true)
			localStorage.setItem("jwt", data.accessToken)
		} catch(e) {
			throw new Error(e.response?.data.message || e.message)
		}
	}
}