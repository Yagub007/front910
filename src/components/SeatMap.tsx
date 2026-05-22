import { Users, UserCheck } from 'lucide-react';

interface Props {
  totalSeats: number;
  bookedSeats: number[];
  selectedSeats: number[];
  onSeatClick: (seat: number) => void;
}

const getSeatStyle = (seat: number, booked: number[], selected: number[]) => {
  if (booked.includes(seat)) return 'bg-slate-300 text-slate-400 cursor-not-allowed';
  if (selected.includes(seat)) return 'bg-blue-600 text-white ring-2 ring-blue-300 ring-offset-1 shadow-md';
  return 'bg-slate-200 hover:bg-slate-300 text-slate-700 cursor-pointer';
};

export const SeatMap = ({ totalSeats, bookedSeats, selectedSeats, onSeatClick }: Props) => {
  const mainSeats = Math.min(totalSeats, 36);
  const sideSeats = totalSeats > 36 ? totalSeats - 36 : 0;

  // Build compartments: each has up to 4 seats
  // Seat numbering: compartment i → seats [4i+1, 4i+2, 4i+3, 4i+4]
  // Upper row (even): 4i+2, 4i+4  |  Lower row (odd): 4i+1, 4i+3
  const compartments = Array.from({ length: Math.ceil(mainSeats / 4) }, (_, i) => ({
    topLeft: i * 4 + 2,
    topRight: i * 4 + 4,
    botLeft: i * 4 + 1,
    botRight: i * 4 + 3,
  })).map(c => ({
    ...c,
    topRight: c.topRight <= mainSeats ? c.topRight : null,
    botRight: c.botRight <= mainSeats ? c.botRight : null,
  }));

  // Side berths: from totalSeats down to 37, e.g. [54,53,...,37]
  const sideBerths = Array.from({ length: sideSeats }, (_, i) => totalSeats - i);

  const Seat = ({ num }: { num: number | null }) => {
    if (!num) return <div className="w-10 h-10" />;
    return (
      <button
        disabled={bookedSeats.includes(num)}
        onClick={() => onSeatClick(num)}
        className={`w-10 h-10 rounded-lg text-xs font-semibold transition-all flex items-center justify-center ${getSeatStyle(num, bookedSeats, selectedSeats)}`}
      >
        {num}
      </button>
    );
  };

  return (
    <div className="mt-6 space-y-4">
      {/* Legend */}
      <div className="flex gap-6 justify-center flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-200" />
          <span className="text-sm text-slate-600">Вільне</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600" />
          <span className="text-sm text-slate-600">Обране</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-300" />
          <span className="text-sm text-slate-600">Зайняте</span>
        </div>
      </div>

      {/* Train car */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 overflow-x-auto shadow-soft">
        <div className="flex items-center gap-3 min-w-max">

          {/* Left panel: WC + Conductor */}
          <div className="flex flex-col gap-2 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-500">
              <Users size={18} />
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-500">
              <UserCheck size={18} />
            </div>
          </div>

          {/* Seat area */}
          <div className="flex flex-col gap-3">

            {/* Main compartment berths: upper + lower rows */}
            <div className="flex items-start gap-1">
              {compartments.map((comp, i) => (
                <div key={i} className="flex gap-1 mr-2">
                  {/* Column 1 of compartment */}
                  <div className="flex flex-col gap-1">
                    <Seat num={comp.topLeft} />
                    <Seat num={comp.botLeft} />
                  </div>
                  {/* Column 2 of compartment */}
                  <div className="flex flex-col gap-1">
                    <Seat num={comp.topRight} />
                    <Seat num={comp.botRight} />
                  </div>
                </div>
              ))}
            </div>

            {/* Side berths (single row) */}
            {sideSeats > 0 && (
              <>
                <div className="border-t border-dashed border-slate-200 my-1" />
                <div className="flex gap-1">
                  {sideBerths.map(seat => (
                    <Seat key={seat} num={seat} />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right panel: WC */}
          <div className="shrink-0 self-start">
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-500">
              <Users size={18} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
