import { useAxiosAuthInstance } from "../plugins/axios"

const MISSIONS_ENDPOINT = {
  	NEW: "/requests",
  	UPCOMING: "/missions",
  	PENDING: "/requests",
  	PASSED: "/missions",
};
const MISSIONS_STATUS = {
	NEW: "Requested",
	UPCOMING: "Assigned",
	PENDING: "Selected",
	PASSED: "Closed"
}
let requests = []
let missions = []

const findItemsForUserConnected = async (endPoint) => {
	const { data } = await useAxiosAuthInstance().get(endPoint)

	return data.map(mission => normalizeMission(mission))
}
const findMissionsForUserConnected = async () => {
	missions = await findItemsForUserConnected(
    "/missions?$limit=1000&$sort[xFromDate__c]=-1"
  );
}
const findRequestsForUserConnected = async () => {
	requests = await findItemsForUserConnected(
    "/requests?$limit=1000&$sort[xService_Request__r.xFromDate__c]=1"
  );
}
const findMissionsForUserConnectedFilteredByStatus = async (status) => {
	let missionFiltered = []

	if(status === MISSIONS_STATUS.UPCOMING || status === MISSIONS_STATUS.PASSED) {
		missionFiltered = missions.filter(mission => mission.status === status)
	} else if(status === MISSIONS_STATUS.NEW) {
		missionFiltered = requests.filter((requests) => requests.status === status && requests.requestSatus === 'Submitted');
	} else if(status === MISSIONS_STATUS.PENDING) {
		missionFiltered = requests.filter(requests => requests.isPending)
	}

	return {
		missions: missionFiltered,
		length: missionFiltered.length
	}
}
const acceptMission = async (missionId) => {
	return await useAxiosAuthInstance().put("/requests/" + missionId, {
		"xResponse_Status__c": "Accepted",
		"xStatus__c": "Submitted"
	})
}
const refuseMission = async (missionId) => {
	return await useAxiosAuthInstance().put("/requests/" + missionId, {
		"xResponse_Status__c": "Declined",
		"xStatus__c": "Submitted"
	})
}
const normalizeMission = (mission) => {
	return {
		id: mission.Id,
		status: mission.xStatus__c,
		requestSatus: mission.xService_Request__r?.xStatus__c ? mission.xService_Request__r?.xStatus__c : '',
		isPending: mission.xIsPending__c,
		documentReceived: mission.xDocuments_Received__c,
		organization: {
			name: mission.xOrganization__r ? mission.xOrganization__r.Name : mission.xService_Request__r.xOrganization__r.Name,
			address: mission.xAddress__c ? mission.xAddress__c : mission.xService_Request__r.xAddress__c
		},
		job: {
			name: mission.xSubject__c ? mission.xSubject__c : mission.xService_Request__r.xSubject__c,
			duration: mission.xDuration__c ? mission.xDuration__c : mission.xService_Request__r.xDuration__c,
			start_date: mission.xFromDate__c ? mission.xFromDate__c : mission.xService_Request__r.xFromDate__c,
			end_date: mission.xToDate__c ? mission.xToDate__c : mission.xService_Request__r.xToDate__c
		}
	}
}

export {
	MISSIONS_ENDPOINT,
	MISSIONS_STATUS,
	findItemsForUserConnected,
	findMissionsForUserConnected,
	findRequestsForUserConnected,
	findMissionsForUserConnectedFilteredByStatus,
	acceptMission,
	refuseMission,
	normalizeMission
}
