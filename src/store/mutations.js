export default {
	setUser(state, { user, isNew = false }) {
		state.user = isNew ? user : {...state.user, user}
	},
	setIsLogged(state, isLogged) {
		state.isLogged = isLogged
	}
}