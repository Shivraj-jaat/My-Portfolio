# 🚀 Modern AI Portfolio Website (React + Tailwind CSS + Groq API + Firebase)

An ultra-modern, high-performance portfolio website built with **React**, **Tailwind CSS v4**, **Groq Cloud API** (Llama 3.3 / Mixtral for blazing fast AI chatbot conversations), and **Firebase Firestore** (real-time guestbook & contact form submissions).

---

## ✨ Features

- ⚡ **Ultra-Fast Groq AI Chatbot (`Aura AI`)**:
  - Embedded floating assistant grounded in your portfolio details (skills, projects, experience, contact).
  - Can answer in both **English** and **Hindi/Hinglish**.
  - Powered by **Groq LPU™** (~300+ tokens/sec inference speed).
  - Built-in **Settings Modal** to easily paste or update your Groq API key directly from the browser (or via `.env`).
  - Fallback intelligent offline/demo mode so it always works even without an API key!
  
- 🔥 **Firebase Firestore Real-Time Integration**:
  - **Live Visitor Guestbook**: Visitors can leave shoutouts, comments, and emojis that sync in real-time.
  - **Contact Form**: Inquiries saved directly to Firestore `messages` collection.
  - Graceful fallback: Automatically saves locally in browser storage if Firebase keys aren't configured yet.

- 🎨 **Modern Cyberpunk / Glassmorphic UI**:
  - Dark mode aesthetic with glowing neon gradients.
  - Filterable Project Showcase with "Ask AI about this" triggers.
  - Interactive Skills Matrix categorized into Frontend, Backend, and AI/Tools.
  - Confetti animations for interactions.
  - Fully mobile-responsive.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS v4, Lucide Icons
- **Build Tool**: Vite
- **AI Engine**: Groq Cloud API (`llama-3.3-70b-versatile` / `llama-3.1-8b-instant`)
- **Backend / Database**: Google Firebase Firestore
- **Interactive FX**: canvas-confetti

---

## 🚀 Quick Start

### 1. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Setup API Keys (Optional but Recommended)

### A. Groq API Key (For Live AI Chatbot)
1. Go to [https://console.groq.com/keys](https://console.groq.com/keys) and create a free API key.
2. You can either:
   - Click the **⚙️ Settings icon** inside the chatbot widget in your browser and paste your key, **OR**
   - Add it to your `.env` file:
     ```env
     VITE_GROQ_API_KEY=gsk_your_key_here
     ```

### B. Firebase Firestore (For Live Guestbook & Contact Sync)
1. Go to [Firebase Console](https://console.firebase.google.com/) and create a project.
2. Enable **Cloud Firestore** in Test mode.
3. Add your web app credentials in `.env`:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

---

## ✏️ Customizing Your Profile & Projects

All portfolio data (name, title, bio, skills, projects, links) is cleanly organized in a single file:
👉 **`src/data/portfolioData.js`**

Simply update the fields in this file with your actual details, and both the website UI and the Groq AI Chatbot will automatically reflect the changes!
