import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const today = new Date();
  
  // Sample events data
  const events = [
    { date: 5, title: 'Team Meeting', time: '10:00 AM' },
    { date: 12, title: 'Project Review', time: '2:00 PM' },
    { date: 15, title: 'Client Call', time: '11:30 AM' },
    { date: 20, title: 'Training Session', time: '9:00 AM' },
    { date: 25, title: 'Deadline', time: '5:00 PM' }
  ];
  
  const getDayEvents = (day: number) => {
    return events.filter(event => event.date === day);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Calendar</h1>
        <button className="btn btn-primary">
          <Plus size={18} />
          Add Event
        </button>
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex items-center gap-2">
                <button 
                  onClick={prevMonth}
                  className="p-1.5 rounded-md hover:bg-gray-100"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={nextMonth}
                  className="p-1.5 rounded-md hover:bg-gray-100"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <button 
              onClick={() => setCurrentDate(new Date())}
              className="text-sm font-medium px-3 py-1.5 text-sky-600 hover:bg-sky-50 rounded-md"
            >
              Today
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {/* Weekday headers */}
            {weekdays.map((day, index) => (
              <div 
                key={index} 
                className="bg-white py-2 text-center text-sm font-medium text-gray-600"
              >
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="bg-white min-h-[100px]" />
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const isToday = 
                today.getDate() === day && 
                today.getMonth() === currentDate.getMonth() && 
                today.getFullYear() === currentDate.getFullYear();
              const dayEvents = getDayEvents(day);
              
              return (
                <div 
                  key={`day-${day}`} 
                  className={`bg-white min-h-[100px] p-1 ${isToday ? 'ring-2 ring-sky-500 z-10' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-center justify-between p-1">
                    <span 
                      className={`
                        text-sm font-medium h-6 w-6 flex items-center justify-center rounded-full
                        ${isToday ? 'bg-sky-500 text-white' : 'text-gray-700'}
                      `}
                    >
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="text-xs text-gray-500">{dayEvents.length} events</span>
                    )}
                  </div>
                  
                  <div className="mt-1 space-y-1">
                    {dayEvents.map((event, eventIndex) => (
                      <div 
                        key={eventIndex}
                        className="bg-sky-50 border-l-2 border-sky-500 px-2 py-1 text-xs text-gray-800 rounded-sm"
                      >
                        <div className="font-medium">{event.title}</div>
                        <div className="text-gray-600">{event.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;