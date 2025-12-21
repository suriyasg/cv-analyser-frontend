import { Button } from "@heroui/react";
import { Link } from "react-router-dom";
import Navbar from "@/components/home/Navbar";
export const NotFound = () => {
	return (
		<div>
			<Navbar />
			<div className="h-screen flex flex-col justify-center items-center">
				<h1 className="text-7xl font-black p-4">404 Opps!</h1>
				<div className="text-2xl font-black text-red-400">Page Not Found</div>
				<Link to={{ pathname: "/" }}>
					<Button className="m-4 bg-white text-blue hover:bg-blue-400 hover:text-white border-2 border-blue-500 font-extrabold hover:shadow-2xl">
						Go back to Home page
					</Button>
				</Link>
			</div>
		</div>
	);
};
