import { useAxiosAuthInstance } from "../plugins/axios"

const editUser = async (id) => {
	const { data } = await useAxiosAuthInstance().put(`/contacts/${id}`)
	
	return data.success
}

export {
	editUser
}