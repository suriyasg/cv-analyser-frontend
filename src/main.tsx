import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Providers } from "./providers";
import { router } from "./router";

const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<Providers>
				<RouterProvider router={router} />
			</Providers>
		</StrictMode>,
	);
}
