import {
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
} from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { useEffect } from "react";

import { db } from "../services/firebase";
import useAuthStore from "../store/useAuthStore";

export const useAuthSync = () => {
  const { user, token, updateProfile, logout } = useAuthStore();

  useEffect(() => {
    const auth = getAuth();

    if (token && !auth.currentUser) {
      signInWithCustomToken(auth, token).catch((err) => {
        console.error(
          "❌ [AuthSync] Failed to sign in with custom token:",
          err,
        );
        logout();
      });
    }

    const unsubscribeAuth = onAuthStateChanged(auth, () => {});

    return () => unsubscribeAuth();
  }, [token, logout]);

  useEffect(() => {
    if (!user?.discord_id) return;

    const userRef = ref(db, `users/${user.discord_id}`);

    const unsubscribeDb = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        updateProfile(data);
      }
    });

    return () => unsubscribeDb();
  }, [user?.discord_id, updateProfile]);
};
