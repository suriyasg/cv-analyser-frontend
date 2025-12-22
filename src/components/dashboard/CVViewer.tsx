import { useEffect, useState } from "react";
import { api } from "@/util/api";

function CVViewer({ url }: { url: string }) {
	const [pdfUrl, setPdfUrl] = useState<string | null>(null);
	useEffect(() => {
		api
			.get(url, { responseType: "blob" })
			.then((res) => {
				const blob = res.data;
				const objectUrl = URL.createObjectURL(blob);
				setPdfUrl(objectUrl);
			})
			.catch((err) => {
				console.error("Failed to load PDF", err);
			});
	}, [url]);

	if (!pdfUrl) return <p>Loading PDF…</p>;

	return (
		<object
			className="h-screen"
			data={pdfUrl}
			height="100%"
			type="application/pdf"
			width="100%"
		>
			<p>
				Alternative text - include a link <a href={url}>to the PDF!</a>
			</p>
		</object>
	);
}

export default CVViewer;
