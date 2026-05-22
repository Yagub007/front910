import { useState } from 'react';
import { mockTrains } from '../data/trains';
import { TrainCard } from './TrainCard';
import { Search } from 'lucide-react';

export const TrainList = () => {
  const [search, setSearch] = useState('');

  const filteredTrains = mockTrains.filter(train => 
    train.route.toLowerCase().includes(search.toLowerCase()) || 
    train.number.includes(search)
  );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-slate-800 mb-8 tracking-tight">Пошук рейсів</h1>
      
      <div className="relative mb-10">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="text-slate-400" size={20} />
        </div>
        <input
          type="text"
          placeholder="Звідки - Куди або номер потяга..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white rounded-3xl py-4 pl-12 pr-6 border-none shadow-soft focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-700 text-lg"
        />
      </div>

      <div className="flex flex-col gap-6">
        {filteredTrains.length > 0 ? (
          filteredTrains.map(train => (
            <TrainCard key={train.id} train={train} />
          ))
        ) : (
          <div className="text-center py-20 text-slate-500">
            Рейсів не знайдено. Спробуйте інший запит.
          </div>
        )}
      </div>
    </div>
  );
};
