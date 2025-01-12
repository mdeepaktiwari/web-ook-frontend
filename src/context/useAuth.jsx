import React, { createContext, useContext, useEffect, useState } from "react";
import { getItemFromLocalStorage } from "../utils";

const authContext = createContext();

export const useAuth = () => useContext(authContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = getItemFromLocalStorage("user");
    if (user) setUser(user);
    setIsLoading(false);
  }, []);

  const signUser = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const isLoggedIn = () => !!user;

  return (
    <authContext.Provider
      value={{ user, signUser, logout, isLoggedIn, isLoading }}
    >
      {children}
    </authContext.Provider>
  );
};
