import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addDays, format, startOfWeek, parse, isFuture, compareAsc, endOfDay } from 'date-fns'; // Added endOfDay for clarity if needed, though not used directly in weekEnd calc
import { allCompetitions } from './data/competitionsData'; // Ensure this path is correct

// Helper function to shorten time display
const formatTimeShorter = (timeString) => {
  if (!timeString || !timeString.includes(' – ')) return timeString;
  const parts = timeString.split(' – ');
  const startTimePart = parts[0].replace(':00', '').trim(); // "5 PM" or "10 AM"
  const endTimePart = parts[1].replace(':00', '').trim();   // "6 PM" or "11 AM"

  const startMatch = startTimePart.match(/(\d+)\s*(AM|PM)/i);
  const endMatch = endTimePart.match(/(\d+)\s*(AM|PM)/i);

  if (startMatch && endMatch) {
    const startHour = startMatch[1];
    const startPeriod = startMatch[2].toLowerCase();
    const endHour = endMatch[1];
    const endPeriod = endMatch[2].toLowerCase();

    if (startPeriod === endPeriod) {
      return `${startHour}-${endHour}${endPeriod}`; // e.g., "5-6pm" or "10-11am"
    } else {
      return `${startHour}${startPeriod}-${endHour}${endPeriod}`; 
    }
  }
  return timeString; // Fallback
};

