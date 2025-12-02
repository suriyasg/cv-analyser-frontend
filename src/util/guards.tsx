import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth";

export const IsLoggedInGuard = () => {
	const auth = useAuth();
	console.log(auth);

	if (!auth.isAuthenticated) {
		return <Navigate to="/auth/login" />;
	}
	return <Outlet />;
};

export const IsLoggedOutGuard = () => {
	const auth = useAuth();

	if (auth.isAuthenticated) {
		return <Navigate to="/" />;
	}
	return <Outlet />;
};
