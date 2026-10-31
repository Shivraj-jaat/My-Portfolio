import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  orderBy, 
  limit, 
  onSnapshot 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if Firebase configuration has valid credentials
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.apiKey.trim() !== '' &&
  !firebaseConfig.apiKey.includes('your_')
);

let app = null;
let db = null;

export const getFirestoreDb = () => {
  if (db) return db;
  if (isFirebaseConfigured) {
    try {
      app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
      db = getFirestore(app);
      return db;
    } catch (err) {
      console.warn('Firebase initialization error:', err);
      return null;
    }
  }
  return null;
};

// Initialize if configured
if (isFirebaseConfigured) {
  getFirestoreDb();
}

// Local storage key for guestbook
const LOCAL_GUESTBOOK_KEY = 'portfolio_guestbook_notes';

// Event listeners for local guestbook reactive updates
const localGuestbookListeners = new Set();

const notifyLocalGuestbookListeners = () => {
  const current = JSON.parse(localStorage.getItem(LOCAL_GUESTBOOK_KEY) || JSON.stringify(DEFAULT_GUESTBOOK));
  localGuestbookListeners.forEach((fn) => {
    try {
      fn(current);
    } catch (e) {
      console.warn('Listener error:', e);
    }
  });
};

// Default initial guestbook entries for instant cool look
const DEFAULT_GUESTBOOK = [
  {
    id: 'sample-1',
    name: 'Priya Verma',
    message: 'Love the clean UI and the blazing fast Groq AI chatbot integration! ⚡',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    emoji: '🔥'
  },
  {
    id: 'sample-2',
    name: 'Rohan Mehta',
    message: 'Great full-stack portfolio. The Firebase live updates are super slick!',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    emoji: '🚀'
  }
];

// Save a contact message to Firebase Firestore
export const saveContactMessage = async (messageData) => {
  const firestoreDb = getFirestoreDb();

  if (!firestoreDb || !isFirebaseConfigured) {
    throw new Error('Firebase credentials (.env) me nahi mile! Kripya .env me VITE_FIREBASE_API_KEY aur VITE_FIREBASE_PROJECT_ID add karein.');
  }

  try {
    const docRef = await addDoc(collection(firestoreDb, 'messages'), {
      name: messageData.name?.trim() || '',
      email: messageData.email?.trim() || '',
      subject: messageData.subject?.trim() || '',
      message: messageData.message?.trim() || '',
      createdAt: serverTimestamp(),
      submittedAt: new Date().toISOString()
    });

    return { success: true, id: docRef.id, isLive: true };
  } catch (error) {
    console.error('Firestore saveContactMessage error:', error);
    if (error.code === 'permission-denied') {
      throw new Error('Firebase Permission Denied! Firestore Rules ko test mode me set karein: allow read, write: if true;');
    }
    throw new Error(error.message || 'Firebase me message save karne me samasya aayi.');
  }
};

// Save a guestbook message
export const saveGuestbookMessage = async (guestbookData) => {
  if (db && isFirebaseConfigured) {
    try {
      const docRef = await addDoc(collection(db, 'guestbook'), {
        ...guestbookData,
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id, isLive: true };
    } catch (error) {
      console.error('Firestore saveGuestbookMessage error:', error);
      throw error;
    }
  }

  // Fallback to LocalStorage
  const existing = JSON.parse(localStorage.getItem(LOCAL_GUESTBOOK_KEY) || JSON.stringify(DEFAULT_GUESTBOOK));
  const newEntry = {
    ...guestbookData,
    id: 'local-' + Date.now(),
    createdAt: new Date().toISOString()
  };
  localStorage.setItem(LOCAL_GUESTBOOK_KEY, JSON.stringify([newEntry, ...existing]));
  notifyLocalGuestbookListeners();
  return { success: true, id: newEntry.id, isLive: false };
};

// Listen to guestbook entries (real-time when Firebase active, otherwise local subscription)
export const subscribeGuestbook = (callback) => {
  if (db && isFirebaseConfigured) {
    try {
      const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'), limit(20));
      return onSnapshot(q, (snapshot) => {
        const entries = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate().toISOString() : new Date().toISOString()
        }));
        callback(entries.length ? entries : DEFAULT_GUESTBOOK);
      }, (error) => {
        console.warn('Firestore subscription error, using local fallback:', error);
        localGuestbookListeners.add(callback);
        const stored = JSON.parse(localStorage.getItem(LOCAL_GUESTBOOK_KEY) || JSON.stringify(DEFAULT_GUESTBOOK));
        callback(stored);
      });
    } catch (e) {
      console.warn('Subscription error:', e);
    }
  }

  // Fallback initial load & registration
  localGuestbookListeners.add(callback);
  const stored = JSON.parse(localStorage.getItem(LOCAL_GUESTBOOK_KEY) || JSON.stringify(DEFAULT_GUESTBOOK));
  callback(stored);

  // Return unsubscribe
  return () => {
    localGuestbookListeners.delete(callback);
  };
};
