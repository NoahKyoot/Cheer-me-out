import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  getDay, // 0 for Sunday, 1 for Monday, etc.
} from 'date-fns';
import { allCompetitions } from './data/competitionsData'; // Assuming this path is correct

// For demonstration, defining these here. Ideally, import from a shared data source.
const levelIcons = { 'Level 1': '🔰', 'Level 2': '🥈', 'Level 3': '🥉', 'Level 4': '🏅', 'Level 5/6': '🔥' };
const teamIcons = { 
  Majors: '🌟', Legacy: '👑', Blaze: '🔥', Dynasty: '🏰', Reign: '💎',
  Prodigy: '🚀', 'Lady Legends': '🎀', 'Black Smack': '🖤', Inferno: '🔥'
};
const tumblingSchedule = [ 
  { level: 'Level 1', dayName: 'Mon', time: '5:00 PM – 6:00 PM' }, { level: 'Level 5/6', dayName: 'Mon', time: '5:00 PM – 6:00 PM' },
  { level: 'Level 4', dayName: 'Mon', time: '6:00 PM – 7:00 PM' }, { level: 'Level 2', dayName: 'Mon', time: '7:00 PM – 8:00 PM' },
  { level: 'Level 2', dayName: 'Tue', time: '5:00 PM – 6:00 PM' }, { level: 'Level 1', dayName: 'Tue', time: '6:00 PM – 7:00 PM' },
  { level: 'Level 3', dayName: 'Tue', time: '7:00 PM – 8:00 PM' }, { level: 'Level 1', dayName: 'Wed', time: '5:00 PM – 6:00 PM' },
  { level: 'Level 3', dayName: 'Wed', time: '6:00 PM – 7:00 PM' }, { level: 'Level 4', dayName: 'Wed', time: '7:00 PM – 8:00 PM' },
  { level: 'Level 5/6', dayName: 'Wed', time: '7:00 PM – 8:00 PM' }, { level: 'Level 4', dayName: 'Thu', time: '5:00 PM – 6:00 PM' },
  { level: 'Level 5/6', dayName: 'Thu', time: '5:00 PM – 6:00 PM' }, { level: 'Level 2', dayName: 'Thu', time: '6:00 PM – 7:00 PM' },
  { level: 'Level 1', dayName: 'Thu', time: '7:00 PM – 8:00 PM' }
];
const teamPractice = [ 
  { team: 'Majors', days: ['Tue', 'Thu'] }, { team: 'Legacy', days: ['Mon', 'Wed'] },
  { team: 'Blaze', days: ['Mon', 'Wed'] }, { team: 'Dynasty', days: ['Tue', 'Thu'] },
  { team: 'Reign', days: ['Mon', 'Wed'] }, { team: 'Prodigy', days: ['Tue', 'Thu'] },
  { team: 'Lady Legends', days: ['Mon', 'Wed'] }, { team: 'Black Smack', days: ['Tue', 'Thu'] },
  { team: 'Inferno', days: ['Mon', 'Wed'] }
];
// Helper to map day names to getDay() numbers (0=Sun, 1=Mon, ...)
const dayNameToNumber = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };


export default function MonthCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date()); // e.g. 2025-05-25...
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDayCurrentMonth = startOfMonth(currentMonth);
  const lastDayCurrentMonth = endOfMonth(currentMonth);
  const startDateForGrid = startOfWeek(firstDayCurrentMonth, { weekStartsOn: 0 });
  const endDateForGrid = endOfWeek(lastDayCurrentMonth, { weekStartsOn: 0 });

  const calendarDays = useMemo(() => 
    eachDayOfInterval({ start: startDateForGrid, end: endDateForGrid }),
    [startDateForGrid, endDateForGrid]
  );

  const getEventsForDay = (day) => {
    const events = [];
    const dayOfWeekNumber = getDay(day); // 0 for Sunday, 1 for Monday...
    const formattedDay = format(day, 'yyyy-MM-dd');

    // Competitions
    allCompetitions.forEach(comp => {
      if (comp.sortableDate === formattedDay) {
        events.push({ type: 'Competition', name: comp.eventName, id: comp.id, time: 'All Day (Check Details)' });
      }
    });

    // Tumbling Schedule (recurring weekly)
    tumblingSchedule.forEach(item => {
      if (dayNameToNumber[item.dayName] === dayOfWeekNumber) {
        events.push({ type: 'Tumbling', name: `${levelIcons[item.level]} ${item.level}`, time: item.time });
      }
    });

    // Team Practices (recurring weekly)
    teamPractice.forEach(practice => {
      if (practice.days.some(d => dayNameToNumber[d] === dayOfWeekNumber)) {
        events.push({ type: 'Team Practice', name: `${teamIcons[practice.team]} ${practice.team}`, time: '6:00 PM – 8:00 PM (Typical)' }); // Assuming a typical time
      }
    });
    return events;
  };
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen p-4 md:p-6 bg-slate-900 text-slate-200">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/"
              className="text-blue-400 hover:text-blue-300 hover:underline font-medium transition-colors inline-flex items-center group text-sm sm:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform duration-150 ease-in-out group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Homepage
            </Link>
            <button 
              onClick={handlePrint}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v6a2 2 0 002 2h1v-4a1 1 0 011-1h8a1 1 0 011 1v4h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7V9h6v3z" clipRule="evenodd" />
              </svg>
              Print
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-2 rounded-full hover:bg-slate-700 focus:bg-slate-600 transition-colors"
              aria-label="Previous Month"
            >
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-400 w-64 text-center">
              {format(currentMonth, 'MMMM yyyy')}
            </h1>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 rounded-full hover:bg-slate-700 focus:bg-slate-600 transition-colors"
              aria-label="Next Month"
            >
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-7 gap-px bg-slate-700 border border-slate-700 rounded-lg overflow-hidden shadow-lg">
          {daysOfWeek.map(day => (
            <div key={day} className="py-2 text-center font-semibold text-blue-300 bg-slate-800 text-xs sm:text-sm">
              {day}
            </div>
          ))}
          {calendarDays.map((day, index) => {
            const dayEvents = getEventsForDay(day);
            return (
              <div
                key={index}
                className={`p-1.5 sm:p-2 min-h-[100px] sm:min-h-[120px] overflow-hidden transition-colors duration-150 ease-in-out
                  ${isSameMonth(day, currentMonth) ? 'bg-slate-800 hover:bg-slate-700/50' : 'bg-slate-800/50 text-slate-500 hover:bg-slate-700/30'}
                  ${isToday(day) ? 'ring-2 ring-red-500 ring-inset' : ''}
                `}
              >
                <span className={`text-xs sm:text-sm font-medium ${isToday(day) ? 'text-red-400' : isSameMonth(day, currentMonth) ? 'text-slate-100' : 'text-slate-600'}`}>
                  {format(day, 'd')}
                </span>
                <div className="mt-1 space-y-0.5 text-xs overflow-y-auto max-h-[80px] sm:max-h-[90px]">
                  {dayEvents.map((event, idx) => (
                    <div 
                      key={idx} 
                      className={`p-0.5 rounded text-left ${
                        event.type === 'Competition' ? 'bg-red-600/30 text-red-200' : 
                        event.type === 'Tumbling' ? 'bg-blue-600/30 text-blue-200' : 
                        'bg-purple-600/30 text-purple-200' // Team Practice
                      }`}
                      title={`${event.name} - ${event.time || ''}`}
                    >
                      <span className="font-semibold truncate block">{event.name}</span>
                      {event.time && <span className="text-xxs truncate block">{event.time}</span>}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
