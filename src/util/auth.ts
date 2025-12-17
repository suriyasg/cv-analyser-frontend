import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createSelectors } from "./zustand";

interface AuthState {
	token?: string;
	refresh?: string;
	isAuthenticated: boolean;
	setAuth: (token: string) => void;
	setRefresh: (refresh: string) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			token: undefined,
			refresh: undefined,
			isAuthenticated: !!get()?.token,
			setAuth: (token) => set({ token, isAuthenticated: true }),
			setRefresh: (refresh) => set({ refresh }),
			logout: () => set({ token: undefined, isAuthenticated: false }),
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export const useAuth = createSelectors(useAuthStore);
