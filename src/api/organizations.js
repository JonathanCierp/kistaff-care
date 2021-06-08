import { useAxiosAuthInstance } from "../plugins/axios"

const getOrganizations = async () => {
	const { data } = await useAxiosAuthInstance().get("/organizations?$limit=1000")

	return normalizeOrganisations(data)
}
const saveOrganizations = async (id, payload) => {
	return await useAxiosAuthInstance().patch("/organizations/" + id, payload)
}
const normalizeOrganisations = (organizations) => {
	return organizations//.filter(organization => organization.xActiveOrg__c)
}

export {
	getOrganizations,
	saveOrganizations
}
