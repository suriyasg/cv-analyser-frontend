import { Button } from "@heroui/button";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/util/auth";

export const HomePage = () => {
	return (
		<div>
			<h1>Home</h1>
			<Button onPress={() => useAuthStore.getState().logout()}>logout</Button>
			<Link to={{ pathname: "/dashboard" }}>
				<Button>Dashboard</Button>
			</Link>
		</div>
	);
};
