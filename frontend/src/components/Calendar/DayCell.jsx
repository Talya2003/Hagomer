import { Clock } from 'lucide-react';
import { 
  formatDayNumber, 
  getHebrewDayName, 
  isToday, 
  isPast,
  isWeekend 
} from '../../utils/dateUtils';

export default function DayCell({ date, hebrewDate, events = [], onClick }) {
  const dayNumber = formatDayNumber(date);
  const dayName = getHebrewDayName(date);
  const isTodayDate = isToday(date);
  const isPastDate = isPast(date);
  const isWeekendDate = isWeekend(date);

  return (
    <div
      onClick={onClick}
      className={`
        day-cell relative overflow-hidden
        ${isTodayDate ? 'ring-4 ring-gold shadow-2xl scale-105' : ''}
        ${isPastDate ? 'opacity-60 bg-gray-50' : 'bg-white'}
        ${isWeekendDate ? 'bg-gold/5' : ''}
      `}
    >
      {/* Today badge */}
      {isTodayDate && (
        <div className="absolute top-0 left-0 bg-gold text-white text-xs font-bold px-2 py-1 rounded-br-lg">
          היום
        </div>
      )}

      {/* Day name */}
      <div className="day-cell-header text-center">
        {dayName}
      </div>

      {/* Gregorian date */}
      <div className="gregorian-date text-center mb-1">
        {dayNumber}
      </div>

      {/* Hebrew date */}
      {hebrewDate && (
        <div className="hebrew-date text-center mb-2 text-xs">
          {hebrewDate}
        </div>
      )}

      {/* Events list */}
      {events.length > 0 && (
        <div className="space-y-1 mt-2">
          {events.slice(0, 2).map((event, idx) => (
            <div
              key={idx}
              className="event-badge text-right flex items-center gap-1 justify-end"
            >
              {event.start_time && (
                <Clock className="w-3 h-3" />
              )}
              <span className="truncate text-xs">
                {event.title}
              </span>
            </div>
          ))}
          {events.length > 2 && (
            <div className="text-xs text-gold-dark text-center font-semibold">
              +{events.length - 2} נוספים
            </div>
          )}
        </div>
      )}

      {/* Weekend indicator */}
      {isWeekendDate && (
        <div className="absolute bottom-1 left-1 text-gold text-xs">
          ✨
        </div>
      )}
    </div>
  );
}