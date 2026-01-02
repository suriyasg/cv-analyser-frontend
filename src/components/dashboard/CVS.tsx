import { Button, Input, useDisclosure } from "@heroui/react";
import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "@/util/api";
import AddScanModal from "./AddScanModal";

interface CVWithScans {
	id: number;
	title: string;
	file_url: string;
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

const pageSizes = [
	{ key: 1, label: "1" },
	{ key: 2, label: "2" },
	{ key: 3, label: "3" },
	{ key: 4, label: "4" },
];

function CVS() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [cvs, setCVs] = useState<CVWithScans[]>([]);
	const [addScanCVId, setAddScanCVId] = useState<number>();
	const [pageSize, SetPageSize] = useState<string>("1");
	const [next, setNext] = useState<boolean>(true);
	const [previous, setPrevious] = useState<boolean>(false);
	const [search, setSearch] = useState<string>("");

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
		if (search) {
			url = `${url}&search=${search}`;
		}
		api
			.get(url)
			.then((response) => {
				setCVs(response.data.results);
				setNext(!!response.data.next);
				setPrevious(!!response.data.previous);
			})
			.catch((error: Error) => {
				addToast({
					title: "Error",
					description: error.message || "Error occured while fetching CVs",
					color: "danger",
				});
			});
	}, [searchParams, pageSize, search]);

	const onSearch = () => {
		setSearchParams((previous) => {
			previous.set("search", search);
			return previous;
		});
	};

	return (
		<div className="w-full p-2 flex flex-col h-screen bg-gray-200 gap-1">
			<AddScanModal
				cv_id={addScanCVId}
				cv_title={addScanCVTitle}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			/>
			<div className="p-2 h-1/12 bg-white shadow-sm rounded" id="header">
				<h1 className="text-black dark:text-white text-3xl lg:text-2xl font-black leading-tight tracking-[-0.033em]">
					CV Scans
				</h1>
				<p className="text-gray-400 dark:text-gray-400 text-base lg:text-medium font-normal leading-relaxed max-w-2xl">
					Your CVs and Scans Statuses
				</p>
			</div>
			<div
				className="p-4 h-1/12 w-full bg-white rounded flex flex-row justify-center items-center gap-1"
				id="search"
			>
				<Input
					className="w-9/10 m-0"
					onChange={(event) => {
						setSearch(event.target.value);
					}}
				/>
				<Button className="w-1/10" onClick={onSearch}>
					Search
				</Button>
			</div>
			<div className="relative h-9/12 flex flex-col">
				<div className="max-h-fit overflow-y-scroll shadow-sm rounded pl-2 pr-2 bg-white">
					{cvs.map((cv) => {
						return (
							<div className="flex flex-col p-2" key={cv.id}>
								<div className="w-full flex flex-row border-b-1 p-2 border-black mb-6">
									<div className="w-14/16 font-extrabold">{cv.title}</div>
									<div className="w-1/16 flex justify-end pr-2">
										<Link
											className="italic text-blue-500 underline hover:text-blue-700"
											target="_blank"
											to={{ pathname: cv.file_url }}
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
													<div className="w-1/5 font-semibold">
														{scan.title}
													</div>
													<div className="w-1/5 flex justify-center">
														<span
															className={`rounded-lg text-center text-xs p-1 ${getScanStatusColour(scan.scan_status)}`}
														>
															{scan.scan_status}
														</span>
													</div>
													<div className="w-1/5 text-center italic text-sm text-gray-400">
														{String(scan.created)}
													</div>
													<div className="w-1/5 flex justify-center">
														<button
															className="p-1 bg-blue-400 rounded-md text-white hover:bg-blue-700"
															onClick={() => {
																setSearchParams({
																	...searchParams,
																	scanId: String(scan.id),
																	currentTab: "ScanResults",
																});
															}}
															type="button"
														>
															Scan Result
														</button>
													</div>
													<div className="w-1/5 flex justify-center">
														<button
															className="p-1 text-red-400 rounded-md hover:text-red-700 hover:bg-gray-200"
															onClick={() => {}}
															type="button"
														>
															<svg
																className="size-6"
																fill="none"
																stroke="currentColor"
																strokeWidth={1.5}
																viewBox="0 0 24 24"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
																<title>delete</title>
															</svg>
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
				<div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-gray-50 to-transparent"></div>
				<div className="absolute top-0 left-0 right-0 h-10 bg-linear-to-b from-gray-50 to-transparent"></div>
			</div>
			<div
				className="flex flex-row items-center bottom-0 h-1/12"
				id="pagination"
			>
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
							: 1;
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
					className="max-w-xs h-20 m-0 justify-center"
					label="Page size"
					onChange={(event) => {
						SetPageSize(event.target.value);
					}}
					size="sm"
					// placeholder="Select page size"
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
			return "bg-gray-300";
	}
}

export default CVS;
