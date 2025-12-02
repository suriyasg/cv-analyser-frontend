import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createSelectors } from "./zustand";

interface AuthState {
	token?: string;
	isAuthenticated: boolean;
	setAuth: (token: string) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			token: undefined,
			isAuthenticated: !!get()?.token,
			setAuth: (token) => set({ token }),
			logout: () => set({ token: undefined }),
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export const useAuth = createSelectors(useAuthStore);
