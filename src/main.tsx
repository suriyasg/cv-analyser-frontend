import { HeroUIProvider } from "@heroui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<HeroUIProvider>
				<RouterProvider router={router} />
			</HeroUIProvider>
		</StrictMode>,
	);
}
