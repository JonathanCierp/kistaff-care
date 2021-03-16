import { useAxiosAuthInstance } from "../plugins/axios"

const editUser = async (id, user) => {
	const { data } = await useAxiosAuthInstance().put(`/contacts/${id}`, user)

	return data.success
}

export {
	editUser
}