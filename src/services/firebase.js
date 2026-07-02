import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

/**
 * Firebase configurations retrieved from environment variables.
 * These are securely injected during the build phase.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

// Initialize the Firebase instance. This runs strictly once outside the React execution tree.
const app = initializeApp(firebaseConfig);

// Export the Realtime Database reference to be used by subscriptions across the app.
export const db = getDatabase(app);
