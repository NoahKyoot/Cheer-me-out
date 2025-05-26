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
  getDay,
} from 'date-fns';
import { allCompetitions } from './data/competitionsData'; // Assuming this path is correct

// Data for filters & calendar display (Ideally, import from shared data files)
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
const dayNameToNumber = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export default function MonthCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [visibleLevels, setVisibleLevels] = useState(new Set());
  const [visibleTeams, setVisibleTeams] = useState(new Set());
  const daysOfWeekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const firstDayCurrentMonth = startOfMonth(currentMonth);
  const startDateForGrid = startOfWeek(firstDayCurrentMonth, { weekStartsOn: 0 });
  const endDateForGrid = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });

  const calendarDays = useMemo(() => 
    eachDayOfInterval({ start: startDateForGrid, end: endDateForGrid }),
    [startDateForGrid, endDateForGrid]
  );

  const toggleLevel = (lvl) => {
    const updated = new Set(visibleLevels);
    updated.has(lvl) ? updated.delete(lvl) : updated.add(lvl);
    setVisibleLevels(updated);
  };
  const toggleTeam = (team) => {
    const updated = new Set(visibleTeams);
    updated.has(team) ? updated.delete(team) : updated.add(team);
    setVisibleTeams(updated);
  };

  const getEventsForDay = (day) => {
    const events = [];
    const dayOfWeekNumber = getDay(day);
    const formattedDay = format(day, 'yyyy-MM-dd');

    allCompetitions.forEach(comp => {
      if (comp.sortableDate === formattedDay) {
        events.push({ type: 'Competition', name: comp.eventName, id: comp.id, time: comp.fullDates || comp.dateString });
      }
    });

    if (visibleLevels.size > 0) { 
        tumblingSchedule.forEach(item => {
            if (dayNameToNumber[item.dayName] === dayOfWeekNumber) {
                if (visibleLevels.has(item.level)) {
                    events.push({ type: 'Tumbling', name: `${levelIcons[item.level]} ${item.level}`, time: item.time });
                }
            }
        });
    }
    
    if (visibleTeams.size > 0) {
        teamPractice.forEach(practice => {
            if (practice.days.some(d => dayNameToNumber[d] === dayOfWeekNumber)) {
                if (visibleTeams.has(practice.team)) {
                    events.push({ type: 'Team Practice', name: `${teamIcons[practice.team]} ${practice.team}`, time: '6:00 PM – 8:00 PM (Typical)' });
                }
            }
        });
    }
    return events;
  };
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen p-4 md:p-6 bg-slate-900 text-slate-200">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-6 md:mb-8 no-print">
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
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center no-print"
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
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-400 w-64 text-center tabular-nums">
              {format(currentMonth, 'MMMM yyyy')} {/* Completed format string */}
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

        {/* Combined Filter Buttons Section */}
        <div className="p-4 md:p-6 bg-slate-800 rounded-lg shadow-md no-print mb-6 md:mb-8">
          <h3 className="text-2xl font-bold text-blue-400 mb-4 text-center">Filter by Teams and Tumbling</h3>
          
          {/* Team Filters - Sub-section */}
          <div className="mb-6">
            <div className="flex items-center overflow-x-auto py-2 gap-3 sm:flex-wrap sm:justify-center sm:overflow-x-visible sm:gap-4">
              {teamPractice.map((tp) => (
                <button
                  key={tp.team}
                  onClick={() => toggleTeam(tp.team)}
                  className={`flex-shrink-0 rounded overflow-hidden w-20 h-20 sm:w-20 sm:h-20 border-2 hover:shadow-md focus:outline-none flex items-center justify-center p-0.5 transition-all duration-150 ease-in-out ${
                    visibleTeams.has(tp.team) 
                      ? 'ring-4 ring-red-400 ring-inset border-red-500' 
                      : 'border-slate-600 hover:border-red-400'
                  }`}
                  title={tp.team}
                >
                  <img
                    src={`/images/${tp.team.replace(/ /g, '')}.png`}
                    alt={tp.team}
                    className="max-w-full max-h-full object-contain rounded-sm"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Tumbling Filters - Sub-section */}
          <div>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.keys(levelIcons).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => toggleLevel(lvl)}
                  className={`px-4 py-2 rounded text-sm sm:text-base transition-colors ${
                    visibleLevels.has(lvl) 
                      ? 'bg-red-600 text-white' 
                      : 'bg-slate-700 text-slate-100 hover:bg-slate-600'
                  }`}
                >
                  {levelIcons[lvl]} {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* End of Filter Buttons Section */}

        {/* Calendar Grid */}
        <div 
          id="month-calendar-grid"
          className="grid grid-cols-7 gap-px bg-slate-700 border border-slate-700 rounded-lg overflow-hidden shadow-lg"
        >
          {daysOfWeekNames.map(dayName => (
            <div key={dayName} className="py-2 text-center font-semibold text-blue-300 bg-slate-800 text-xs sm:text-sm">
              {dayName}
            </div>
          ))}
          {calendarDays.map((dayDate, index) => {
            const dayEvents = getEventsForDay(dayDate);
            return (
              <div
                key={index}
                className={`p-1.5 sm:p-2 min-h-[100px] sm:min-h-[120px] md:min-h-[140px] overflow-hidden transition-colors duration-150 ease-in-out
                  ${isSameMonth(dayDate, currentMonth) ? 'bg-slate-800 hover:bg-slate-700/80' : 'bg-slate-800/40 text-slate-600 hover:bg-slate-700/50'}
                  ${isToday(dayDate) ? 'ring-2 ring-red-500 ring-inset' : ''}
                `}
              >
                <span className={`text-xs sm:text-sm font-medium ${isToday(dayDate) ? 'text-red-400' : isSameMonth(dayDate, currentMonth) ? 'text-slate-100' : 'text-slate-500'}`}>
                  {format(dayDate, 'd')}
                </span>
                <div className="mt-1 space-y-0.5 text-xxs sm:text-xs overflow-y-auto max-h-[70px] sm:max-h-[90px] md:max-h-[110px] no-scrollbar-thin"> {/* Custom class for thinner scrollbar if needed */}
                  {dayEvents.map((event, idx) => (
                    <div 
                      key={idx} 
                      className={`p-1 rounded text-left text-opacity-90 event-item-print ${ 
                        event.type === 'Competition' ? 'bg-red-700/70 hover:bg-red-600/70 text-red-100' : 
                        event.type === 'Tumbling' ? 'bg-blue-700/70 hover:bg-blue-600/70 text-blue-100' : 
                        'bg-purple-700/70 hover:bg-purple-600/70 text-purple-100'
                      }`}
                      title={`${event.name}${event.time ? ` - ${event.time}` : ''}`}
                    >
                      <span className="font-semibold truncate block leading-tight">{event.name}</span>
                      {event.time && <span className="text-xxs opacity-80 truncate block leading-tight">{event.time}</span>}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div> {/* End of Calendar Grid */}
      </div> 
    </main>
  );
}
