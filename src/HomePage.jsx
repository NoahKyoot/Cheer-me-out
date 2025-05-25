import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addDays, format, startOfWeek, parse, isFuture, compareAsc } from 'date-fns';
import { allCompetitions } from './data/competitionsData'; // Ensure this path is correct

export default function HomePage() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [weekOffset, setWeekOffset] = useState(0);
  const [visibleLevels, setVisibleLevels] = useState(new Set());
  const [visibleTeams, setVisibleTeams] = useState(new Set());
  const [upcomingCompetitions, setUpcomingCompetitions] = useState([]);

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

  return (
    <main className="min-h-screen p-6 bg-slate-50"> {/* Updated page background */}
      <header className="text-center mb-8">
        {/* Primary Dark Blue for main title */}
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Cheer Me Out</h1>
        {/* Neutral text for subtitle */}
        <p className="text-lg text-slate-600">Weekly Calendar, Events, and Team information.</p>
      </header>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Button Filters Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-slate-700 mb-3"> {/* Primary Dark Blue variant */}
              <Link to="/tumbling-levels" className="hover:text-slate-500 hover:underline transition-colors">
                All Star Tumbling
              </Link>
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.keys(levelIcons).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => toggleLevel(lvl)}
                  // Using Accent Coral for selected state
                  className={`px-4 py-2 rounded text-sm sm:text-base transition-colors ${visibleLevels.has(lvl) ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                >
                  {levelIcons[lvl]} {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold text-slate-700 mb-1"> {/* Primary Dark Blue variant */}
              <Link to="/teams" className="hover:text-slate-500 hover:underline transition-colors duration-150 ease-in-out">
                Memphis Pride Cheer Teams
              </Link>
            </h3>
            <div className="flex items-center overflow-x-auto py-2 gap-3 sm:flex-wrap sm:justify-center sm:overflow-x-visible sm:gap-4 mt-3">
              {teamPractice.map((teamInfo) => (
                <button
                  key={teamInfo.team}
                  onClick={() => toggleTeam(teamInfo.team)}
                  // Using Accent Coral for selected state ring/bg
                  className={`flex-shrink-0 rounded overflow-hidden w-28 h-28 sm:w-24 sm:h-24 border hover:shadow-lg focus:outline-none flex items-center justify-center p-1 transition-all duration-150 ease-in-out ${
                    visibleTeams.has(teamInfo.team) ? 'ring-4 ring-orange-500 ring-inset bg-orange-50 border-orange-300' : 'bg-white border-slate-300 hover:border-orange-400'
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
        </div>
        
        {/* Week Navigation */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-4">
          <button
            onClick={() => setWeekOffset(weekOffset - 1)}
            // Using Primary Dark Blue variant for arrows, subtle hover BG
            className="p-2 rounded-full hover:bg-slate-200 focus:bg-slate-300 focus:outline-none transition-colors"
            aria-label="Previous Week"
          >
            <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>

          <div className="text-center flex-grow md:flex-grow-0">
            <h4 className="text-lg sm:text-xl font-semibold text-slate-700 whitespace-nowrap">
              {format(weekStart, 'MMMM d')} – {format(weekEnd, 'MMMM d, yyyy')}
            </h4>
            {weekOffset !== 0 && (
              <button
                onClick={() => setWeekOffset(0)}
                // Using Accent Coral for "This Week" link
                className="text-xs text-orange-600 hover:underline focus:outline-none"
              >
                (Go to This Week)
              </button>
            )}
          </div>

          <button
            onClick={() => setWeekOffset(weekOffset + 1)}
            className="p-2 rounded-full hover:bg-slate-200 focus:bg-slate-300 focus:outline-none transition-colors"
            aria-label="Next Week"
          >
            <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>

        {/* Calendar Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full border-collapse">
              <thead>
                {/* Primary Dark Blue theme for table header */}
                <tr className="bg-slate-200">
                  {daysOfWeek.map((day, idx) => (
                    <th key={day} className="p-3 text-left text-sm font-semibold text-slate-700 border-b border-slate-300">{day}<br /><span className="text-xs text-slate-500 font-normal">{getDateForDay(idx)}</span></th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {daysOfWeek.map((day, dayIndex) => (
                    <td key={day} className={`align-top p-2 border border-slate-200 w-1/7 ${dayIndex === 0 ? 'border-l-0' : ''} ${dayIndex === daysOfWeek.length - 1 ? 'border-r-0' : ''}`}>
                      <ul className="space-y-2">
                        {visibleLevels.size > 0 && tumblingSchedule.some((entry) => entry.day === day && visibleLevels.has(entry.level)) && (
                          // Light tint of Accent Coral for tumbling items
                          <li className="bg-orange-50 shadow-sm p-2 rounded">
                            <p className="text-orange-700 font-semibold text-sm mb-1">All Star Tumbling</p>
                            {tumblingSchedule.filter((entry) => entry.day === day && visibleLevels.has(entry.level)).map((entry, idx) => (
                              <div key={`tum-${idx}-${day}`} className="text-xs text-slate-700">
                                {levelIcons[entry.level]} {entry.level}: {entry.time}
                              </div>
                            ))}
                          </li>
                        )}
                        {visibleTeams.size > 0 && teamPractice.some((entry) => entry.days.includes(day) && visibleTeams.has(entry.team)) && (
                          // Light tint of Primary Blue for team practice items
                          <li className="bg-slate-100 shadow-sm p-2 rounded"> 
                            <p className="text-slate-700 font-semibold text-sm mb-1">Team Practices</p>
                            {teamPractice.filter((entry) => entry.days.includes(day) && visibleTeams.has(entry.team)).map((entry, idx) => (
                              <div key={`team-${idx}-${day}`} className="text-xs text-slate-700">
                                {teamIcons[entry.team] && <span className="mr-1">{teamIcons[entry.team]}</span>}
                                {entry.team}: 6:00 PM – 8:00 PM
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
        
        {/* "Upcoming Competitions" Section */}
        <section>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Upcoming Competitions</h2>
            {/* Accent Coral for "View All" link */}
            <Link to="/competitions" className="text-sm text-orange-600 hover:text-orange-700 hover:underline transition-colors">
              (View All Competitions)
            </Link>
          </div>
          {upcomingCompetitions.length > 0 ? (
            <div className={`flex overflow-x-auto pb-4 pt-2 px-4 sm:px-6 gap-6 snap-x snap-mandatory ${
                upcomingCompetitions.length === 1 ? 'justify-center' : ''
            }`}>
              {upcomingCompetitions.map((comp) => (
                <div
                  key={comp.id}
                  className="flex-shrink-0 w-72 md:w-80 snap-center bg-white shadow-xl rounded-lg p-6 transition-all duration-300 ease-in-out hover:shadow-2xl flex flex-col items-center text-center"
                >
                  {comp.logo && (
                    <div className="w-24 h-24 mb-4 bg-gray-100 rounded-md flex items-center justify-center p-2 shadow-sm">
                      <img
                        src={`/images/competition-logos/${comp.logo}`}
                        alt={`${comp.brand || comp.eventName} Logo`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  )}
                  {/* Accent Coral for card title */}
                  <h3 className="text-xl font-bold text-orange-600 mb-1 line-clamp-2">{comp.eventName}</h3>
                  {comp.brand && <p className="text-xs text-slate-400 mb-2">{comp.brand}</p>}
                  <p className="text-slate-700 text-sm mb-1">
                    📅 <span className="font-medium">{comp.fullDates || comp.dateString}</span>
                  </p>
                  {comp.venue && (
                    <p className="text-slate-500 text-xs mb-3">
                      📍 {comp.venue.name}{comp.venue.address.split(',').length > 1 ? `, ${comp.venue.address.split(',').slice(1, 2).join(',').trim()}` : ''}
                    </p>
                  )}
                  {comp.description && (
                    <p className="text-slate-600 text-xs mt-1 mb-3 line-clamp-3 flex-grow">
                      {comp.description}
                    </p>
                  )}
                  {/* Accent Coral for "View Details" button */}
                  <Link
                    to={`/competitions/${comp.id}`}
                    className="mt-auto inline-block bg-orange-500 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-600 py-8">
              <p className="text-lg mb-2">No upcoming competitions found in our current schedule.</p>
              <p>Please check back later or <Link to="/competitions" className="text-orange-600 hover:underline">view all competitions</Link>.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
