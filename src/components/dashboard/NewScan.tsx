import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { Input } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "@/util/api";
import FileInput from "./FileInput";

function NewScan() {
	const [title, setTitle] = useState<string>("");
	const [scanTitle, setScanTitle] = useState<string>("");
	const [file, setFile] = useState<File | undefined>(undefined);
	const [jobDes, setJobDes] = useState<string>("");
	const [searchParams, setSearchParams] = useSearchParams();
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) {
			return;
		}
		setFile(event.target.files[0]);
	};

	const onPress = () => {
		const formdata = new FormData();
		if (!file || !jobDes || !title || !scanTitle) {
			addToast({
				title: "Need to provide all fields",
				color: "danger",
			});
			return;
		}

		formdata.append("title", title);
		formdata.append("scan_title", scanTitle);
		formdata.append("file", file);
		formdata.append("job_description", jobDes);
		api
			.post("/cvs/", formdata, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				if (response.status === 201) {
					setSearchParams({ ...searchParams, currentTab: "CVSCANS" });
				} else {
					addToast({
						title: "Error",
						description: "unknown error",
						color: "danger",
					});
				}
			})
			.catch((error) => {
				addToast({
					title: "Error while creating scan",
					description: error.response.data.errors[0].detail,
					color: "danger",
				});
			});
	};

	return (
		<div className="w-full p-2">
			<div className="p-6" id="header">
				<h1 className="text-black dark:text-white text-3xl lg:text-2xl font-black leading-tight tracking-[-0.033em]">
					New Scan
				</h1>
				<p className="text-gray-400 dark:text-gray-400 text-base lg:text-medium font-normal leading-relaxed max-w-2xl">
					Upload your resume and paste the target job description below. Our AI
					Agents will analyze and provide detailed insights.
				</p>
			</div>
			<div className="w-full p-6" id="title">
				<Input
					label="Cv Title"
					onChange={(event) => {
						setTitle(event.target.value);
					}}
					type="text"
				/>
			</div>
			<div className="w-full p-6" id="scan-title">
				<Input
					label="Scan Title"
					onChange={(event) => {
						setScanTitle(event.target.value);
					}}
					type="text"
				/>
			</div>
			<div className="w-full p-6" id="file-upload">
				<FileInput handleFileChange={handleFileChange} />
				{file && (
					<p className="text-sm text-gray-500 mt-2">Selected: {file.name}</p>
				)}
			</div>
			<div className="w-full p-6" id="job-description">
				<Textarea
					className="w-full"
					label="Job Description"
					onChange={(event) => {
						setJobDes(event.target.value);
					}}
					placeholder="Enter your target job description"
				/>
			</div>
			<div className="w-full p-6 flex flex-row-reverse" id="submit">
				<Button
					className="bg-white text-blue hover:bg-blue-400 hover:text-white border-2 border-blue-500 font-extrabold hover:shadow-2xl"
					onPress={onPress}
				>
					Start Scanning
				</Button>
			</div>
		</div>
	);
}

export default NewScan;
