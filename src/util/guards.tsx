import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth";

export const IsLoggedInGuard = () => {
	const auth = useAuth();

	if (!auth.isAuthenticated) {
		return <Navigate to="/auth/login" />;
	}
	return <Outlet />;
};

export const IsLoggedOutGuard = () => {
	const auth = useAuth();

	if (auth.isAuthenticated) {
		return <Navigate to="/dashboard" />;
	}
	return <Outlet />;
};
