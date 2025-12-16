import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import { HomePage } from "./pages/home/home-page";
import { LoginPage } from "./pages/login/login-page";
import { IsLoggedInGuard, IsLoggedOutGuard } from "./util/guards";

export const router = createBrowserRouter([
	{
		element: <IsLoggedOutGuard />,
		children: [
			{
				path: "/auth/login",
				element: <LoginPage />,
			},
		],
	},
	{
		element: <IsLoggedInGuard />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/dashboard",
				element: <Dashboard />,
			},
		],
	},
	{
		path: "*",
		element: <Navigate replace to="/" />,
	},
]);
