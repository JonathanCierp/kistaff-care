import { useAxiosAuthInstance } from "../plugins/axios"

const MISSIONS_ENDPOINT = {
	NEW: "/requests",
	UPCOMING: "/missions",
	PENDING: "/requests",
	PASSED: "/missions"
}
const MISSIONS_STATUS = {
	NEW: "Requested",
	UPCOMING: "Assigned",
	PENDING: "Selected",
	PASSED: "Closed"
}
let missions = []

const findMissionsForUserConnected = async (endPoint) => {
	const { data } = await useAxiosAuthInstance().get(endPoint)

	return data.map(mission => normalizeMission(mission))
}
const findMissionsForUserConnectedFilteredByStatus = async (type) => {
	// Pour pas dupliquer les requêtes tous en ayant 1 fonction de recupération
	if(!missions[MISSIONS_ENDPOINT[type]] || !missions[MISSIONS_ENDPOINT[type]].length) {
		missions[MISSIONS_ENDPOINT[type]] = (await findMissionsForUserConnected(MISSIONS_ENDPOINT[type]))
	}

	const missionFiltered = missions[MISSIONS_ENDPOINT[type]].filter(mission => mission.status === MISSIONS_STATUS[type])

	return {
		missions: missionFiltered,
		length: missionFiltered.length
	}
}

const normalizeMission = (mission) => {
	return {
		id: mission.Id,
		status: mission.xStatus__c,
		organization: {
			name: mission.xOrganization__r ? mission.xOrganization__r.Name : mission.xService_Request__r.xOrganization__r.Name
		},
		job: {
			name: mission.xSubject__c ? mission.xSubject__c.Name : mission.xService_Request__r.xSubject__c,
			duration: mission.xDuration__c ? mission.xDuration__c.Name : mission.xService_Request__r.xDuration__c,
			start_date: mission.xFromDate__c ? mission.xFromDate__c.Name : mission.xService_Request__r.xFromDate__c,
			end_date: mission.xToDate__c ? mission.xToDate__c.Name : mission.xService_Request__r.xToDate__c
		}
	}
}

export {
	MISSIONS_ENDPOINT,
	MISSIONS_STATUS,
	findMissionsForUserConnected,
	findMissionsForUserConnectedFilteredByStatus
}