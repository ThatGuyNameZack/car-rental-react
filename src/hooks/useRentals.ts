import { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

export interface Rental {
  id: string;
  carId: string;
  userId: string;
  carSnapshot: {
    brand: string;
    model: string;
    image: string;
    plate: string;
  };
  pickupDate: string;
  returnDate: string;
  location: string;
  totalPrice: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  bookingDate: any;
}

export const useCreateRental = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRental = async (rentalData: Omit<Rental, 'id' | 'bookingDate'>) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = await addDoc(collection(db, "rentals"), {
        ...rentalData,
        bookingDate: serverTimestamp(),
        status: 'upcoming'
      });
      setLoading(false);
      return docRef.id;
    } catch (err: any) {
      console.error("Error creating rental:", err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { createRental, loading, error };
};

export const useMyRentals = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      setRentals([]);
      setLoading(false);
      return;
    }

    const fetchRentals = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "rentals"),
          where("userId", "==", user.uid)
        );
        
        const querySnapshot = await getDocs(q);
        const rentalsData: Rental[] = [];
        
        querySnapshot.forEach((doc) => {
          rentalsData.push({ id: doc.id, ...doc.data() } as Rental);
        });

        rentalsData.sort((a, b) => {
           return new Date(b.bookingDate?.toDate ? b.bookingDate.toDate() : 0).getTime() - 
                  new Date(a.bookingDate?.toDate ? a.bookingDate.toDate() : 0).getTime();
        });

        setRentals(rentalsData);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, [user]);

  return { rentals, loading };
};