export default function HomePage() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [weekOffset, setWeekOffset] = useState(0);
  const [visibleLevels, setVisibleLevels] = useState(new Set());
  const [visibleTeams, setVisibleTeams] = useState(new Set());
  const [upcomingCompetitions, setUpcomingCompetitions] = useState([]);
  
  const navigate = useNavigate();

  const weekStart = addDays(startOfWeek(new Date(), { weekStartsOn: 0 }), weekOffset * 7);
  const weekEnd = addDays(weekStart, 6);

  const levelIcons = { 'Level 1': '🔰', 'Level 2': '🥈', 'Level 3': '🥉', 'Level 4': '🏅', 'Level 5/6': '🔥' };
  const teamIcons = { 
    Majors: '🌟', Legacy: '👑', Blaze: '🔥', Dynasty: '🏰', Reign: '💎',
    Prodigy: '🚀', 'Lady Legends': '🎀', 'Black Smack': '🖤', Inferno: '🔥'
  };
  const tumblingSchedule = [ 
    { level: 'Level 3', day: 'Mon', time: '5:00 PM – 6:00 PM' }, { level: 'Level 5/6', day: 'Mon', time: '5:00 PM – 6:00 PM' },
    { level: 'Level 4', day: 'Mon', time: '6:00 PM – 7:00 PM' }, { level: 'Level 2', day: 'Mon', time: '7:00 PM – 8:00 PM' },
    { level: 'Level 2', day: 'Tue', time: '5:00 PM – 6:00 PM' }, { level: 'Level 1', day: 'Tue', time: '6:00 PM – 7:00 PM' },
    { level: 'Level 3', day: 'Tue', time: '7:00 PM – 8:00 PM' }, { level: 'Level 1', day: 'Wed', time: '5:00 PM – 6:00 PM' },
    { level: 'Level 3', day: 'Wed', time: '6:00 PM – 7:00 PM' }, { level: 'Level 4', day: 'Wed', time: '7:00 PM – 8:00 PM' },
    { level: 'Level 5/6', day: 'Wed', time: '7:00 PM – 8:00 PM' }, { level: 'Level 4', day: 'Thu', time: '5:00 PM – 6:00 PM' },
    { level: 'Level 5/6', day: 'Thu', time: '5:00 PM – 6:00 PM' }, { level: 'Level 2', day: 'Thu', time: '6:00 PM – 7:00 PM' },
    { level: 'Level 1', day: 'Thu', time: '7:00 PM – 8:00 PM' }
  ];
  const teamPractice = [ 
    { team: 'Majors', days: ['Tue', 'Thu'] }, { team: 'Legacy', days: ['Mon', 'Wed'] },
    { team: 'Blaze', days: ['Mon', 'Wed'] }, { team: 'Dynasty', days: ['Tue', 'Thu'] },
    { team: 'Reign', days: ['Mon', 'Wed'] }, { team: 'Prodigy', days: ['Tue', 'Thu'] },
    { team: 'Lady Legends', days: ['Mon', 'Wed'] }, { team: 'Black Smack', days: ['Tue', 'Thu'] },
    { team: 'Inferno', days: ['Mon', 'Wed'] }
  ];

  useEffect(() => {
    const now = new Date();
    const futureCompetitions = allCompetitions
      .map(comp => ({
        ...comp,
        parsedDate: comp.sortableDate ? parse(comp.sortableDate, 'yyyy-MM-dd', new Date()) : null
      }))
      .filter(comp => comp.parsedDate && isFuture(comp.parsedDate))
      .sort((a, b) => compareAsc(a.parsedDate, b.parsedDate));

    setUpcomingCompetitions(futureCompetitions.slice(0, 5)); 
  }, []); 

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
  const getDateForDay = (index) => format(addDays(weekStart, index), 'MMM d');

  const handleShowMonth = () => {
    navigate('/month-calendar');
  };

  return (
    <main className="min-h-screen p-4 md:p-6 bg-slate-900 text-slate-200">
      <header className="text-center mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">Cheer Me Out</h1>
        <p className="text-md md:text-lg text-slate-400">Weekly Calendar, Events, and Team information.</p>
      </header>

      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-semibold text-blue-400 mb-1">
              <Link to="/teams" className="hover:text-blue-300 hover:underline transition-colors duration-150 ease-in-out">
                Memphis Pride Cheer Teams
              </Link>
            </h3>
            <div className="flex items-center overflow-x-auto py-2 gap-3 sm:flex-wrap sm:justify-center sm:overflow-x-visible sm:gap-4 mt-2 md:mt-3">
              {teamPractice.map((teamInfo) => (
                <button
                  key={teamInfo.team}
                  onClick={() => toggleTeam(teamInfo.team)}
                  className={`flex-shrink-0 rounded overflow-hidden w-28 h-28 sm:w-24 sm:h-24 border hover:shadow-lg focus:outline-none flex items-center justify-center p-1 transition-all duration-150 ease-in-out ${
                    visibleTeams.has(teamInfo.team) 
                      ? 'ring-4 ring-red-500 ring-inset bg-slate-700 border-red-500' 
                      : 'bg-slate-800 border-slate-600 hover:border-red-500'
                  }`}
                  title={teamInfo.team}
                >
                  <img
                    src={`/images/${teamInfo.team.replace(/ /g, '')}.png`}
                    alt={teamInfo.team}
                    className="max-w-full max-h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-semibold text-blue-400 mb-2 md:mb-3">
              <Link to="/tumbling-levels" className="hover:text-blue-300 hover:underline transition-colors">
                All Star Tumbling
              </Link>
            </h3>
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
              <img src="/images/Levelup.png" alt="Level Up Logo" className="w-20 h-20 sm:w-24 sm:h-24 object-contain flex-shrink-0 hidden sm:block" />
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                {Object.keys(levelIcons).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => toggleLevel(lvl)}
                    className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded text-xs sm:text-sm transition-colors ${
                      visibleLevels.has(lvl) 
                        ? 'bg-red-600 text-white' 
                        : 'bg-slate-700 text-slate-100 hover:bg-slate-600'
                    }`}
                  >
                    {levelIcons[lvl]} {lvl}
                  </button>
                ))}
              </div>
              <img src="/images/Levelup.png" alt="Level Up Logo" className="w-20 h-20 sm:w-24 sm:h-24 object-contain flex-shrink-0 hidden sm:block" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-6">
          <button
            onClick={() => setWeekOffset(weekOffset - 1)}
            className="p-1.5 sm:p-2 rounded-full hover:bg-slate-700 focus:bg-slate-600 focus:outline-none transition-colors"
            aria-label="Previous Week"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>

          <div className="text-center">
            <h4 className="text-md sm:text-lg md:text-xl font-semibold text-slate-100 whitespace-nowrap">
              {format(weekStart, 'MMMM d')} – {format(weekEnd, 'MMMM d, yyyy')}
            </h4>
            {weekOffset !== 0 && (
              <button
                onClick={() => setWeekOffset(0)}
                className="text-xxs sm:text-xs text-red-500 hover:text-red-400 hover:underline focus:outline-none mt-0.5 sm:mt-1"
              >
                (Go to This Week)
              </button>
            )}
          </div>

          <button
            onClick={() => setWeekOffset(weekOffset + 1)}
            className="p-1.5 sm:p-2 rounded-full hover:bg-slate-700 focus:bg-slate-600 focus:outline-none transition-colors"
            aria-label="Next Week"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>

        <div className="overflow-x-auto bg-slate-800 rounded-lg shadow-md">
            <table className="table-fixed w-full border-collapse"> {/* Applied table-fixed and w-full for responsive fixed columns */}
              <thead>
                <tr className="bg-blue-800">
                  {daysOfWeek.map((day, idx) => (
                    <th key={day} className="w-1/7 sm:w-44 p-2 text-center align-top text-xs sm:text-sm font-semibold text-blue-100 border-b border-blue-700"> {/* Responsive width for TH */}
                      <span className="block sm:inline">{day}</span> 
                      <span className="block sm:hidden text-xxs">{day.substring(0,3)}</span> {/* Abbreviate for xs screens */}
                      <br />
                      <span className="text-xxs sm:text-xs text-blue-300 font-normal">{getDateForDay(idx)}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {daysOfWeek.map((day, dayIndex) => (
                    <td key={day} className={`align-top p-1 sm:p-1.5 border border-slate-700 ${dayIndex === 0 ? 'border-l-0' : ''} ${dayIndex === daysOfWeek.length - 1 ? 'border-r-0' : ''}`}>
                      <ul className="space-y-1 sm:space-y-1.5">
                        {visibleLevels.size > 0 && tumblingSchedule.some((entry) => entry.day === day && visibleLevels.has(entry.level)) && (
                          <li className="bg-slate-700 shadow-sm p-1 sm:p-1.5 rounded">
                            <p className="text-blue-300 font-semibold text-xs sm:text-sm mb-0.5">All Star Tumbling</p>
                            {tumblingSchedule.filter((entry) => entry.day === day && visibleLevels.has(entry.level)).map((entry, idx) => (
                              <div key={`tum-${idx}-${day}`} className="text-[10px] sm:text-xs text-slate-300 leading-tight"> {/* Adjusted font size */}
                                {levelIcons[entry.level]} {entry.level}: {formatTimeShorter(entry.time)}
                              </div>
                            ))}
                          </li>
                        )}
                        {visibleTeams.size > 0 && teamPractice.some((entry) => entry.days.includes(day) && visibleTeams.has(entry.team)) && (
                          <li className="bg-slate-700 shadow-sm p-1 sm:p-1.5 rounded"> 
                            <p className="text-blue-300 font-semibold text-xs sm:text-sm mb-0.5">Team Practices</p>
                            {teamPractice.filter((entry) => entry.days.includes(day) && visibleTeams.has(entry.team)).map((entry, idx) => (
                              <div key={`team-${idx}-${day}`} className="text-[10px] sm:text-xs text-slate-300 leading-tight"> {/* Adjusted font size */}
                                {teamIcons[entry.team] && <span className="mr-0.5 sm:mr-1">{teamIcons[entry.team]}</span>}
                                {entry.team}: {formatTimeShorter('6:00 PM – 8:00 PM')}
                              </div>
                            ))}
                          </li>
                        )}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
        </div>
        
        <div className="text-center"> 
          <button
            onClick={handleShowMonth}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            View Full Month Calendar
          </button>
        </div>

        <section>
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">Upcoming Competitions</h2>
            <Link to="/competitions" className="text-xs sm:text-sm text-red-500 hover:text-red-400 hover:underline transition-colors">
              (View All Competitions)
            </Link>
          </div>
          {upcomingCompetitions.length > 0 ? (
            <div className={`flex overflow-x-auto pb-4 pt-2 px-2 sm:px-4 md:px-6 gap-4 md:gap-6 snap-x snap-mandatory ${
                upcomingCompetitions.length === 1 ? 'justify-center' : ''
            }`}>
              {upcomingCompetitions.map((comp) => (
                <div
                  key={comp.id}
                  className="flex-shrink-0 w-64 sm:w-72 md:w-80 snap-center bg-slate-800 text-slate-200 shadow-xl rounded-lg p-4 sm:p-6 transition-all duration-300 ease-in-out hover:shadow-2xl hover:bg-slate-700 flex flex-col items-center text-center"
                >
                  {comp.logo && (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mb-3 bg-slate-700 rounded-md flex items-center justify-center p-1 sm:p-2 shadow-sm">
                      <img
                        src={`/images/competition-logos/${comp.logo}`}
                        alt={`${comp.brand || comp.eventName} Logo`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  )}
                  <h3 className="text-lg sm:text-xl font-bold text-blue-300 mb-1 line-clamp-2">{comp.eventName}</h3>
                  {comp.brand && <p className="text-xxs sm:text-xs text-slate-400 mb-1 sm:mb-2">{comp.brand}</p>}
                  <p className="text-slate-300 text-xs sm:text-sm mb-1">
                    📅 <span className="font-medium">{comp.fullDates || comp.dateString}</span>
                  </p>
                  {comp.venue && (
                    <p className="text-slate-400 text-xxs sm:text-xs mb-2 sm:mb-3">
                      📍 {comp.venue.name}{comp.venue.address.split(',').length > 1 ? `, ${comp.venue.address.split(',').slice(1, 2).join(',').trim()}` : ''}
                    </p>
                  )}
                  {comp.description && (
                    <p className="text-slate-300 text-xxs sm:text-xs mt-1 mb-3 line-clamp-2 sm:line-clamp-3 flex-grow">
                      {comp.description}
                    </p>
                  )}
                  <Link
                    to={`/competitions/${comp.id}`}
                    className="mt-auto inline-block bg-red-600 text-white px-4 py-1.5 sm:px-5 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-400 py-8">
              <p className="text-lg mb-2">No upcoming competitions found in our current schedule.</p>
              <p>Please check back later or <Link to="/competitions" className="text-red-500 hover:text-red-400 hover:underline">view all competitions</Link>.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
