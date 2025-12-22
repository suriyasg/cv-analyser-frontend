import { useLocation } from "react-router-dom";
import CVViewer from "@/components/dashboard/CVViewer";

function CVPDFPage() {
	const location = useLocation();
	return (
		<div className="h-screen flex justify-center">
			<CVViewer url={location.pathname} />
		</div>
	);
}

export default CVPDFPage;
