import axios from "axios"

const useAxiosInstance = () => {
	return axios.create({
		baseURL: "https://kistaff-api-prod.herokuapp.com"
	})
}

const useAxiosAuthInstance = () => {
	return axios.create({
		headers: {
			Authorization: localStorage.getItem("jwt")
		},
		baseURL: "https://kistaff-api-prod.herokuapp.com"
	})
}

export {
	useAxiosInstance,
	useAxiosAuthInstance
}