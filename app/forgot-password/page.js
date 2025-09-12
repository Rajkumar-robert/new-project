"use client";


import { useState } from "react";
import { forgotPassword, passwordResetComplete } from "../api/auth";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
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
        setStep(2);
      } else {
        setError(res.message || "Failed to send reset email");
      }
    } catch (err) {
      setError("Error sending reset email");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!validatePassword(form.password)) {
      setError("Password must be at least 8 characters, include upper and lowercase, a number, and a special character.");
      return;
    }
    try {
      const res = await passwordResetComplete({
        password: form.password,
        confirmPassword: form.confirmPassword,
        token,
        uidb64
      });
      if (res.success) {
        alert("Password reset successful!");
      } else {
        setError(res.message || "Failed to reset password");
      }
    } catch (err) {
      setError("Error resetting password");
    }
  };

  return (
    <div className="bg-white  min-h-screen flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Forgot Password</h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {step === 1 ? (
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
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter new password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-black placeholder:text-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-black placeholder:text-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg shadow transition"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
