# 🛡️ Iron Gates — Alliance Management & Epic Boss Tracker

> **Iron Gates** is a modern web application designed for gaming clans (tailored for Lineage 2 and MMORPG communities) to track clan statistics, Pareto charts, timelines, epic boss respawns, drop distributions, and automated real-time Web Push notifications.

🌐 **Live Applications:**

- **Frontend (Vercel):** https://iron-gates.vercel.app
- **Backend Repository:** https://github.com/AntonOmelchuk/alliance-analytics

---

## 🏗️ Architecture & Tech Stack

- **Backend:** Python, FastAPI, Pandas, Firebase Admin SDK, APScheduler, PyWebPush (`alliance-analytics`)
- **Frontend:** React, Vite, TailwindCSS, Zustand, Service Workers
- **Database & Storage:** Firebase Realtime Database (RTDB)
- **Notifications:** Web Push API (FCM & APNs for Android/iOS PWA support)
- **Hosting:**
  - **Backend:** Render (FastAPI Web Service)
  - **Frontend:** Netlify / Vercel

---

## ⚙️ Core Features

1. **Alliance Analytics & CP Stats:** Processes CSV sheets to analyze clan member activities, Pareto distribution, and drop shares.
2. **Timeline & Epic Tracker:** Real-time tracking of Epic Boss respawns (Queen Ant, Zaken, Baium, Valakas, Antharas, etc.) and daily PvP events (Multi Team Battle, Capture The Base, Death Match, Epic Boss Challenge).
3. **Automated Web Push Notifications:**
   - Background `AsyncIOScheduler` worker checking respawn timers every minute.
   - Multi-language support (English & Ukrainian).
   - **Smart Alerts Cleanup:** Epic boss alerts automatically delete from Firebase once triggered (one-time dynamic events), while daily recurring PvP alerts persist in the database for upcoming days.
4. **PWA Support:** Full Progressive Web App capability for Android and iOS with native-like push notifications.

---

## 🚀 Getting Started Locally

### 1. Backend Setup (`alliance-analytics`)

Clone the repository and navigate to the backend directory:

```bash
git clone https://github.com/AntonOmelchuk/alliance-analytics.git
cd alliance-analytics

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

# Create a .env file in the root of the backend directory:

FIREBASE_DATABASE_URL=https://your-firebase-database-default-rtdb.firebaseio.com/
FIREBASE_CREDENTIALS_PATH=firebase-credentials.json
VAPID_PRIVATE_KEY=your_web_push_vapid_private_key
VAPID_MAILTO=mailto:your-email@gmail.com

# ⚠️ Place your firebase-credentials.json file from Firebase Console into the root backend folder.

```bash
uvicorn main:app --reload --port 8000
```

The server will start at http://localhost:8000.
It includes an integrated AsyncIOScheduler executing the push notification check every 60 seconds.

### 2. Frontend Setup (React & Vite)

Navigate to your frontend project directory:

```bash
cd frontend
npm install
```

# Create a .env.local file:

VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=yourdomain.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-database.firebasedatabase.app
VITE_API_URL=http://localhost:8000
VITE_VAPID_PUBLIC_KEY=your-vapid-public-key

```bash
npm run dev
```

### ☁️ Production Deployment

# Backend (Render)

- Link your GitHub repository https://github.com/AntonOmelchuk/alliance-analytics to Render.
- Configure Build & Start Commands:
  - Command: pip install -r requirements.txt
  - Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
  - Add environment variables (FIREBASE_DATABASE_URL, VAPID_PRIVATE_KEY, VAPID_MAILTO, etc.) in the Render dashboard.
  - Set up an external Uptime service (e.g., UptimeRobot) to hit /api/ping every 5–10 minutes to prevent the free instance from sleeping.

### Frontend (Netlify / Vercel)

# Deploy the frontend repository to Netlify or Vercel.

- Set Build Settings:
  - Build Command: npm run build
  - Publish Directory: dist
  - Add VITE_API_URL (pointing to Render) and VITE_VAPID_PUBLIC_KEY to environment variables.

### 📡 API Endpoints Overview

- GET /api/cp-stats — Calculates CP statistics and Pareto analysis.
- GET /api/timeline — Returns clan timeline events.
- GET /api/epics — Processes epic boss drop history, warehouse loot, and CP distribution.
- GET /api/summary — Returns summary cards metrics.
- POST /api/push/subscribe — Registers or updates a device Web Push subscription and its alerts.
- DELETE /api/push/unsubscribe — Unsubscribes a device from notifications.
- POST /api/push/broadcast — Broadcasts notifications to all registered subscribers.
- GET /api/ping — Lightweight health-check endpoint to keep the server awake.

### 🤝 License & Author

Developed for alliance and clan event management by Anton Omelchuk.
