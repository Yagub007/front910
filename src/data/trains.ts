import type { Train } from '../types';

export const mockTrains: Train[] = [
  {
    id: 't1',
    number: '743К',
    route: 'Київ → Львів',
    departure: '2026-05-10 06:00',
    duration: '5 год 15 хв',
    wagons: [
      { id: 'w1', type: 'Інтерсіті (1 клас)', totalSeats: 36 },
      { id: 'w2', type: 'Інтерсіті (2 клас)', totalSeats: 54 },
    ]
  },
  {
    id: 't2',
    number: '091К',
    route: 'Київ → Одеса',
    departure: '2026-05-11 21:30',
    duration: '9 год 45 хв',
    wagons: [
      { id: 'w3', type: 'Купе', totalSeats: 36 },
      { id: 'w4', type: 'Люкс', totalSeats: 18 },
    ]
  }
];
