import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { Input } from "@heroui/react";
import { useState } from "react";
import { api } from "@/util/api";
import FileInput from "./FileInput";

function NewScan() {
	const [title, setTitle] = useState<string>("");
	const [file, setFile] = useState<File | undefined>(undefined);
	const [jobDes, setJobDes] = useState<string>("");

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) {
			return;
		}
		setFile(event.target.files[0]);
	};

	const onPress = () => {
		const formdata = new FormData();
		if (!file || !jobDes || !title) return;

		formdata.append("title", title);
		formdata.append("file", file);
		formdata.append("job_description", jobDes);
		console.log(title);
		console.log(file);
		console.log(jobDes);
		api
			.post("/cvs/", formdata, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
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
					label="Title"
					onChange={(event) => {
						setTitle(event.target.value);
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
			<div className="w-full p-6" id="submit">
				<Button className="bg-blue-500 text-white" onPress={onPress}>
					Start Scanning
				</Button>
			</div>
		</div>
	);
}

export default NewScan;
