import { useAxiosAuthInstance } from "../plugins/axios"

const MISSIONS_TYPE = {
	NEW: "/requests", // A pourvoir
	UPCOMMING: "/", // En cours
	PENDING: "/", // En attentes
	PASSED: "/missions" // Passées
}

const findMissionsForUserConnected = async (endPoint) => {
	const { data } = await useAxiosAuthInstance().get(endPoint)

	return data.map(mission => normalizeMission(mission))
}

const normalizeMission = (mission) => {
	return {
		id: mission.Id,
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
	MISSIONS_TYPE,
	findMissionsForUserConnected
}