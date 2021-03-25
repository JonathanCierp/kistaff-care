import axios from "axios"

const useAxiosInstance = () => {
	return axios.create({
		baseURL: "https://kistaff-api-prod.herokuapp.com"//import.meta.env.VITE_API_URL
	})
}

const useAxiosAuthInstance = () => {
	return axios.create({
		headers: {
			Authorization: localStorage.getItem("jwt")
		},
		baseURL: "https://kistaff-api-prod.herokuapp.com"//import.meta.env.VITE_API_URL
	})
}

export {
	useAxiosInstance,
	useAxiosAuthInstance
}