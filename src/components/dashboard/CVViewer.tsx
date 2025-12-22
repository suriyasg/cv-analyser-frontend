import { Spinner } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { useEffect, useState } from "react";
import { api } from "@/util/api";

function CVViewer({ url }: { url: string }) {
	const [pdfUrl, setPdfUrl] = useState<string | null>(null);
	const [isLoading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		api
			.get(url, { responseType: "blob" })
			.then((res) => {
				const blob = res.data;
				const objectUrl = URL.createObjectURL(blob);
				setPdfUrl(objectUrl);
			})
			.catch(() => {
				addToast({
					title: "Error",
					description: "Failed to load CV PDF",
					color: "danger",
				});
			});
		setLoading(false);
	}, [url]);

	if (isLoading)
		return (
			<div className="flex flex-col justify-center">
				<p className="font-black text-xl text-center mb-6">Loading PDF</p>
				<Spinner color="primary" />
			</div>
		);
	if (!pdfUrl)
		return (
			<div className="flex flex-col justify-center items-center">
				<h1 className="text-5xl font-black">File Not found</h1>
				<div>
					<svg
						className="size-20"
						fill="none"
						stroke="currentColor"
						strokeWidth={1.5}
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<title>x</title>
						</path>
					</svg>
				</div>
			</div>
		);
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
