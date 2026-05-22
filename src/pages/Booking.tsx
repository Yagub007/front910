import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { mockTrains } from '../data/trains';
import { useBooking } from '../context/BookingContext';
import { WagonSelector } from '../components/WagonSelector';
import { SeatMap } from '../components/SeatMap';
import { BookingForm } from '../components/BookingForm';
import { ArrowLeft, Loader2 } from 'lucide-react';

export const Booking = () => {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const { addBooking, getBookedSeats, loading } = useBooking();

  const train = mockTrains.find(t => t.id === trainId);
  const [selectedWagon, setSelectedWagon] = useState(train?.wagons[0]?.id || '');
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);

  if (!train) return <div className="p-10 text-center">Потяг не знайдено</div>;

  const currentWagon = train.wagons.find(w => w.id === selectedWagon);
  const bookedSeats = getBookedSeats(train.id, selectedWagon);

  const toggleSeat = (seat: number) => {
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  const handleBookingSubmit = async (user: { name: string; phone: string; email: string }) => {
    setSubmitting(true);
    try {
      await addBooking({
        trainId: train.id,
        wagonId: selectedWagon,
        seats: selectedSeats,
        user,
      });
      toast.success('Квитки успішно заброньовано!', {
        position: 'top-center',
        theme: 'light',
      });
      navigate('/');
    } catch {
      toast.error('Помилка при бронюванні. Спробуйте ще раз.', {
        position: 'top-center',
        theme: 'light',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8 transition-colors font-medium"
      >
        <ArrowLeft size={20} /> Назад до пошуку
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Бронювання: Потяг №{train.number}
        </h1>
        <p className="text-slate-500">
          {train.route} • Відправлення: {train.departure}
        </p>
      </div>

      <WagonSelector
        wagons={train.wagons}
        selectedWagonId={selectedWagon}
        onSelect={(id) => {
          setSelectedWagon(id);
          setSelectedSeats([]);
        }}
      />

      {loading ? (
        <div className="flex items-center justify-center py-16 gap-3 text-slate-500">
          <Loader2 size={24} className="animate-spin" />
          <span>Завантаження даних про місця...</span>
        </div>
      ) : (
        currentWagon && (
          <SeatMap
            totalSeats={currentWagon.totalSeats}
            bookedSeats={bookedSeats}
            selectedSeats={selectedSeats}
            onSeatClick={toggleSeat}
          />
        )
      )}

      {selectedSeats.length > 0 && (
        <div className="relative">
          {submitting && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-3xl z-10 flex items-center justify-center">
              <Loader2 size={32} className="animate-spin text-blue-600" />
            </div>
          )}
          <BookingForm
            onSubmit={handleBookingSubmit}
            disabled={submitting}
          />
        </div>
      )}
    </div>
  );
};
