"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { getUserFromLocalStorage, clearUserFromLocalStorage } from "../utils/localStorage";
import { logout as apiLogout } from "../api/auth";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		setUser(getUserFromLocalStorage());
	}, []);

	const logout = async () => {
		try {
			await apiLogout();
			clearUserFromLocalStorage();
			setUser(null);
		} catch (err) {
			// Optionally handle error (e.g., show notification)
			console.error("Logout failed", err);
		}
	};

	return (
		<UserContext.Provider value={{ user, setUser, logout }}>
			{children}
		</UserContext.Provider>
	);
}

export const useUser = () => {
	return useContext(UserContext);
};
