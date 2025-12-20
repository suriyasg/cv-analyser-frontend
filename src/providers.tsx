import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";

interface ProvidersProps {
	children: React.ReactNode;
}
export function Providers({ children }: ProvidersProps) {
	return (
		<HeroUIProvider>
			<ToastProvider
				maxVisibleToasts={5}
				placement="top-right"
				toastOffset={12}
			/>
			{children}
		</HeroUIProvider>
	);
}
