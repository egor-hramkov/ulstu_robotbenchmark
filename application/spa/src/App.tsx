import AppLayout from "./AppLayout";
import AuthProvider from "./components/Auth/AuthProvider";

export const App = () => {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
};
