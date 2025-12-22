import axios from "axios";
import { useAuthStore } from "@/util/auth";

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
});

// Request interceptor
api.interceptors.request.use(
	(config) => {
		const token = useAuthStore.getState().token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Response interceptor
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401) {
			// if access token error try to refresh it
			// if original request was made to access blob or other content type we won't get
			// nice json to access data.errors[0] we will have to parse it so we are skipping that check
			// if (error.response.data.errors[0].code === "token_not_valid")
			const token = useAuthStore.getState().token;
			const refresh = useAuthStore.getState().refresh;

			// using axios instead of api (axios instance we created) to avoid loops
			// /api appended for vite proxy to redirect to django
			const response = await axios.post("/api/api/v1/auth/token/refresh/", {
				access: token,
				refresh,
			});
			if (response.status === 200) {
				useAuthStore.getState().setAuth(response.data.access);
				originalRequest.headers = {
					...originalRequest.headers,
					Authorization: `Bearer ${response.data.access}`,
				};
				const res = await axios.request(originalRequest);
				return res;
			} else {
				// refreshing the token is also result in error log out user and make them log in again
				useAuthStore.getState().logout();
				window.location.href = "/login";
			}
		}
		return Promise.reject(error);
	},
);
