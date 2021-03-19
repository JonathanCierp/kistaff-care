import { normalize } from "../utils"

export default {
	filterMissions: state => (type, v = "") => {
		let missions = []

		if(v !== "") {
			missions = state.missions[type].missions.filter(mission => {
				const startDate = (new Date(mission.job.start_date)).toLocaleDateString("fr-FR", {
					weekday: "long",
					day: "numeric",
					month: "long"
				})
				
				return normalize(mission.job.name).includes(normalize(v)) ||
					normalize(mission.organization.name).includes(normalize(v)) ||
					normalize(startDate).includes(normalize(v))
			})
		}else {
			missions = state.missions[type].missions
		}

		return { missions, length: missions.length }
	},
	getDocumentByDescription: state => (description) => {
		return state.userDocuments.find(userDocument => userDocument.Description === description)
	},
	filterOrganization: state => (v) => {
		return state.organizations.filter(organization =>
			normalize(organization.Account.Name).includes(normalize(v)) ||
			normalize(organization.Account.BillingPostalCode).includes(normalize(v)) ||
			normalize(organization.Account.BillingCity).includes(normalize(v))
		)
	}
}
