// src/hooks/useCpIgnoreList.js
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

import { db } from "../services/firebase";

/**
 * Custom Hook to subscribe to Firebase Realtime Database and fetch CP ignore list.
 * @returns {{ ignoreList: Array, loading: boolean, error: string|null }}
 */
const useCpIgnoreList = () => {
  const [ignoreList, setIgnoreList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reference to the 'cp_ignore_list' path in Firebase Realtime Database
    const ignoreListRef = ref(db, "cp_ignore_list");

    const unsubscribe = onValue(
      ignoreListRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // If data is stored as an object/dictionary, convert it into an array
          if (typeof data === "object" && !Array.isArray(data)) {
            const list = Object.entries(data).map(([key, value]) => ({
              firebaseKey: key,
              ...(typeof value === "object" ? value : { name: value }),
            }));
            setIgnoreList(list);
          } else if (Array.isArray(data)) {
            // If data is directly an array in Firebase
            setIgnoreList(data);
          }
        } else {
          setIgnoreList([]);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching CP ignore list:", err);
        setError(err.message);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return { ignoreList, loading, error };
};

export default useCpIgnoreList;
