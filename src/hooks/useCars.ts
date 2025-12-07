import { useState, useEffect } from 'react';
import { collection, getDocs, query, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 

export interface Car {
  id: string;
  brand: string;
  model: string;
  type: string;
  price_per_day: number;
  image_urls: string[]; 
  rating: number;
  reviews: number;
  seats: number;
  transmission: string;
  fuel: string;
  year: number;
  description?: string;
  plate?: string;
  features?: string[];
}

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const q = collection(db, "cars");
        const querySnapshot = await getDocs(q);
        
        const carsData: Car[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          carsData.push({ 
            id: doc.id, 
            ...data,
            image_urls: data.image_urls || ['https://via.placeholder.com/400']
          } as Car); 
        });
        setCars(carsData);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return { cars, loading };
};

export const useCarDetail = (id: string | undefined) => {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCar = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "cars", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCar({ 
            id: docSnap.id, 
            ...data,
            image_urls: data.image_urls || ['https://via.placeholder.com/400'],
            features: data.features || ['AC', 'Audio', 'Airbag']
          } as Car);
        } else {
          console.log("No such car!");
          setCar(null);
        }
      } catch (error) {
        console.error("Error fetching car detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  return { car, loading };
};

export const useFeaturedCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "cars"), limit(3));
        const querySnapshot = await getDocs(q);
        const carsData: Car[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          carsData.push({ 
            id: doc.id, 
            ...data,
            image_urls: data.image_urls || ['https://via.placeholder.com/400']
          } as Car); 
        });
        setCars(carsData);
      } catch (error) {
        console.error("Error fetching featured cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);
  return { cars, loading };
};