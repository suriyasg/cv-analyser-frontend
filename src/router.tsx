import { createBrowserRouter, Navigate } from "react-router-dom";
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
		],
	},
	{
		path: "*",
		element: <Navigate replace to="/" />,
	},
]);
