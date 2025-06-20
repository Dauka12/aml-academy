import { create } from "zustand";
import axios from "axios";
import { RegisterStudentRequest } from "../types/student";

interface AuthState {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
  login: (iin: string, password: string) => Promise<void>;
  register: (data: RegisterStudentRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useLMSAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: "",

  login: async (iin, password) => {
    set({ loading: true, error: "" });
    try {
      const response = await axios.post("/lms/login", {
        iin,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        loading: false,
        error: "",
      });
      localStorage.setItem("lmsUser", JSON.stringify(response.data.user));
      localStorage.setItem("lmsToken", response.data.token);
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
      const response = await axios.post("/lms/registration", data);
      set({
        user: response.data.user,
        isAuthenticated: true,
        loading: false,
        error: "",
      });
      localStorage.setItem("lmsUser", JSON.stringify(response.data.user));
      localStorage.setItem("lmsToken", response.data.token);
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Ошибка регистрации",
        loading: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem("lmsUser");
    localStorage.removeItem("lmsToken");
    set({ user: null, isAuthenticated: false });
  },

  clearError: () => set({ error: "" }),
}));
