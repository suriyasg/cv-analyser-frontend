import { useState } from "react";
import CVS from "@/components/dashboard/CVS";
import NewScan from "@/components/dashboard/NewScan";
import ScanResults from "@/components/dashboard/ScanResults";
import Sidebar from "@/components/dashboard/Sidebar";

function Dashboard() {
	const [active, setActive] = useState<"NewScan" | "CVSCANS" | "ScanResults">(
		"NewScan",
	);

	const [scanId, setScanId] = useState<number | undefined>();
	return (
		<div className="flex flex-row h-full w-full p-2">
			<Sidebar active={active} setActive={setActive} />
			{active === "NewScan" && <NewScan />}
			{active === "CVSCANS" && (
				<CVS setActive={setActive} setScanId={setScanId} />
			)}
			{active === "ScanResults" && (
				<ScanResults scanId={scanId} setScanId={setScanId} />
			)}
		</div>
	);
}

export default Dashboard;
