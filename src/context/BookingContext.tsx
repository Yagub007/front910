import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Booking } from '../types';

const API_BASE = 'http://localhost:8001/api';

interface BookingContextType {
  bookings: Booking[];
  loading: boolean;
  addBooking: (booking: Booking) => Promise<void>;
  getBookedSeats: (trainId: string, wagonId: string) => number[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all bookings from backend on mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_BASE}/bookings/`);
        const data = await res.json();
        // Map snake_case API fields to our camelCase Booking interface
        const mapped: Booking[] = data.map((b: {
          train_id: string;
          wagon_id: string;
          seats: number[];
          name: string;
          phone: string;
          email: string;
        }) => ({
          trainId: b.train_id,
          wagonId: b.wagon_id,
          seats: b.seats,
          user: { name: b.name, phone: b.phone, email: b.email },
        }));
        setBookings(mapped);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const addBooking = async (booking: Booking) => {
    const payload = {
      train_id: booking.trainId,
      wagon_id: booking.wagonId,
      seats: booking.seats,
      name: booking.user.name,
      phone: booking.user.phone,
      email: booking.user.email,
    };

    const res = await fetch(`${API_BASE}/bookings/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error('Failed to create booking');
    }

    // Optimistically update local state
    setBookings(prev => [...prev, booking]);
  };

  const getBookedSeats = (trainId: string, wagonId: string): number[] => {
    return bookings
      .filter(b => b.trainId === trainId && b.wagonId === wagonId)
      .flatMap(b => b.seats);
  };

  return (
    <BookingContext.Provider value={{ bookings, loading, addBooking, getBookedSeats }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within BookingProvider');
  return context;
};
