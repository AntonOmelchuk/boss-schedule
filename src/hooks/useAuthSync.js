import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { useEffect } from "react";

import { db } from "../services/firebase";
import useAuthStore from "../store/useAuthStore";

export const useAuthSync = () => {
  const { user, updateProfile, logout } = useAuthStore();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        logout();
      }
    });

    return () => unsubscribeAuth();
  }, [logout]);

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
