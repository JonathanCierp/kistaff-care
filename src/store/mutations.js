export default {
	setUser(state, { user, isNew = false }) {
		state.user = isNew ? user : { ...state.user, user }
	},
	setIsLogged(state, isLogged) {
		state.isLogged = isLogged
	},
	setMissions(state, { missions, status }) {
		state.missions[status] = missions
	},
	refuseMission(state, missionId) {
		const missionToRefuse = state.missions.new.missions.find(mission => mission.id === missionId)
		const indexMissionToRefuse = state.missions.new.missions.indexOf(missionToRefuse)
		state.missions.new.missions.splice(indexMissionToRefuse, 1)
		state.missions.new.length = state.missions.new.missions.length
	},
	acceptMission(state, missionId) {
		const missionToAccept = state.missions.new.missions.find(mission => mission.id === missionId)
		const indexMissionToAccept = state.missions.new.missions.indexOf(missionToAccept)
		state.missions.new.missions.splice(indexMissionToAccept, 1)
		state.missions.new.length = state.missions.new.missions.length

		state.missions.pending.missions = [missionToAccept, ...state.missions.pending.missions]
		state.missions.pending.length = state.missions.pending.missions.length
	},
	setUserDocuments(state, userDocuments) {
		state.userDocuments = userDocuments
	},
	deteleUserDocument(state, documentId) {
		const documentToDelete = state.userDocuments.find(document => document.id === documentId)
		const indexDocumentToDelete = state.userDocuments.indexOf(documentToDelete)
		state.userDocuments.splice(indexDocumentToDelete, 1)
	},
	setUserDocument(state, document) {
		state.userDocuments = [...state.userDocuments, document]
	}
}