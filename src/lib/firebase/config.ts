import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAKlAtUJZE7M2MXN8h4W4W059675sahVkY",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "sathya-sir-portfolio-site.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "sathya-sir-portfolio-site",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "sathya-sir-portfolio-site.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1058941278928",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1058941278928:web:175d71d22a663f20fc5cd5",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-PNSH9ZC1NR",
};

export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);