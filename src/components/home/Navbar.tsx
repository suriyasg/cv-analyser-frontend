import { Button } from "@heroui/react";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<div id="Nav-bar">
			<div className="flex flex-row w-full shadow h-auto justify-around p-2">
				<div className="flex flex-row w-1/2 justify-start">
					<div className="p-2" id="icon">
						<svg
							className="size-6 text-blue-500"
							fill="none"
							stroke="currentColor"
							strokeWidth={1.5}
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<title>icon</title>
							</path>
						</svg>
					</div>
					<div className="p-2 text-start font-bold" id="title">
						CV ANALYSER
					</div>
				</div>
				<div className="flex flex-row w-1/2 justify-end">
					<div className="w-1/6 p-2 font-semibold" id="history">
						History
					</div>
					<div className="w-1/6 p-2 font-semibold" id="pricing">
						Pricing
					</div>
					<div className="w-1/6" id="Login-btn">
						<Link to={{ pathname: "/auth/login" }}>
							<Button className="bg-blue-500 text-white font-bold">
								LogIn
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
