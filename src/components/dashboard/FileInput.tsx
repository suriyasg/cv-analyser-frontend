import { Button } from "@heroui/button";
import { useRef } from "react";

interface FileInputProps {
	handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function FileInput({ handleFileChange }: FileInputProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};
	return (
		<div className="flex items-center justify-center w-full">
			<div className="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border rounded-lg border-dashed border-default-strong">
				<div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
					<svg
						aria-hidden="true"
						className="w-8 h-8 mb-4"
						fill="none"
						height="24"
						viewBox="0 0 24 24"
						width="24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
					<p className="mb-2 text-sm">Click the button below to upload</p>
					<p className="text-xs mb-4">
						Max. File Size: <span className="font-semibold">5MB</span>
					</p>
					{/* <!-- Upload Button --> */}
					<Button
						className="inline-flex items-center text-white bg-blue-500 hover:bg-brand-strong border rounded-3xl border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
						onPress={handleButtonClick}
						type="button"
					>
						<svg
							aria-hidden="true"
							className="w-4 h-4 me-1.5"
							fill="none"
							height="24"
							viewBox="0 0 24 24"
							width="24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
								stroke="currentColor"
								strokeLinecap="round"
								strokeWidth="2"
							/>
						</svg>
						Browse file
					</Button>
				</div>
			</div>
			{/* <!-- Hidden File Input (Outside Label) --> */}
			<input
				className="hidden"
				id="dropzone-file-2"
				onChange={(event) => handleFileChange(event)}
				ref={fileInputRef}
				type="file"
			/>
		</div>
	);
}

export default FileInput;
