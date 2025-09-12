// utils/localStorage.js

/**
 * Safely saves user details and token to localStorage (client-side only).
 * @param {Object} user - The user object to save.
 * @param {string} token - The authentication token to save.
 */
export function saveUserToLocalStorage(user, token) {
  if (typeof window !== "undefined" && window.localStorage) {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    if (token) {
      localStorage.setItem("token", token);
    }
  }
}

/**
 * Retrieves the user object from localStorage.
 */
export function getUserFromLocalStorage() {
  if (typeof window !== "undefined" && window.localStorage) {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
}

/**
 * Removes user and token from localStorage.
 */
export function clearUserFromLocalStorage() {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
}
