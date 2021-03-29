import { useAxiosAuthInstance } from "../plugins/axios"

const addUser = async (user) => {
	const { data } = await useAxiosAuthInstance().post("/signups", user)

	return data.success
}
const editUser = async (id, user) => {
	const { data } = await useAxiosAuthInstance().put(`/contacts/${id}`, user)

	return data.success
}
const forgotPassword = async (email) => {
	const { data } = await useAxiosAuthInstance().post("/passwords", {
		email,
		action: "reset"
	})

	return data
}
const resetPassword = async (payload) => {
	const { data } = await useAxiosAuthInstance().post("/passwords", {
		password: payload.newPassword,
		oldPassword: payload.oldPassword,
		action: "change"
	})

	return data
}

export {
	addUser,
	editUser,
	forgotPassword,
	resetPassword
}
