import { getAuth, signInWithCustomToken, signOut } from "firebase/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAuthenticating: false,
      authError: null,

      loginWithDiscord: async (code) => {
        if (get().isAuthenticating) return null;

        set({ isAuthenticating: true, authError: null });

        try {
          const response = await fetch(`${BASE_URL}/api/auth/discord`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
          });

          if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.detail || "Authentication failed");
          }

          const data = await response.json();

          // 🔑 Авторизуємо клієнтський Firebase SDK
          if (data.token) {
            const auth = getAuth();
            await signInWithCustomToken(auth, data.token);
          }

          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isAuthenticating: false,
            authError: null,
          });

          return data.user;
        } catch (err) {
          console.error("Zustand Discord Auth Error:", err);
          set({
            authError: err.message,
            isAuthenticating: false,
            isAuthenticated: false,
          });
          throw err;
        }
      },

      setUser: (userData, token = null) =>
        set({
          user: userData,
          token: token || userData?.token,
          isAuthenticated: Boolean(userData),
        }),

      updateProfile: (updatedFields) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedFields } : null,
        })),

      logout: async () => {
        try {
          const auth = getAuth();
          await signOut(auth);
        } catch (e) {
          console.error("Firebase SignOut error:", e);
        }

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          authError: null,
          isAuthenticating: false,
        });
      },
    }),
    {
      name: "auth_storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useAuthStore;
