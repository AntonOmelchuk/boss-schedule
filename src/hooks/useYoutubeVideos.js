// src/hooks/useYoutubeVideos.js
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

import { db } from "../services/firebase";

const useYoutubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const videosRef = ref(db, "media/youtube");

    const unsubscribe = onValue(
      videosRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const videoList = Object.entries(data).map(([key, value]) => ({
            firebaseKey: key,
            ...value,
          }));
          setVideos(videoList);
        } else {
          setVideos([]);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching YouTube media:", err);
        setError(err.message);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return { videos, loading, error };
};

export default useYoutubeVideos;
