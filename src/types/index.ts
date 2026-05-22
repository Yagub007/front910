export interface Train {
  id: string;
  number: string;
  route: string;
  departure: string;
  duration: string;
  wagons: Wagon[];
}

export interface Wagon {
  id: string;
  type: string;
  totalSeats: number;
}

export interface Booking {
  trainId: string;
  wagonId: string;
  seats: number[];
  user: { name: string; phone: string; email: string };
}
