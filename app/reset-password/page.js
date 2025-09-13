"use client";

import { useState } from "react";
import { passwordResetComplete } from "../api/auth";

export default function ResetPasswordPage() {
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
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
      // You need to get token and uidb64 from query params or state
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      const uidb64 = urlParams.get("uidb64");
      const res = await passwordResetComplete({
        password: form.password,
        confirmPassword: form.confirmPassword,
        token,
        uidb64
      });
      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.message || "Failed to reset password");
      }
    } catch (err) {
      setError("Error resetting password");
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white py-8 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Password Reset Successful!</h2>
          <p className="text-gray-700">You can now log in with your new password.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-8 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Reset Password</h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
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
      </div>
    </div>
  );
}
