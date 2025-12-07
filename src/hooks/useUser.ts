import { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

export interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  totalRentals: number;
  totalSpent: number;
  verificationStatus: any;
}

export interface SavedCard {
  id: string;
  type: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export const useAuthAndProfile = () => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { firebaseUser, userProfile, loading };
};

export const useSavedCards = (userId: string | undefined) => {
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setCards([
      { id: '1', type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true }
    ]);
    setLoading(false);
  }, [userId]);

  return { cards, loading };
};