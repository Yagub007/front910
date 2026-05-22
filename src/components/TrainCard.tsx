import { Link } from 'react-router-dom';
import type { Train } from '../types';
import { Train as TrainIcon, Clock, ArrowRight } from 'lucide-react';

export const TrainCard = ({ train }: { train: Train }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-soft hover:shadow-hover transition-all duration-300 border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-6 w-full md:w-auto">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
          <TrainIcon size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">{train.route}</h3>
          <p className="text-sm text-slate-500 font-medium mb-3">Потяг №{train.number}</p>
          <div className="flex items-center gap-2 text-slate-600 text-sm bg-slate-50 px-3 py-1.5 rounded-xl inline-flex">
            <Clock size={16} />
            <span>Відправлення: {train.departure} ({train.duration})</span>
          </div>
        </div>
      </div>
      
      <Link 
        to={`/booking/${train.id}`}
        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-medium transition-colors flex items-center justify-center gap-2"
      >
        Вибрати місця
        <ArrowRight size={18} />
      </Link>
    </div>
  );
};
