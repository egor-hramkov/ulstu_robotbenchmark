import { useState, useEffect, PropsWithChildren, memo } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Login } from "./Login/Login";
import { Spin } from "antd";


const AuthProvider = memo((props: PropsWithChildren) => {
  const { checkAuth, isLoading, isAuthenticated, userInfo } = useAuthStore((state) => ({
    checkAuth: state.checkAuth,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    userInfo: state.userInfo,
  }));


  useEffect(() => {
      checkAuth(); // Call checkAuth once
  }, [checkAuth]);

  if (isLoading) {
    return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />;
  }

  return (
    <>
      {isAuthenticated ? props.children : <Login />} {/* Render children or Login based on auth state */}
    </>
  );
});

export default AuthProvider;