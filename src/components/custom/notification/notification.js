import { createApp } from "vue"
import CustomNotification from "./CustomNotification.vue"
import { getId } from "../../../utils"

const NOTIFICATION_TYPE = {
	DEFAULT: "default",
	SUCCESS: "success",
	ERROR: "error",
	WARNING: "warning",
	INFO: "info"
}
const NOTIFICATION_POSITION = {
	TOP_LEFT: "top-left",
	TOP: "top",
	TOP_RIGHT: "top-right",
	BOTTOM_LEFT: "bottom-left",
	BOTTOM: "bottom",
	BOTTOM_RIGHT: "bottom-right"
}
const NOTIFICATION_TRANSITION = {
	TOP_LEFT: "slide-right",
	TOP: "slide-down",
	TOP_RIGHT: "slide-left",
	BOTTOM_LEFT: "slide-right",
	BOTTOM: "slide-up",
	BOTTOM_RIGHT: "slide-left"
}

class Notification {
	instance = document.createElement("div")
	instances = []
	options = {}

	constructor(_options) {
		this.options = _options
	}

	default = (message, options) => {
		this.options = options || {}
		this.options.type = NOTIFICATION_TYPE.DEFAULT
		return this._show(message)
	}

	/**
	 * Show a Toast with Success Style
	 *
	 * @param message
	 * @param options
	 * @returns {*}
	 */
	success = (message, options) => {
		this.options = options || {}
		this.options.type = NOTIFICATION_TYPE.SUCCESS
		return this._show(message)
	}

	error = (message, options) => {
		this.options = options || {}
		this.options.type = NOTIFICATION_TYPE.ERROR
		return this._show(message)
	}

	warning = (message, options) => {
		this.options = options || {}
		this.options.type = NOTIFICATION_TYPE.WARNING
		return this._show(message)
	}

	info = (message, options) => {
		this.options = options || {}
		this.options.type = NOTIFICATION_TYPE.INFO
		return this._show(message)
	}

	onClose = (instanceId) => {
		let instance = this.instances.find(instance => instance.id === instanceId)
		this.instances = [...this.instances.filter(instance => instance.id !== instanceId)]

		if(instance) {
			instance.remove()
		}

		this.recalcNotificationPositioning()
	}

	createNotificationContainer = () => {
		const app = createApp(CustomNotification, {
			...this.options
		})

		const component = app.mount(document.createElement("div"))
		setTimeout(() => {
			let container = this.notificationPositioning(component)
			component.$el.id = `custom-notification-${getId()}`

			document.body.appendChild(container)
			this.instances = [...this.instances, component.$el]
		}, 0)
	}

	_show = (message) => {
		this.options.message = message || this.options.message
		this.options.onClose = this.onClose

		if(typeof this.options !== "object") {
			console.error("Options should be a type of object. given : " + this.options)
			return null
		}

		this.createNotificationContainer()
	}

	notificationPositioning = (element) => {
		const baseOffset = 16
		let totalOffsetTop = baseOffset
		let props = element.$props

		for (let instance of this.instances) {
			totalOffsetTop += instance.offsetHeight + baseOffset
		}

		if(props.position.includes("top")) {
			element.$el.style.top = totalOffsetTop + "px"
		} else if(props.position.includes("bottom")) {
			element.$el.style.bottom = totalOffsetTop + "px"
		}

		return element.$el
	}

	recalcNotificationPositioning = () => {
		const baseOffset = 16
		let totalOffsetTop = baseOffset

		for (let instance of this.instances) {
			if(instance.className.includes("top")) {
				instance.style.top = totalOffsetTop + "px"
			} else if(instance.className.includes("bottom")) {
				instance.style.bottom = totalOffsetTop + "px"
			}
			totalOffsetTop += instance.offsetHeight + baseOffset
		}
	}
}

export {
	NOTIFICATION_TYPE,
	NOTIFICATION_POSITION,
	NOTIFICATION_TRANSITION,
	Notification
}