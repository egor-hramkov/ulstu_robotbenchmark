import { create } from "zustand";
import { User, apiClientClass } from "../shared/api";
import { ApiConfig } from "../shared/api/http-client";

interface AuthState {
  isAuthenticated?: boolean;
  token?: string;
  userId?: number;
  userInfo?: User;
  login: (accessToken: string, refreshToken: string, userId: number) => void;
  checkAuth: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  checkAuth: () => {
    const refreshToken = sessionStorage.getItem("refreshToken");
    const accessToken = sessionStorage.getItem("accessToken");
    const userId = sessionStorage.getItem("userId");

    const configMcc: ApiConfig = {
      baseUrl: "http://localhost:8000",
      baseApiParams: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    };
  
    const apiClient = new apiClientClass(configMcc);

    if (accessToken && refreshToken) {
      apiClient.Token.tokenRefreshCreate({
        access: accessToken,
        refresh: refreshToken,
      })
        .then(() => {
          set({ token: accessToken, isAuthenticated: true });
          return apiClient.Users.usersRetrieve(Number(userId));
        })
        .then(({ data }) => {
          set({ userInfo: data, userId: data.id });
        })
        .catch(() => {
          set({ isAuthenticated: false });
        });
    } else {
      set({ isAuthenticated: false });
    }
  },
  login: (accessToken: string, refreshToken: string, userId: number) => {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("userId", `${userId}`);
    set({ token: accessToken, userId, isAuthenticated: true });
  },
  logout: () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("userId");
    set({ token: undefined, isAuthenticated: false });
  },
}));
