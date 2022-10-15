import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URI,
	withCredentials: true,
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response.status === 401) {
			if (
				error.response.data.message === "Session does not exist" ||
				error.response.data.message === "Password has been changed"
			) {
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
