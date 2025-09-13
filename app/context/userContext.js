"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { getUserFromLocalStorage, clearUserFromLocalStorage } from "../utils/localStorage";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		setUser(getUserFromLocalStorage());
	}, []);

	const logout = () => {
		clearUserFromLocalStorage();
		setUser(null);
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
