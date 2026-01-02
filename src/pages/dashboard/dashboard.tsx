import { useSearchParams } from "react-router-dom";
import CVS from "@/components/dashboard/CVS";
import NewScan from "@/components/dashboard/NewScan";
import ScanResults from "@/components/dashboard/ScanResults";
import Sidebar from "@/components/dashboard/Sidebar";

function Dashboard() {
	const [searchParams] = useSearchParams();
	const currentTab = searchParams.get("currentTab");
	const currentTabEnum = getCurrentTab(currentTab);
	return (
		<div className="flex flex-row h-full w-full">
			<Sidebar active={currentTabEnum} />
			{currentTabEnum === "NewScan" && <NewScan />}
			{currentTabEnum === "CVSCANS" && <CVS />}
			{currentTabEnum === "ScanResults" && <ScanResults />}
		</div>
	);
}

function getCurrentTab(
	string: string | null,
): "NewScan" | "CVSCANS" | "ScanResults" {
	switch (string) {
		case "NewScan":
			return "NewScan";
		case "CVSCANS":
			return "CVSCANS";
		case "ScanResults":
			return "ScanResults";

		default:
			return "NewScan";
	}
}

export default Dashboard;
