export default {
  setTheme(state, theme) {
	state.theme = theme
  },
  setUser(state, { user, isNew = false }) {
    state.user = isNew ? user : { ...state.user, user };
  },
  setIsLogged(state, isLogged) {
    state.isLogged = isLogged;
  },
  setMissions(state, { missions, status }) {
    state.missions[status] = missions;
  },
  refuseMission(state, missionId) {
    const missionToRefuse = state.missions.new.missions.find(
      (mission) => mission.id === missionId
    );
    const indexMissionToRefuse = state.missions.new.missions.indexOf(
      missionToRefuse
    );
    state.missions.new.missions.splice(indexMissionToRefuse, 1);
  },
  acceptMission(state, missionId) {
    const missionToAccept = state.missions.new.missions.find(
      (mission) => mission.id === missionId
    );
    const indexMissionToAccept = state.missions.new.missions.indexOf(
      missionToAccept
    );
    state.missions.new.missions.splice(indexMissionToAccept, 1);

    state.missions.pending.missions.unshift(missionToAccept);
  },
  setUserDocuments(state, userDocuments) {
    state.userDocuments = userDocuments;
  },
  deteleUserDocument(state, documentId) {
    const documentToDelete = state.userDocuments.find(
      (document) => document.id === documentId
    );
    const indexDocumentToDelete = state.userDocuments.indexOf(documentToDelete);
    state.userDocuments.splice(indexDocumentToDelete, 1);
  },
  setUserDocument(state, document) {
    state.userDocuments = [...state.userDocuments, document];
  },
  setOrganizations(state, organizations) {
    state.organizations = organizations;
  },
  setOrganizationById(state, { id, newStatus }) {
    console.log(newStatus);
    state.organizations.filter(
      (organization) => organization.Id === id
    ).xStatus__c = newStatus;

    console.log(state.organizations);
  },
  setNotifications(state, notifications) {
    state.notifications = notifications
  },
  deleteNotification(state, notification) {
    const indexNotificationToDelete = state.notifications.indexOf(notification);
    state.notifications.splice(indexNotificationToDelete, 1);
  },
  deleteAllNotifications(state, notification) {
    state.notifications = []
  }
};
