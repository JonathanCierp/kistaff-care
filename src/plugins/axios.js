import axios from "axios"

const useAxiosInstance = axios.create({
	baseURL: "https://kistaff-api-prod.herokuapp.com"
})

const useAxiosAuthInstance = axios.create({
	headers: {
		Authorization: localStorage.getItem("jwt")
	},
	baseURL: "https://kistaff-api-prod.herokuapp.com"
})

export {
	useAxiosInstance,
	useAxiosAuthInstance
}