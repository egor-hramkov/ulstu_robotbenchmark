import { useState, useEffect, PropsWithChildren, memo } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Login } from "./Login/Login";


const AuthProvider = memo((props: PropsWithChildren) => {
  const { checkAuth, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuth(); // Call checkAuth once
      setIsLoading(false); // Set loading to false after checking
    };

    initializeAuth();
  }, [checkAuth]);

  if (isLoading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <>
      {isAuthenticated ? props.children : <Login />} {/* Render children or Login based on auth state */}
    </>
  );
});

export default AuthProvider;