import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAKlAtUJZE7M2MXN8h4W4W059675sahVkY",
  authDomain: "sathya-sir-portfolio-site.firebaseapp.com",
  projectId: "sathya-sir-portfolio-site",
  storageBucket: "sathya-sir-portfolio-site.firebasestorage.app",
  messagingSenderId: "1058941278928",
  appId: "1:1058941278928:web:175d71d22a663f20fc5cd5",
  measurementId: "G-PNSH9ZC1NR"
};

export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);