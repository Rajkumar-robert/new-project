"use client";
import { useState } from "react";
import { forgotPassword } from "../api/auth";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  function validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await forgotPassword(form.email);
      if (res.success) {
        setSent(true);
      } else {
        setError(res.message || "Failed to send reset email");
      }
    } catch (err) {
      setError("Error sending reset email");
    }
  };


  return (
    <div className="bg-white  min-h-screen flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Forgot Password</h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {sent ? (
          <div className="text-center text-green-700 font-semibold text-lg py-8">Reset link is sent to your email.</div>
        ) : (
          <form onSubmit={handleEmailSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-black placeholder:text-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg shadow transition"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
