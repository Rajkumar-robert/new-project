"use client";
import Link from "next/link";
import { useUser } from "../context/userContext";


export default function Navbar() {
  const { user, logout } = useUser();

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow border-b border-gray-100">
      <Link href="/" className="text-xl font-bold text-indigo-700 tracking-tight">Online Assessment Platform</Link>
      {user ? (
        <button
          onClick={logout}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
        >
          Logout
        </button>
      ) : (
        <div className="flex gap-4">
          <Link href="/login" className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold px-5 py-2 rounded-lg border border-indigo-200 transition">Login</Link>
          <Link href="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}
