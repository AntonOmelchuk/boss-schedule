export const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
export const REDIRECT_URI =
  import.meta.env.VITE_DISCORD_REDIRECT_URI ||
  "http://localhost:5173/auth/callback";

// URL for Discord OAuth2 authorization redirect
export const DISCORD_AUTH_URL = `https://discord.com/oauth2/authorize?client_id=
  ${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify`;
