
"use client";
import Navbar from "./components/Navbar";
import { logout } from "./api/auth";
import { useEffect } from "react";
import { getUserFromLocalStorage } from "./utils/localStorage";


export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = getUserFromLocalStorage();
      if (!user) {
        window.location.href = "/login";
      }
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Navbar onLogout={handleLogout} />
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100 max-w-xl w-full text-center mt-12">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">Welcome!</h1>
          <p className="text-lg text-gray-700">This is your Online Assessment Platform. Use the navigation above to get started.</p>
        </div>
      </main>
    </div>
  );

}
