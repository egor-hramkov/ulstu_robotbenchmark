import { create } from "zustand";
import useApiClient from "../hooks/useApiClient";
import { User } from "../shared/api";

interface AuthState {
  isAuthenticated: () => boolean;
  token: string | undefined;
  userId?: number;
  userInfo?: User;
  login: (accessToken: string, refreshToken: string,  userId: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: () => {
    const refreshToken = sessionStorage.getItem('refreshToken');
    const accessToken = sessionStorage.getItem('accessToken');
    const userId = sessionStorage.getItem('userId');
    const apiClient = useApiClient();
    if (accessToken && refreshToken) {
      apiClient.Token.tokenRefreshCreate({
        access: accessToken,
        refresh: refreshToken
      })
      set({token: accessToken});
      apiClient.Users.usersRetrieve(Number(userId)).then(({data}) => set({userInfo: data, userId: data.id}));
      return true;
    } else return false;

  },
  token: undefined,
  login: (accessToken: string, refreshToken: string,  userId: number) => {
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken)
    sessionStorage.setItem('userId', `${userId}`);
    set({ token: accessToken, userId})
  },
  logout: () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('userId');
    set({ token: undefined })
  },
}));
