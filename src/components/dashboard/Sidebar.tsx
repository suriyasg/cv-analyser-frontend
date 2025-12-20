import { Button } from "@heroui/react";
import { useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/util/auth";

interface SidebarProps {
	active: "NewScan" | "CVSCANS" | "ScanResults";
}

function Sidebar({ active }: SidebarProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	return (
		<div className="bg-gray-50 w-1/6 h-screen overflow-y-auto flex flex-col pr-2">
			<div className="mb-6" id="header">
				<h1 className="text-black dark:text-white text-3xl lg:text-2xl font-black leading-tight tracking-[-0.033em]">
					CV Analyser
				</h1>
			</div>
			<div className="p-1" id="selector-btns">
				<button
					className={`w-full hover:bg-blue-100 rounded-md mb-1 flex flex-row p-2 ${active === "NewScan" ? "bg-blue-100" : ""}`}
					onClick={() =>
						setSearchParams({ ...searchParams, currentTab: "NewScan" })
					}
					type="button"
				>
					<div className="w-1/4 flex justify-center">
						<svg
							className="size-6"
							fill="none"
							stroke="currentColor"
							strokeWidth={1.5}
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>+</title>
							<path
								d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
					<div className="w-3/4 text-start">New Scan</div>
				</button>

				<button
					className={`w-full hover:bg-blue-100 rounded-md mb-1 flex flex-row p-2 ${active === "CVSCANS" ? "bg-blue-100" : ""}`}
					onClick={() =>
						setSearchParams({ ...searchParams, currentTab: "CVSCANS" })
					}
					type="button"
				>
					<div className="w-1/4 flex justify-center">
						{/* https://sidekickicons.com/?q=his */}
						<svg
							aria-hidden="true"
							className="size-6"
							data-slot="icon"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12.252 6v6h4.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
							<path
								d="M5.887 5.636A9 8.996 45 0 1 16.75 4.208a9 8.996 45 0 1 4.194 10.123 9 8.996 45 0 1-8.69 6.667 9 8.996 45 0 1-8.693-6.67m2.327-8.692L3.38 8.143M3.363 3.15v5.013m0 0h5.013"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
						</svg>
					</div>
					<div className="w-3/4 text-start">CV Scans</div>
				</button>

				<button
					className={`w-full rounded-md mb-1 flex flex-row p-2 ${active === "ScanResults" ? "bg-blue-100" : ""}`}
					disabled
					title="select a scan result in CV Scans to see results"
					type="button"
				>
					<div className="w-1/4 flex justify-center">
						{/* https://sidekickicons.com/?q=his */}
						<svg
							aria-hidden="true"
							className="size-6"
							data-slot="icon"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
						</svg>
					</div>
					<div className="w-3/4 text-start">Scan Results</div>
				</button>
			</div>
			<Button onPress={() => useAuthStore.getState().logout()}>logout</Button>
		</div>
	);
}

export default Sidebar;
