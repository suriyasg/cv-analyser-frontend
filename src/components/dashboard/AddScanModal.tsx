import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@heroui/modal";
import { Button, Input, Textarea } from "@heroui/react";
import { addToast } from "@heroui/toast";
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
	const handleAddScan = (onClose: () => void) => {
		if (!cv_id || !jobDes || !scanTitle) {
			return;
		}
		const data = {
			cv: cv_id,
			title: scanTitle,
			job_description: jobDes,
		};
		api
			.post("/scans/", data)
			.then((res) => {
				if (res.status === 201) {
					addToast({
						title: "Scan Created",
						color: "success",
					});
					onClose();
				} else {
					addToast({
						title: "Scan creation failed",
						description: "Scan creation failed",
						color: "danger",
					});
				}
			})
			.catch((error: Error) => {
				addToast({
					title: "Error",
					description: error.message,
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
									handleAddScan(onClose);
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
