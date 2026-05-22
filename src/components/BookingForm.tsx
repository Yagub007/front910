import { useState } from 'react';

interface Props {
  onSubmit: (user: { name: string; phone: string; email: string }) => void;
  disabled: boolean;
}

export const BookingForm = ({ onSubmit, disabled }: Props) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-soft border border-slate-100 mt-6 space-y-4">
      <h3 className="text-xl font-bold text-slate-800 mb-6">Контактні дані</h3>
      
      <input
        required
        type="text"
        placeholder="Прізвище та Ім'я"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full rounded-2xl border-none bg-slate-50 p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        required
        type="tel"
        placeholder="Номер телефону"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full rounded-2xl border-none bg-slate-50 p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        required
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full rounded-2xl border-none bg-slate-50 p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      
      <button
        type="submit"
        disabled={disabled}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-4 rounded-2xl mt-4 transition-colors"
      >
        Підтвердити бронювання
      </button>
    </form>
  );
};
