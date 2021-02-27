import { useAxiosInstance, useAxiosAuthInstance } from "../plugins/axios"
import { loginWithEmail } from "../api/auth"

export default {
	async login({ commit }, { email, password}) {
		try {
			const { accessToken, user } = await loginWithEmail({ email, password})

			await commit("setUser", user)
			await commit("setIsLogged", true)
			localStorage.setItem("jwt", accessToken)
		} catch(e) {
			throw new Error(e.response?.data.message || e.message)
		}
	},
	async saveUser({ commit }, { id, test }) {
		try {
			const { data } = await useAxiosAuthInstance().put(`/contacts/${id}`, test)
			console.log(data)
			//await commit("setUser", data.user)
			//await commit("setIsLogged", true)
			//localStorage.setItem("jwt", data.accessToken)
		} catch(e) {
			throw new Error(e.response?.data.message || e.message)
		}
	}
}