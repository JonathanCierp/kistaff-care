import { useAxiosAuthInstance, useAxiosInstance } from "../plugins/axios"

const useAuth = async ({ to, from }) => {
	try {
		const { data } = await useAxiosInstance.post("/authentication", {
			"strategy": "local",
		})

		localStorage.setItem("jwt", data.accessToken)
	} catch(e) {
		return false
	}
}

export {
	useAuth
}