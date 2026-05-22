import type { Wagon } from '../types';

interface Props {
  wagons: Wagon[];
  selectedWagonId: string;
  onSelect: (id: string) => void;
}

export const WagonSelector = ({ wagons, selectedWagonId, onSelect }: Props) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {wagons.map(wagon => (
        <button
          key={wagon.id}
          onClick={() => onSelect(wagon.id)}
          className={`px-6 py-3 rounded-2xl font-medium transition-all whitespace-nowrap ${
            selectedWagonId === wagon.id
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Вагон {wagon.id.replace('w', '')} • {wagon.type}
        </button>
      ))}
    </div>
  );
};
