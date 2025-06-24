import { create } from "zustand";
import axios from "axios";
import { RegisterStudentRequest } from "../types/student";

interface AuthState {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterStudentRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Helper to safely parse JSON from localStorage
const safeJSONParse = (item: string | null) => {
  if (item === null) {
    return null;
  }
  try {
    // This will correctly handle strings like "undefined" or other invalid JSON
    return JSON.parse(item);
  } catch (error) {
    console.error("Failed to parse JSON from localStorage", error);
    localStorage.removeItem("lmsUser"); // Clean up corrupted item
    return null;
  }
};

const lmsUserItem = localStorage.getItem("lmsUser");
const user = safeJSONParse(lmsUserItem);

export const useLMSAuthStore = create<AuthState>((set) => ({
  user: user,
  isAuthenticated: !!user,
  loading: false,
  error: "",

  login: async (email, password) => {
    set({ loading: true, error: "" });
    try {
      const response = await axios.post("/api/lms/login", {
        email,
        password,
      });
      const userData = response.data;
      set({
        user: userData,
        isAuthenticated: true,
        loading: false,
      });
      localStorage.setItem("lmsUser", JSON.stringify(userData));
      localStorage.setItem("lmsToken", userData.token);
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Ошибка авторизации",
        loading: false,
      });
    }
  },

  register: async (data) => {
    set({ loading: true, error: "" });
    try {
      await axios.post("/api/lms/register", data);
      set({ loading: false, error: "" });
      // On successful registration, we don't log the user in.
      // The calling component will handle the success (e.g., redirect to login).
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Ошибка регистрации";
      set({
        error: errorMessage,
        loading: false,
      });
      // Re-throw the error so the component's try/catch can handle it
      throw new Error(errorMessage);
    }
  },

  logout: () => {
    localStorage.removeItem("lmsUser");
    localStorage.removeItem("lmsToken");
    set({ user: null, isAuthenticated: false, error: "" });
  },

  clearError: () => set({ error: "" }),
}));
