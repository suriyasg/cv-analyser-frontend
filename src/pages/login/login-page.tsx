import { Button } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { useState } from "react";
import { z } from "zod";
import loginBg from "@/assets/login-bg.jpg";
import { api } from "@/util/api";
import { useAuthStore } from "@/util/auth";
import { useAppForm } from "@/util/form";

const loginSchema = z.object({
	email: z.email({ message: "Please enter a valid email address" }),
	username: z.string({ message: "Please enter a valid username" }),
	password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);
	// const setAuth = useAuth.use.setAuth();

	const form = useAppForm({
		defaultValues: {
			email: "",
			username: "",
			password: "",
		} as LoginFormData,
		validators: {
			onChange: loginSchema,
		},
		onSubmit: async ({ value }) => {
			api
				.post("/api/v1/cvowner/auth/login/", {
					email: value.email,
					username: value.username,
					password: value.password,
				})
				.then((response) => {
					useAuthStore.getState().setAuth(response.data.access);
					useAuthStore.getState().setRefresh(response.data.refresh);
				})
				.catch(() => {
					addToast({
						title: "Error",
						description: "Error while loggin in",
						color: "danger",
					});
				});
		},
	});

	return (
		<div className="relative min-h-screen w-full bg-white">
			{/* Background Image with Overlay */}
			<div className="absolute inset-0">
				<img alt="" className="size-full object-cover" src={loginBg} />
				<div className="absolute inset-0 bg-black/70" />
			</div>

			{/* Login Form Container */}
			<div className="relative z-10 flex min-h-screen items-center justify-center">
				<form
					className="flex w-full max-w-sm flex-col items-center gap-9"
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					{/* Header */}
					<div className="flex flex-col items-center gap-1 text-center">
						<h1
							className="bg-linear-to-r from-white to-white bg-clip-text text-4xl font-extrabold leading-10 text-transparent"
							style={{
								textShadow: "0px 0px 4px rgba(255, 255, 255, 0.25)",
							}}
						>
							LOGIN
						</h1>
						<p className="text-sm leading-5 text-white">
							Your personal account dashboard
						</p>
					</div>

					{/* Form Fields */}
					<div className="w-full flex flex-col gap-2">
						<form.AppField name="email">
							{(field) => (
								<field.InputField
									label="Email"
									placeholder="Eg: johndoe@exampple.com"
									type="email"
								/>
							)}
						</form.AppField>
						<form.AppField name="username">
							{(field) => (
								<field.InputField
									label="Username"
									placeholder="Eg: johndoe"
									type="text"
								/>
							)}
						</form.AppField>
						<form.AppField name="password">
							{(field) => (
								<field.InputField
									endContent={
										<button
											className="focus:outline-none"
											onClick={toggleVisibility}
											type="button"
										>
											{isVisible ? (
												<svg
													aria-hidden="true"
													className="size-6 text-default-400"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<title>Show password</title>
													<path
														d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
													/>
													<path
														d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
													/>
												</svg>
											) : (
												<svg
													aria-hidden="true"
													className="size-6 text-default-400"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<title>Hide password</title>
													<path
														d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
													/>
												</svg>
											)}
										</button>
									}
									label="Password"
									placeholder="Enter your password"
									type={isVisible ? "text" : "password"}
								/>
							)}
						</form.AppField>
					</div>

					{/* Sign In Button */}
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
					>
						{([canSubmit, isSubmitting]) => (
							<Button
								className="w-3xs"
								color="primary"
								isDisabled={!canSubmit}
								isLoading={isSubmitting}
								type="submit"
							>
								Sign in
							</Button>
						)}
					</form.Subscribe>
				</form>
			</div>
		</div>
	);
};
