import axios from "axios";
import store from "./store";
import { unsetUser } from "./Stores/authSlice";
import { Platform } from "react-native";

const host =
	Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://127.0.0.1:3000";

const axiosInstance = axios.create({
	baseURL: host,
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
				store.dispatch(unsetUser());
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
