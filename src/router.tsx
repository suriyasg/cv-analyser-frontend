import { createBrowserRouter, Navigate } from "react-router-dom";
import CVPDFPage from "./pages/cvpdf/cv-pdf-page";
import Dashboard from "./pages/dashboard/dashboard";
import { HomePage } from "./pages/home/home-page";
import { LoginPage } from "./pages/login/login-page";
import { NotFound } from "./pages/NotFound/not-found-page";
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
				path: "/dashboard",
				element: <Dashboard />,
			},
			{
				path: "/media/uploads/*",
				element: <CVPDFPage />,
			},
		],
	},

	// Public routes
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/home",
		element: <Navigate replace to="/" />,
	},
	{
		path: "/page-not-found",
		element: <NotFound />,
	},
	// Catch-all
	{
		path: "*",
		element: <Navigate replace to="/page-not-found" />,
	},
]);
