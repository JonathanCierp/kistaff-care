import { useAxiosAuthInstance } from "../plugins/axios"

export const updateUserInformations = async (id, data) => {
	const { data } = await useAxiosAuthInstance().put(`/contacts/${id}`, data)
	console.log(data)
	//return data.map(mission => normalizeMission(mission))
}