import { useState } from "react";

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedPassword = localStorage.getItem("adminPassword");
    return storedPassword === import.meta.env.VITE_ADMIN_PASSWORD;
  });

  const handleLogin = (password: string) => {
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("adminPassword", password);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminPassword");
  };

  return { isAuthenticated, handleLogin, handleLogout };
};
