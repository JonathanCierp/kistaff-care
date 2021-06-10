import { useAxiosAuthInstance } from "../plugins/axios"

const uploadDocument = async (document) => {
	const { data } = await useAxiosAuthInstance().post("/documents", document)

	return data
}
const getDocumentBelongsToUser = async () => {
	const { data } = await useAxiosAuthInstance().get("/documents?$limit=1000")

	return data
}
const deleteDocumentFromUser = async (documentId) => {
	const { data } = await useAxiosAuthInstance().delete("/documents/" + documentId)

	return data
}

export {
	uploadDocument,
	getDocumentBelongsToUser,
	deleteDocumentFromUser
}
