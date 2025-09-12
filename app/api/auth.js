// api/auth.js
import api from "./axios";
import { saveUserToLocalStorage, clearUserFromLocalStorage } from "../utils/localStorage";

// Signup (Register)
export const signup = async ({ email, password, confirmPassword, full_name }) => {
    console.log("Signup called with:", { email, password, confirmPassword, full_name });
  const res = await api.post("/user/register/", {
    email,
    password,
    re_enter_password: confirmPassword,
    full_name
  });
  if (res.data.token) {
    saveUserToLocalStorage(res.data.user || {}, res.data.token);
  }
  return res.data;
};

// Login
export const login = async ({ email, password }) => {
  console.log("Login called with:", { email, password });
  const res = await api.post("/user/login/", { email, password });
  if (res.data.token) {
    saveUserToLocalStorage(res.data.user || {}, res.data.token);
  }
  return res.data;
};

// Logout
export const logout = async (refresh) => {
  await api.post("/user/logout/", { refresh });
  clearUserFromLocalStorage();
};

// Forgot Password (request reset email)
export const forgotPassword = async (email) => {
  console.log("Forgot Password called with:", { email });
  const res = await api.post("/user/forgot-password/", { email });
  return res.data;
};

// Password Reset Complete (set new password)
export const passwordResetComplete = async ({ password, confirmPassword, token, uidb64 }) => {
  const res = await api.patch("/user/password-reset-complete", {
    password,
    re_enter_password: confirmPassword,
  });
  return res.data;
};
