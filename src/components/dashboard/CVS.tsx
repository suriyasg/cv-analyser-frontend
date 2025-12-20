import { useDisclosure } from "@heroui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
	created: Date;
	scan_status: string;
}

interface CVSProps {
	setScanId: React.Dispatch<React.SetStateAction<number | undefined>>;
	setActive: React.Dispatch<
		React.SetStateAction<"NewScan" | "CVSCANS" | "ScanResults">
	>;
}

function CVS({ setScanId, setActive }: CVSProps) {
	const [cvs, setCVs] = useState<CVWithScans[]>([]);
	const [addScanCVId, setAddScanCVId] = useState<number>();
	const [addScanCVTitle, setAddScanCVTitle] = useState<string>();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	useEffect(() => {
		api
			.get("/cvs/")
			.then((response) => {
				// console.log(response.data);
				setCVs(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
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
				{cvs.map((cv, index) => {
					return (
						<div className="flex flex-col p-2" key={cv.id}>
							<div className="w-full flex flex-row border-b-1 p-2 border-black mb-6">
								<div className="w-2/4 font-extrabold">{cv.title}</div>
								<div className="w-1/4 text-end pr-2">
									<Link
										className="italic text-blue-500 underline hover:text-blue-700"
										target="_blank"
										to={{ pathname: cv.file }}
									>
										View CV
									</Link>
								</div>
								<div className="w-1/4 text-end">
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
												<div className="w-1/5 ">
													<span
														className={`rounded-lg text-center text-xs p-2 ${getScanStatusColour(scan.scan_status)}`}
													>
														{scan.scan_status}
													</span>
												</div>
												<div className="w-3/5 text-center italic text-gray-400">
													{String(scan.created)}
												</div>
												<div className="w-1/5 flex justify-end">
													<button
														className="p-1 bg-blue-400 rounded-md text-white hover:bg-blue-700"
														onClick={() => {
															setScanId(scan.id);
															setActive("ScanResults");
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
