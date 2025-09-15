export function saveUserToLocalStorage(user, tokens) {
  if (typeof window !== "undefined" && window.localStorage) {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    if (tokens) {
      // tokens is an object with access and refresh
      localStorage.setItem("tokens", JSON.stringify(tokens));
      if (tokens.access) {
        localStorage.setItem("token", tokens.access); // for backward compatibility
      }
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
    localStorage.removeItem("tokens");
  }
}
