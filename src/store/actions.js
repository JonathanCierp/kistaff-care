import { loginWithEmail } from "../api/auth"
import { addUser, editUser, forgotPassword, resetPassword } from "../api/user"
import { useNotification } from "../components/custom/notification/useNotification"
import {
	acceptMission,
	findMissionsForUserConnected,
	findMissionsForUserConnectedFilteredByStatus,
	findRequestsForUserConnected,
	MISSIONS_STATUS,
	refuseMission
} from "../api/missions"
import { deleteDocumentFromUser, getDocumentBelongsToUser, uploadDocument } from "../api/documents"
import { getOrganizations, saveOrganizations } from "../api/organizations"
import { getDeviceByToken, saveDevice } from "../api/device"
//import firebaseMessaging from "../plugins/firebase"
import { getNotifications, markAllNotificationAsRead } from "../api/notifications"

const notification = useNotification()

export default {
	async login({ commit }, { email, password }) {
		try {
			const { accessToken, user } = await loginWithEmail({ email, password })

			await commit("setUser", { user })
			await commit("setIsLogged", true)
			localStorage.setItem("jwt", accessToken)
		} catch(e) {
			throw new Error(e.response?.data.message || e.message)
		}
	},
	async signup({ commit }, user) {
		try {
			await addUser(user)
		} catch(e) {
			throw new Error(e.response?.data.message || e.message)
		}
	},
	async forgotPassword({ commit }, { email }) {
		try {
			await forgotPassword(email)

			notification.success("Un e-mail contenant des instructions, vous a été envoyé.")
		} catch(e) {
			const errorMessage = e.response?.data.message === "Invalid email" ? "Cet e-mail n'existe pas." : "Erreur."

			notification.error(errorMessage)
			throw new Error(e.response?.data.message || e.message)
		}
	},
	async resetPassword({ commit }, payload) {
		try {
			await resetPassword(payload)

			notification.success("Mot de passe changé avec succès.")
		} catch(e) {
			const errorMessage = e.response?.data.message === "Current password wrong" ? "Mauvais mot de passe." : "Erreur."

			notification.error(errorMessage)
			throw new Error(e.response?.data.message || e.message)
		}
	},
	async editUser({ commit }, { id, user }) {
		try {
			await editUser(id, user)
			user.street = user.MailingStreet
			user.postalCode = user.MailingPostalCode
			user.city = user.MailingCity
			delete user.MailingStreet
			delete user.MailingPostalCode
			delete user.MailingCity

			await commit("setUser", { user })
			notification.success("Information modifiée avec succès.")
		} catch(e) {
			notification.error("Erreur lors de la modification des informations.")
			throw new Error(e.response?.data.message || e.message)
		}
	},
	async getMissions({ commit }) {
		try {
			await findMissionsForUserConnected()
			await findRequestsForUserConnected()

			await commit("setMissions", {
				missions: await findMissionsForUserConnectedFilteredByStatus(MISSIONS_STATUS.NEW),
				status: "new"
			})
			await commit("setMissions", {
				missions: await findMissionsForUserConnectedFilteredByStatus(MISSIONS_STATUS.UPCOMING),
				status: "upcoming"
			})
			await commit("setMissions", {
				missions: await findMissionsForUserConnectedFilteredByStatus(MISSIONS_STATUS.PENDING),
				status: "pending"
			})
			await commit("setMissions", {
				missions: await findMissionsForUserConnectedFilteredByStatus(MISSIONS_STATUS.PASSED),
				status: "passed"
			})
		} catch(e) {
			throw new Error(e.response?.data.message || e.message)
		}
	},
	async acceptMission({ commit }, missionId) {
		try {
			await acceptMission(missionId)

			await commit("acceptMission", missionId)
			notification.success("Candidature acceptée, votre mission est en attente.")
		} catch(e) {
			notification.error("Erreur lors de l'acceptation de la mission.")
			throw new Error(e.response?.data.message || e.message)
		}
	},
	async refuseMission({ commit }, missionId) {
		try {
			await refuseMission(missionId)

			await commit("refuseMission", missionId)
			notification.success("Mission refusée avec succès.")
		} catch(e) {
			notification.error("Erreur lors du refus de la mission.")
			throw new Error(e.response?.data.message || e.message)
		}
	},
	async uploadDocument({ commit }, { document, userDocument }) {
		try {
			const data = await uploadDocument(document)

			commit("setUserDocument", data)
			notification.success("Document envoyé avec succès.")
			window.location.reload()
		} catch(e) {
			notification.error("Erreur lors de l'envoi du document.")
			throw new Error(e.response?.data.message || e.message)
		}
	},
	async getUserDocument({ commit }) {
		try {
			const userDocuments = await getDocumentBelongsToUser()

			commit("setUserDocuments", userDocuments)
		} catch(e) {
			notification.error("Erreur lors de la récupération des documents.")
			throw new Error(e.response?.data.message || e.message)
		}
	},
	async deleteDocument({ commit }, documentId) {
		try {
			await deleteDocumentFromUser(documentId)

			commit("deteleUserDocument", documentId)
			notification.success("Document supprimé avec succès.")
			window.location.reload()
		} catch(e) {
			notification.error("Erreur lors de la supression du document.")
			throw new Error(e.response?.data.message || e.message)
		}
	},
	async getOrganizations({ commit }) {
		try {
			const organizations = await getOrganizations()

			commit("setOrganizations", organizations)
		} catch(e) {
			throw new Error(e.response?.data.message || e.message)
		}
	},
	async saveOrganisation({ commit }, { id, value }) {
		try {
			await saveOrganizations(id, {
				xStatus__c: value
			})

			commit("setOrganizationById", { id, newStatus: value })
			notification.success(value === "Accepted" ? "Établissement associé avec succès." : "Établissement désassocié avec succès.")
		} catch(e) {
			throw new Error(e.response?.data.message || e.message)
		}
	},
	async registerDevice({ commit }, { userId }) {
		/*try {
			let notification = false

			if(!("Notification" in window)) {
				console.log("This browser does not support desktop notification")
			}
			// Let's check whether notification permissions have already been granted
			else if(Notification.permission === "granted") {
				notification = true
			}
			// Otherwise, we need to ask the user for permission
			else if(Notification.permission !== "denied") {
				const permission = await Notification.requestPermission()

				if(permission === "granted") {
					notification = true
				}
			}

			if(localStorage.getItem("fcmTokenRegistered") !== "true" && notification && navigator.userAgent.match(/Windows/i) === "Windows") {
				const token = await firebaseMessaging.getToken()
				const existToken = await getDeviceByToken(token)

				if(!existToken) {
					await saveDevice({ userId, token })

					localStorage.setItem("fcmTokenRegistered", "true")
				}
			}
		} catch(e) {
			throw new Error(e.response?.data.message || e.message)
		}*/
	},
	async getNotifications({ commit }) {
		try {
			const notifications = await getNotifications()

			commit("setNotifications", notifications)
		} catch(e) {
			throw new Error(e.response?.data.message || e.message)
		}
	},
	async markAllNotificationAsRead({ commit, getters }) {
		try {
			const notifications = [...getters.getNotificationsNotRead]
			for(let notification of notifications) {
				await markAllNotificationAsRead(notification.key)
				commit("deleteNotification", notification)
			}
		} catch(e) {
			throw new Error(e.response?.data.message || e.message)
		}
	}
}
