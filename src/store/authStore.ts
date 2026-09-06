import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      login: (token: string) => set({ token }),
      logout: () => set({ token: null }),
      isAuthenticated: () => Boolean(get().token),
    }),
    {
      name: "lost-found-auth",
      partialize: (state) => ({ token: state.token }),
    },
  ),
);
