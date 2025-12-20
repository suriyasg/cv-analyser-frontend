import { Button } from "@heroui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/util/api";
import { useAuthStore } from "@/util/auth";

interface User {
	id: string;
	user_type: string;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
}

export const HomePage = () => {
	const [user, setUser] = useState<User | undefined>(undefined);
	const getMe = () => {
		api
			.get("/api/v1/auth/me/")
			.then((res) => {
				setUser(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div>
			<h1>Home</h1>
			<Button onPress={() => useAuthStore.getState().logout()}>logout</Button>
			<Link to={{ pathname: "/dashboard" }}>
				<Button>Dashboard</Button>
			</Link>
			<Button onPress={getMe}>Send me</Button>
			{user && (
				<div>
					<div>{user.id}</div>
					<div>{user.user_type}</div>
					<div>{user.username}</div>
					<div>{user.email}</div>
				</div>
			)}
		</div>
	);
};
