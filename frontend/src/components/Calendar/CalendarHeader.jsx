import { GraduationCap, Calendar, Plus } from 'lucide-react';
import { APP_TITLE, END_DATE } from '../../utils/constants';
import { getDaysRemaining } from '../../utils/dateUtils';

export default function CalendarHeader({ onAddEvent }) {
  const daysLeft = getDaysRemaining(END_DATE);

  return (
    <header className="gradient-gold text-white py-8 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* Title with graduation cap */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <GraduationCap className="w-12 h-12 float-animation" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
            {APP_TITLE}
          </h1>
          <GraduationCap className="w-12 h-12 float-animation" style={{ animationDelay: '1s' }} />
        </div>

        {/* Subtitle */}
        <div className="text-center text-white/90 space-y-2">
          <div className="flex items-center justify-center gap-2 text-lg">
            <Calendar className="w-5 h-5" />
            <span>הספירה לאחור לגמר</span>
          </div>
          
          {/* Days remaining counter */}
          <div className="text-3xl font-bold bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 inline-block">
            <span className="text-5xl">{daysLeft}</span>
            <span className="text-xl mr-2">ימים נותרו</span>
          </div>
        </div>

        {/* Add Event Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onAddEvent}
            className="bg-white text-gold-dark hover:bg-gold-dark hover:text-white 
                     font-semibold py-3 px-6 rounded-full shadow-lg 
                     transition-all duration-300 transform hover:scale-105
                     flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            הוספת אירוע
          </button>
        </div>
      </div>
    </header>
  );
}