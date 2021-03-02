import { Notification } from "./notification.js"

const useNotification = (globalOptions = {}) => {
	return new Notification(globalOptions)
}

export {
	useNotification
}