import { useAxiosAuthInstance } from "../plugins/axios"

const getOrganizations = async () => {
	const { data } = await useAxiosAuthInstance().get("/organizations")

	return normalizeOrganisations(data)
}
const normalizeOrganisations = (organizations) => {
	return organizations.filter(organization => organization.xActiveOrg__c)
}

export {
	getOrganizations
}