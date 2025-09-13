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

export function getUserFromLocalStorage() {
  if (typeof window !== "undefined" && window.localStorage) {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
}

export function clearUserFromLocalStorage() {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
}
