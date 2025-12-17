import axios from "axios";
import { useAuthStore } from "@/util/auth";

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
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
	(error) => {
		if (error.response?.status === 401) {
			// if access token error try to refresh it
			if (error.response.data.errors[0].code === "token_not_valid") {
				const token = useAuthStore.getState().token;
				const refresh = useAuthStore.getState().refresh;
				api
					.post("/api/v1/auth/token/refresh/", {
						access: token,
						refresh,
					})
					.then((response) => {
						useAuthStore.getState().setAuth(response.data.access);
					})
					.catch(() => {
						// refreshing the token is also result in error log out user and make them log in again
						// console.log(error);
						useAuthStore.getState().logout();
						window.location.href = "/login";
					});
			}
		}
		return Promise.reject(error);
	},
);
