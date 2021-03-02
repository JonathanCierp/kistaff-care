import { loginWithEmail } from "../api/auth"
import { editUser } from "../api/user"
import { useNotification } from "../components/custom/notification/useNotification"

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
	async editUser({ commit }, { id, user }) {
		try {
			await editUser(id)
			user.street = user.MailingStreet
			user.postalCode = user.MailingPostalCode
			user.city = user.MailingCity
			delete user.MailingStreet
			delete user.MailingPostalCode
			delete user.MailingCity

			await commit("setUser", { user })
			notification.success("Informations modifiées avec succès.")
		} catch(e) {
			notification.error("Erreur lors de la modification des informations.")
			throw new Error(e.response?.data.message || e.message)
		}
	}
}