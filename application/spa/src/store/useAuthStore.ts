import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  token: string | undefined;
  userId?: number;
  login: (token: string, userId: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: undefined,
  login: (token: string, userId: number) => {console.log(token, userId);set({ isAuthenticated: true, token, userId })},
  logout: () => set({ isAuthenticated: false, token: undefined }),
}));
