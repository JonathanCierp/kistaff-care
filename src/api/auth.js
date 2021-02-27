import { useAxiosInstance } from "../plugins/axios"

const loginWithEmail = async ({ strategy = "local", email, password }) => {
	const { data } = await useAxiosInstance().post("/authentication", {
		"strategy": strategy,
		"Username": email,
		"xAppPassword__c": password
	})

	return {
		accessToken: data.accessToken,
		user: data.user
	}
}

export {
	loginWithEmail
}