import { useAxiosAuthInstance } from "../plugins/axios"

const SOBJECTS_FIELD = {
	CIVILITY: "Salutation",
	FONCTION: "xType_of_service__c",
	POLE: "xServices__c",
	DOCUMENT: "Received_Documents_List__c"
}
let sobjects = []

const findSobjectsForUserConnected = async () => {
	const { data } = await useAxiosAuthInstance().get("/sobjects/Contact")

	sobjects = data?.fields
}
const findSobjectsForUserConnectedFilteredByField = async (field) => {
	let sobject = sobjects.find(object => object.name === field)

	return sobject.picklistValues.map(value => normalizeSobject(value)).filter(value => value.active)
}
const normalizeSobject = (sobject) => {
	return {
		key: sobject.value,
		value: sobject.label,
		active: sobject.active
	}
}

export {
	SOBJECTS_FIELD,
	findSobjectsForUserConnected,
	findSobjectsForUserConnectedFilteredByField,
	normalizeSobject
}