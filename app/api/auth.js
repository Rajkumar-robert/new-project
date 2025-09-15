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

// User Profile API
export const createUserProfile = async (profileData) => {
  // profileData should be a FormData object for file upload
  const res = await api.post("/user/userProfile/", profileData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Login
export const login = async ({ email, password }) => {
  console.log("Login called with:", { email, password });
  const res = await api.post("/user/login/", { email, password });
  // Store user and tokens in localStorage
  saveUserToLocalStorage(res.data.user || {}, res.data.tokens);
  if (res.data.tokens && res.data.tokens.refresh) {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("refreshToken", res.data.tokens.refresh);
    }
  }
  return res.data;
};

// Logout
export const logout = async (refresh) => {
  let refreshToken = refresh;
  if (!refreshToken && typeof window !== "undefined" && window.localStorage) {
    refreshToken = localStorage.getItem("refreshToken");
  }
  if (refreshToken) {
    await api.post("/user/logout/", { refresh: refreshToken });
  }
  clearUserFromLocalStorage();
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem("refreshToken");
  }
};

// Forgot Password (request reset email)
export const forgotPassword = async (email) => {
  console.log("Forgot Password called with:", { email });
  const res = await api.post("/user/forgot-password/", { email });
  return res.data;
  // return { success: true };
};

// Password Reset Complete (set new password)
export const passwordResetComplete = async ({ password, confirmPassword, token, uidb64 }) => {
  const res = await api.patch("/user/password-reset-complete", {
    password,
    re_enter_password: confirmPassword,
  });
  return res.data;
};
