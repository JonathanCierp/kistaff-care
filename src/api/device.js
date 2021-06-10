import { useAxiosAuthInstance } from "../plugins/axios"

const device = () => {
	return navigator.userAgent.match(/Android/i) ? "Android" :
		navigator.userAgent.match(/BlackBerry/i) ? "BlackBerry" :
		navigator.userAgent.match(/iPhone/i) ? "iPhone" :
		navigator.userAgent.match(/iPad/i) ? "iPad" :
		navigator.userAgent.match(/iPod/i) ? "iPod" :
		navigator.userAgent.match(/Opera Mini/i) ? "Opera Mini" :
		navigator.userAgent.match(/IEMobile/i) ? "IEMobile" :
		navigator.userAgent.match(/Windows Phone/i) ? "Windows Phone" :
		navigator.userAgent.match(/Windows/i) ? "Windows" : null
}
const saveDevice = async ({ userId, token }) => {
	await useAxiosAuthInstance().post("/devices",  {
		"xEmployee__c": userId,
		"xModel__c": device(),
		"xCategory__c": "Desktop",
		"xToken__c": token
	})
}
const getDevices = async () => {
	const { data } = await useAxiosAuthInstance().get("/devices?$limit=1000")

	return data
}
const getDeviceByToken = async (token) => {
	const devices = await getDevices()

	return devices.find(device => device.xToken__c === token)
}

export {
	saveDevice,
	getDevices,
	getDeviceByToken
}
