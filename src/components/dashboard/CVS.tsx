import { Button, useDisclosure } from "@heroui/react";
import { Select, SelectItem } from "@heroui/select";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "@/util/api";
import AddScanModal from "./AddScanModal";

interface CVWithScans {
	id: number;
	title: string;
	file: string;
	owner_id: number;
	created: Date;
	modified: Date;
	scans: partialScan[];
}

interface partialScan {
	id: number;
	title: string;
	created: Date;
	scan_status: string;
}

interface CVSProps {
	setScanId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const pageSizes = [
	{ key: 1, label: "1" },
	{ key: 2, label: "2" },
	{ key: 3, label: "3" },
	{ key: 4, label: "4" },
];

function CVS({ setScanId }: CVSProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [cvs, setCVs] = useState<CVWithScans[]>([]);
	const [addScanCVId, setAddScanCVId] = useState<number>();
	const [pageSize, SetPageSize] = useState<string>("1");
	const [next, setNext] = useState<boolean>(true);
	const [previous, setPrevious] = useState<boolean>(false);

	const [addScanCVTitle, setAddScanCVTitle] = useState<string>();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	useEffect(() => {
		let url = "/cvs/";
		const page = searchParams.get("page") || "1";
		if (page) {
			url = `${url}?page=${page}`;
		}
		if (pageSize) {
			url = `${url}&page_size=${pageSize}`;
		}
		api
			.get(url)
			.then((response) => {
				// console.log(response.data);
				setCVs(response.data.results);
				setNext(!!response.data.next);
				setPrevious(!!response.data.previous);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [searchParams, pageSize]);
	return (
		<div className="w-full p-2">
			<AddScanModal
				cv_id={addScanCVId}
				cv_title={addScanCVTitle}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			/>
			<div className="p-6" id="header">
				<h1 className="text-black dark:text-white text-3xl lg:text-2xl font-black leading-tight tracking-[-0.033em]">
					CV Scans
				</h1>
				<p className="text-gray-400 dark:text-gray-400 text-base lg:text-medium font-normal leading-relaxed max-w-2xl">
					Your CVs and Scans Statuses
				</p>
			</div>
			<div>
				{cvs.map((cv) => {
					return (
						<div className="flex flex-col p-2" key={cv.id}>
							<div className="w-full flex flex-row border-b-1 p-2 border-black mb-6">
								<div className="w-14/16 font-extrabold">{cv.title}</div>
								<div className="w-1/16 flex justify-end pr-2">
									<Link
										className="italic text-blue-500 underline hover:text-blue-700"
										target="_blank"
										to={{ pathname: cv.file }}
									>
										<svg
											aria-hidden="true"
											className="icon"
											fill="none"
											focusable="false"
											height="24"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											width="24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
											<path d="M15 3h6v6"></path>
											<path d="M10 14L21 3"></path>
											<title>View CV</title>
										</svg>
									</Link>
								</div>
								<div className="w-1/16 text-end">
									<button
										className="rounded-md text-white p-1 hover:bg-gray-200"
										onClick={() => {
											setAddScanCVId(cv.id);
											setAddScanCVTitle(cv.title);
											onOpen();
										}}
										title="Add new scan"
										type="button"
									>
										<svg
											className="size-6 text-black"
											fill="none"
											stroke="currentColor"
											strokeWidth={1.5}
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<title>add new scan</title>
											<path
												d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</button>
								</div>
							</div>

							<div className="w-full flex flex-col mb-2">
								{cv.scans.length === 0 ? (
									<div className="text-center text-gray-500 italic">
										No Scans
									</div>
								) : (
									cv.scans.map((scan) => {
										return (
											<div
												className="w-full flex flex-row items-center border-1 border-gray-300 rounded-lg m-1 p-2"
												key={scan.id}
											>
												<div className="w-2/5 font-semibold">{scan.title}</div>
												<div className="w-1/5">
													<span
														className={`rounded-lg text-center text-xs p-1 ${getScanStatusColour(scan.scan_status)}`}
													>
														{scan.scan_status}
													</span>
												</div>
												<div className="w-1/5 text-center italic text-small text-gray-400">
													{String(scan.created)}
												</div>
												<div className="w-1/5 flex justify-end">
													<button
														className="p-1 bg-blue-400 rounded-md text-white hover:bg-blue-700"
														onClick={() => {
															setScanId(scan.id);
															setSearchParams({
																...searchParams,
																currentTab: "ScanResults",
															});
														}}
														type="button"
													>
														Scan Result
													</button>
												</div>
											</div>
										);
									})
								)}
							</div>
						</div>
					);
				})}
			</div>
			<div id="pagination">
				<Button
					className={`p-1 m-2 ${!previous ? "cursor-not-allowed" : ""}`}
					disabled={!previous}
					onPress={() => {
						const currentPage = searchParams.get("page")
							? Number(searchParams.get("page"))
							: 0;
						setSearchParams({
							...searchParams,
							currentTab: "CVSCANS",
							page: String(currentPage - 1),
						});
					}}
				>
					Previous
				</Button>
				<Button
					className={`p-1 m-2 ${!next ? "cursor-not-allowed" : ""}`}
					disabled={!next}
					onPress={() => {
						const currentPage = searchParams.get("page")
							? Number(searchParams.get("page"))
							: 0;
						setSearchParams({
							...searchParams,
							currentTab: "CVSCANS",
							page: String(currentPage + 1),
						});
					}}
				>
					Next
				</Button>
				<Select
					className="max-w-xs"
					label="Page size"
					onChange={(event) => {
						SetPageSize(event.target.value);
					}}
					placeholder="Select page size"
				>
					{pageSizes.map((page) => (
						<SelectItem key={page.key}>{page.label}</SelectItem>
					))}
				</Select>
			</div>
		</div>
	);
}

function getScanStatusColour(status: string): string {
	switch (status) {
		case "PENDING":
			return "bg-red-300";
		case "STARTED":
			return "bg-amber-300";
		case "PROCESSING":
			return "bg-blue-300";
		case "FINISHED":
			return "bg-green-300";
		case "COMPLETED":
			return "bg-green-300";

		default:
			return "";
	}
}

export default CVS;
