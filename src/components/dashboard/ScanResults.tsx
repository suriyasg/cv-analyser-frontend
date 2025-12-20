import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { dummyCVScans } from "@/dummy_data";
import { api } from "@/util/api";

export interface CVScan {
	id: number;
	cv: CV; // reference to the CV object
	job_description: string;
	scan_status: "PENDING" | "STARTED" | "PROCESSING" | "FINISHED";
	// Text outputs
	scan_result: string; // final summary for UI
	anonymized_cv_text?: string;
	preprocessed_cv_text?: string;

	// Skill analysis
	identified_hard_skills: {
		extraction_reasoning: string;
		found_hard_skills: string[];
	};
	identified_soft_skills: {
		extraction_reasoning: string;
		found_soft_skills: string[];
	};

	hard_skill_analyser_output: {
		found_hard_skills: string[];
		missing_hard_skills: string[];
		match_score: number;
		summary: string;
	};

	soft_skill_analyser_output: {
		found_soft_skills: string[];
		missing_soft_skills: string[];
		match_score: number;
		summary: string;
	};

	// Summary generator
	summary_generator_output: {
		overall_match: number;
		strengths: string[];
		weaknesses: string[];
		recommendations: string[];
		final_summary: string;
		experience_level?:
			| "Entry-Level"
			| "Junior"
			| "Mid-Level"
			| "Senior"
			| "Principal/Lead";
	};
}

export interface CV {
	id: number;
	title: string;
	file: string;
	owner_id: number;
	created: Date;
	modified: Date;
	scans: PartialScan[];
}

export interface PartialScan {
	id: number;
	created: Date;
	scan_status: "PENDING" | "STARTED" | "PROCESSING" | "FINISHED";
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
		// setScan(dummyCVScans[scanId - 1]);
		api
			.get(`/scans/${scanId}`)
			.then((response) => {
				console.log(response.data);
				setScan(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
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
			<h1 className="text-2xl font-bold p-2 m-2">{scan?.cv.title}</h1>
			<div className="w-full flex flex-row mb-6" id="score-board">
				<div
					className="w-1/4 min-w-40 h-30 shadow-md rounded-2xl p-2 m-2 hover:bg-gray-50"
					id="overall-score"
				>
					<div className="text-2xl font-bold">Overall Match</div>
					<div className="text-xl">
						<span className="font-bold text-2xl">
							{scan?.summary_generator_output.overall_match}
						</span>
						<span className="font-semibold text-gray-500">/100</span>
						{scan?.summary_generator_output.overall_match !== undefined && (
							<Progress
								aria-label="Loading..."
								color={getProgressBarColourByValue(
									scan?.summary_generator_output.overall_match,
								)}
								value={scan?.summary_generator_output.overall_match}
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
						<span className="font-bold text-2xl">
							{scan?.hard_skill_analyser_output.match_score}
						</span>
						<span className="font-semibold text-gray-500">/100</span>
						{scan?.hard_skill_analyser_output.match_score !== undefined && (
							<Progress
								aria-label="Loading..."
								color={getProgressBarColourByValue(
									scan?.hard_skill_analyser_output.match_score,
								)}
								value={scan?.hard_skill_analyser_output.match_score}
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
						<span className="font-bold text-2xl">
							{scan?.soft_skill_analyser_output.match_score}
						</span>
						<span className="font-semibold text-gray-500">/100</span>
						{scan?.soft_skill_analyser_output.match_score !== undefined && (
							<Progress
								aria-label="Loading..."
								color={getProgressBarColourByValue(
									scan?.soft_skill_analyser_output.match_score,
								)}
								value={scan?.soft_skill_analyser_output.match_score}
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
						<span className="font-bold">
							{scan?.summary_generator_output.experience_level || "Unknown"}
						</span>
					</div>
				</div>
			</div>

			<div className="mb-6" id="keyword-analysis">
				<h1 className="text-2xl font-bold">Skills Analysis</h1>
				<hr className="border-1 border-gray-300 mb-4" />
				<div className="mb-4">
					<div className="mb-2">
						<h6 className="text-medium font-semibold mb-2">Hard Skills</h6>
						<div className="flex flex-wrap font-light">
							{scan?.hard_skill_analyser_output.found_hard_skills.map(
								(skill) => {
									return (
										<div
											className="bg-green-200 rounded-lg m-1 p-1 text-sm w-fit"
											key={skill}
										>
											✅ {skill}
										</div>
									);
								},
							)}

							{scan?.hard_skill_analyser_output.missing_hard_skills.map(
								(skill) => {
									return (
										<div
											className="bg-red-200 rounded-lg m-1 p-1 text-sm w-fit"
											key={skill}
										>
											❌ {skill}
										</div>
									);
								},
							)}
						</div>
					</div>
					<div>
						<h6 className="text-medium font-semibold mb-2">Soft Skills</h6>
						<div className="flex flex-wrap font-light">
							{scan?.soft_skill_analyser_output.found_soft_skills.map(
								(skill) => {
									return (
										<div
											className="bg-green-200 rounded-lg m-1 p-1 text-sm w-fit"
											key={skill}
										>
											✅ {skill}
										</div>
									);
								},
							)}
							{scan?.soft_skill_analyser_output.missing_soft_skills.map(
								(skill) => {
									return (
										<div
											className="bg-red-200 rounded-lg m-1 p-1 text-sm w-fit"
											key={skill}
										>
											❌ {skill}
										</div>
									);
								},
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="mb-6" id="summay">
				<h1 className="text-2xl font-bold">Summary</h1>
				<hr className="border-1 border-gray-300 mb-4" />
				<div
					className="p-4 markdown bg-gray-100 rounded-2xl"
					id="summary-mark-down"
				>
					<Markdown remarkPlugins={[remarkGfm]}>
						{scan?.summary_generator_output.final_summary}
					</Markdown>
				</div>
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
						{/* The problem here is that React-markdown map the markdown text to real html elements, and you're using tailwindcss. 
                            Tailwind takes out all default styles applied to html elements. Luckily there is a really easy workaround: 
                            https://stackoverflow.com/questions/74607419/react-markdown-don%C2%B4t-render-markdown
                            */}
						<div
							className="p-4 markdown bg-gray-100 rounded-2xl"
							id="job-description-mark-down"
						>
							<Markdown remarkPlugins={[remarkGfm]}>
								{scan?.job_description}
							</Markdown>
						</div>
					</div>
				)}
			</div>

			<div className="mb-6" id="keyword-analysis">
				<h1 className="text-2xl font-bold">Other Scans</h1>
				<hr className="border-1 border-gray-300 mb-4" />
				<div className="mb-4">
					{scan?.cv.scans.map((scan) => {
						return (
							<div key={scan.id}>
								<button
									className="p-2 bg-blue-300 rounded-lg"
									onClick={() => {
										console.log("clieck", scan.id);
										setScanId(scan.id);
										window.scrollTo({ top: 0 });
									}}
									type="button"
								>
									{scan.id}
								</button>
							</div>
						);
					})}
				</div>
			</div>
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
