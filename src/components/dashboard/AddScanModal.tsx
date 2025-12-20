import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@heroui/modal";
import { addToast, Button, Input, Textarea } from "@heroui/react";
import { useState } from "react";
import { api } from "@/util/api";

interface AddScanModalProps {
	cv_id: number | undefined;
	cv_title: string | undefined;
	isOpen: boolean;
	onOpenChange: () => void;
}

export default function AddScanModal({
	cv_id,
	cv_title,
	isOpen,
	onOpenChange,
}: AddScanModalProps) {
	const [scanTitle, setScanTitle] = useState<string>("");
	const [jobDes, setJobDes] = useState<string>("");
	const handleAddScan = () => {
		if (!cv_id || !jobDes || !scanTitle) {
			return;
		}
		const data = {
			cv: cv_id,
			title: scanTitle,
			job_description: jobDes,
		};
		console.log(data);
		api
			.post("/scans/", data)
			.then((res) => {
				console.log(res);
				if (res.status === 201) {
					addToast({
						title: "Scan Created",
						color: "success",
					});
				}
				addToast({
					title: "Scan creation failed",
				});
			})
			.catch((error) => {
				console.log("error", error);
				addToast({
					title: "Error",
					description: "Scan creation failed",
					color: "danger",
				});
			});
	};
	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Add New Scan to {cv_title}
						</ModalHeader>
						<ModalBody>
							<Input
								label="Scan Title"
								onChange={(event) => {
									setScanTitle(event.target.value);
								}}
								type="text"
							/>
							<Textarea
								className="w-full"
								label="Job Description"
								onChange={(event) => {
									setJobDes(event.target.value);
									console.log(event.target.value);
								}}
								placeholder="Enter your target job description"
							/>
						</ModalBody>
						<ModalFooter>
							<Button color="danger" onPress={onClose} variant="light">
								Close
							</Button>
							<Button
								color="primary"
								onPress={() => {
									handleAddScan();
									onClose();
								}}
							>
								Add Scan
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
