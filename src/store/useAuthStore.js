import { create } from "zustand";
import { persist } from "zustand/middleware";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null, // { discord_id, username, avatar_url, char_name, cp_name, role, is_setup_complete }
      token: null,
      isAuthenticated: false,
      isAuthenticating: false,
      authError: null,

      /**
       * Exchanges Discord authorization code for user data & access token
       * @param {string} code - OAuth2 code from Discord callback
       * @returns {Promise<Object>} Returns user object on success
       */
      loginWithDiscord: async (code) => {
        // Prevent duplicate simultaneous requests
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

          const data = await response.json(); // { status, user, token }

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

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          authError: null,
          isAuthenticating: false,
        }),
    }),
    {
      name: "auth_storage", // Key in LocalStorage
      // Persist only necessary session fields (ignore temporary UI states)
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useAuthStore;
