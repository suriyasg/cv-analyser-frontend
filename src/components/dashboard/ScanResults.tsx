import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { dummyCVScan } from "@/dummy_data";
import { api } from "@/util/api";
export interface CVScan {
	id: number;
	job_description: string;
	scan_status: string;
	scan_result: string;
	overall_match: number;
	hard_skill_match: number;
	soft_skill_match: number;
	experience_level: string;
	cv: CV;
}

export interface CV {
	id: number;
	title: string;
	file: string;
	owner_id: number;
	created: Date;
	modified: Date;
	cvscan_set: number[];
}

interface ScanResultsProps {
	scanId: number | undefined;
	setScanId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

function ScanResults({ scanId, setScanId }: ScanResultsProps) {
	const [scan, setScan] = useState<CVScan | undefined>();
	const [activeScanInputTab, setActiveScanInputTab] = useState<
		"PDF" | "JOBDESC"
	>("PDF");
	useEffect(() => {
		if (!scanId) return;
		setScan(dummyCVScan);
		// api
		// 	.get(`/scan_results/${scanId}`)
		// 	.then((response) => {
		// 		console.log(response.data);
		// 		setScan(response.data);
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
	}, [scanId]);
	return (
		<div className="w-full p-2">
			<div className="p-6" id="header">
				<h1 className="text-black dark:text-white text-3xl lg:text-2xl font-black leading-tight tracking-[-0.033em]">
					Scan Results
				</h1>
				<p className="text-gray-400 dark:text-gray-400 text-base lg:text-medium font-normal leading-relaxed max-w-2xl">
					Results from AI Agent
				</p>
			</div>
			<p className="text-gray-400 dark:text-gray-400 text-base lg:text-medium font-normal leading-relaxed max-w-2xl">
				{scan?.cv.title}
			</p>
			<div className="w-full flex flex-row mb-6" id="score-board">
				<div
					className="w-1/4 min-w-40 h-30 shadow-md rounded-2xl p-2 m-2 hover:bg-gray-50"
					id="overall-score"
				>
					<div className="text-2xl font-bold">Overall Match</div>
					<div className="text-xl">
						<span className="font-bold text-2xl">{scan?.overall_match}</span>
						<span className="font-semibold text-gray-500">/100</span>
						{scan?.overall_match && (
							<Progress
								aria-label="Loading..."
								color={getProgressBarColourByValue(scan?.overall_match)}
								value={scan?.overall_match}
							/>
						)}
					</div>
				</div>
				<div
					className="w-1/4 min-w-40 h-30 shadow-md rounded-2xl p-2 m-2 hover:bg-gray-50"
					id="hard-skill-score"
				>
					<div className="text-2xl font-bold">Hard skils</div>
					<div className="text-xl">
						<span className="font-bold text-2xl">{scan?.hard_skill_match}</span>
						<span className="font-semibold text-gray-500">/100</span>
						{scan?.hard_skill_match && (
							<Progress
								aria-label="Loading..."
								color={getProgressBarColourByValue(scan?.hard_skill_match)}
								value={scan?.hard_skill_match}
							/>
						)}
					</div>
				</div>
				<div
					className="w-1/4 min-w-40 h-30 shadow-md rounded-2xl p-2 m-2 hover:bg-gray-50"
					id="soft-skill-score"
				>
					<div className="text-2xl font-bold">Soft skills</div>{" "}
					<div className="text-xl">
						<span className="font-bold text-2xl">{scan?.soft_skill_match}</span>
						<span className="font-semibold text-gray-500">/100</span>
						{scan?.soft_skill_match && (
							<Progress
								aria-label="Loading..."
								color={getProgressBarColourByValue(scan?.soft_skill_match)}
								value={scan?.soft_skill_match}
							/>
						)}
					</div>
				</div>
				<div
					className="w-1/4 min-w-40 h-30 shadow-md rounded-2xl p-2 m-2 hover:bg-gray-50"
					id="experience"
				>
					<div className="text-2xl font-bold">Experience Level</div>
					<div className="text-xl">
						<span className="font-bold">{scan?.experience_level}</span>
					</div>
				</div>
			</div>

			<div className="mb-6" id="keyword-analysis">
				<h1 className="text-2xl font-bold">Keyword Analysis</h1>
				<hr className="border-1 border-gray-300 mb-4" />
				<div className="mb-4">
					<h6 className="text-medium font-semibold mb-2">Matched Skills</h6>
					{["react", "typscript"].map((skill) => {
						return (
							<span
								className="bg-green-200 rounded-lg m-1 p-1 text-sm"
								key={skill}
							>
								{skill}
							</span>
						);
					})}
				</div>

				<div>
					<h6 className="text-medium font-semibold mb-2">Missing Skills</h6>
					{["Doker", "Teraform"].map((skill) => {
						return (
							<span
								className="bg-red-200 rounded-lg m-1 p-1 text-sm"
								key={skill}
							>
								{skill}
							</span>
						);
					})}
				</div>
			</div>

			<div className="mb-6" id="summay">
				<h1 className="text-2xl font-bold">Summary</h1>
				<hr className="border-1 border-gray-300 mb-4" />
				<ReactMarkdown>{scan?.scan_result}</ReactMarkdown>
				{/* <p className="text-sm">{scan?.scan_result}</p>  */}
			</div>

			<div className="mb-6" id="scan-inputs">
				<h1 className="text-2xl font-bold">Scan Inputs</h1>
				<hr className="border-1 border-gray-300 mb-4" />
				<div className="p-1 flex flex-row justify-center gap-1 bg-gray-200 rounded-xl">
					<Button
						className={`w-1/2 bg-blue-50 rounded-l-xl rounded-r-none ${activeScanInputTab === "PDF" ? "bg-blue-200" : ""}`}
						onPress={() => setActiveScanInputTab("PDF")}
					>
						PDF
					</Button>
					<Button
						className={`w-1/2 bg-blue-50 rounded-r-xl rounded-l-none ${activeScanInputTab === "JOBDESC" ? "bg-blue-200" : ""}`}
						onPress={() => setActiveScanInputTab("JOBDESC")}
					>
						Job Description
					</Button>
				</div>
				{activeScanInputTab === "PDF" && (
					<div className="w-full p-2" id="cv-file">
						<h1 className="text-2xl font-bold">Uploaded CV</h1>
						<object
							className="h-screen"
							data="http://localhost:5173/api/media/uploads/Suriya_Gnanamoorthy_Dy3kDRF.pdf"
							height="100%"
							type="application/pdf"
							width="100%"
						>
							<p>
								Alternative text - include a link{" "}
								<a href="http://localhost:8000/media/uploads/Suriya_Gnanamoorthy_Dy3kDRF.pdf">
									to the PDF!
								</a>
							</p>
						</object>
					</div>
				)}

				{activeScanInputTab === "JOBDESC" && (
					<div className="w-full p-2" id="job-description">
						<h1 className="text-2xl font-bold">Job Description</h1>
						<ReactMarkdown>{scan?.job_description}</ReactMarkdown>
						{/* <div>{scan?.job_description}</div> */}
					</div>
				)}
			</div>

			<div>
				other scans
				{scan?.cv.cvscan_set.map((scanId) => {
					return (
						<div key={scanId}>
							<button
								className="p-1 bg-blue-500"
								onClick={() => setScanId(scanId)}
								type="button"
							>
								{scanId}
							</button>
						</div>
					);
				})}
			</div>
			<div className="w-full p-6" id="job-description"></div>
			<div className="w-full p-6" id="submit"></div>
		</div>
	);
}

export default ScanResults;

function getProgressBarColourByValue(
	value: number,
): "success" | "warning" | "danger" {
	if (value > 75) {
		return "success";
	} else if (value > 50) {
		return "warning";
	} else {
		return "danger";
	}
}
