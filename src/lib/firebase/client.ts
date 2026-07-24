'use client';

import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { app } from './config';

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);