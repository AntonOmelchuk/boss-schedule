import { onValue, ref } from "firebase/database";
import { useEffect } from "react";

import { db } from "../services/firebase";
import useAuthStore from "../store/useAuthStore";

export const useAuthSync = () => {
  const { user, updateProfile } = useAuthStore();

  useEffect(() => {
    // if user not auth or no discord_id — skip
    if (!user?.discord_id) return;

    // Create link to current user
    const userRef = ref(db, `users/${user.discord_id}`);

    // Subscribe on changes in real time
    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Update Zustand with real data from DB
        updateProfile(data);
      }
    });

    // Unsubscribe when component unmount or user changed
    return () => unsubscribe();
  }, [user?.discord_id, updateProfile]);
};
