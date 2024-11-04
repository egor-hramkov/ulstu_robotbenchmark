import AppLayout from "./AppLayout";
import { Login } from "./components/Auth/Login/Login";
import { useAuthStore } from "./store/useAuthStore";

export const App = () => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated() ? <AppLayout /> : <Login />;
};
