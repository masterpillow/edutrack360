import axios from "axios";

export const api = axios.create({
  baseURL: (import.meta as any).env?.VITE_API_URL || "http://localhost:4000",
});

// (Optional) send a bearer token if you add protected API later
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
