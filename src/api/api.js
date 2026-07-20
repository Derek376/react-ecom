import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
  withCredentials: true,
});

const getStoredJwtToken = () => {
  try {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      return null;
    }
    const parsed = JSON.parse(auth);
    const token = parsed?.jwtToken;
    // Ignore legacy values that stored the full Set-Cookie string instead of the JWT
    if (!token || typeof token !== "string" || token.includes(";")) {
      return null;
    }
    return token;
  } catch {
    return null;
  }
};

api.interceptors.request.use((config) => {
  const token = getStoredJwtToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
