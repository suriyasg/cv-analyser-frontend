import { Button } from "@heroui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/home/Navbar";
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
	return (
		<div>
			<Navbar />
			<Hero />
		</div>
	);
};
