import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addDays, format, startOfWeek, parse, isFuture, compareAsc } from 'date-fns';
import { allCompetitions } from './data/competitionsData'; // Ensure this path is correct

export default function HomePage() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [weekOffset, setWeekOffset] = useState(0);
  const [visibleLevels, setVisibleLevels] = useState(new Set());
  const [visibleTeams, setVisibleTeams] = useState(new Set());
  // Changed from nextCompetition (single object) to upcomingCompetitions (array)
  const [upcomingCompetitions, setUpcomingCompetitions] = useState([]);

  const weekStart = addDays(startOfWeek(new Date(), { weekStartsOn: 0 }), weekOffset * 7);

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

    // Set a slice of future competitions (e.g., up to 5) for the scrollable list
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
    <main className="min-h-screen p-6 bg-gray-50">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-pink-600 mb-2">Cheer Me Out</h1>
        <p className="text-lg text-gray-700">Weekly Calendar with Image Buttons</p>
      </header>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Week Navigation */}
        <div className="flex justify-center gap-4">
          <button onClick={() => setWeekOffset(weekOffset - 1)} className="px-4 py-2 bg-pink-100 rounded hover:bg-pink-200 transition-colors">← Previous Week</button>
          <button onClick={() => setWeekOffset(0)} className="px-4 py-2 bg-pink-100 rounded hover:bg-pink-200 transition-colors">This Week</button>
          <button onClick={() => setWeekOffset(weekOffset + 1)} className="px-4 py-2 bg-pink-100 rounded hover:bg-pink-200 transition-colors">Next Week →</button>
        </div>

        {/* Button Filters Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-pink-600 mb-3">
              <Link to="/tumbling-levels" className="hover:text-pink-400 hover:underline transition-colors">
                All Star Tumbling
              </Link>
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.keys(levelIcons).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => toggleLevel(lvl)}
                  className={`px-4 py-2 rounded text-sm sm:text-base transition-colors ${visibleLevels.has(lvl) ? 'bg-pink-600 text-white' : 'bg-pink-100 text-pink-800 hover:bg-pink-200'}`}
                >
                  {levelIcons[lvl]} {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold text-yellow-700 mb-1">
              <Link to="/teams" className="hover:text-yellow-500 hover:underline transition-colors duration-150 ease-in-out">
                Memphis Pride Cheer Teams
              </Link>
            </h3>
            <div className="flex items-center overflow-x-auto py-2 gap-3 sm:flex-wrap sm:justify-center sm:overflow-x-visible sm:gap-4 mt-3">
              {teamPractice.map((teamInfo) => (
                <button
                  key={teamInfo.team}
                  onClick={() => toggleTeam(teamInfo.team)}
                  className={`flex-shrink-0 rounded overflow-hidden w-24 h-24 sm:w-24 sm:h-24 border hover:shadow-lg focus:outline-none flex items-center justify-center p-1 transition-all duration-150 ease-in-out ${
                    visibleTeams.has(teamInfo.team) ? 'ring-4 ring-yellow-500 ring-inset bg-yellow-50 border-yellow-300' : 'bg-white border-gray-300 hover:border-yellow-400'
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
        
        {/* Calendar Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-pink-100">
                  {daysOfWeek.map((day, idx) => (
                    <th key={day} className="p-3 text-left text-sm font-semibold text-pink-800 border-b border-pink-200">{day}<br /><span className="text-xs text-gray-500 font-normal">{getDateForDay(idx)}</span></th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {daysOfWeek.map((day, dayIndex) => (
                    <td key={day} className={`align-top p-2 border border-gray-200 w-1/7 ${dayIndex === 0 ? 'border-l-0' : ''} ${dayIndex === daysOfWeek.length - 1 ? 'border-r-0' : ''}`}>
                      <ul className="space-y-2">
                        {/* ... Tumbling and Team Practice list items ... */}
                        {visibleLevels.size > 0 && tumblingSchedule.some((entry) => entry.day === day && visibleLevels.has(entry.level)) && (
                          <li className="bg-pink-50 shadow-sm p-2 rounded">
                            <p className="text-pink-700 font-semibold text-sm mb-1">All Star Tumbling</p>
                            {tumblingSchedule.filter((entry) => entry.day === day && visibleLevels.has(entry.level)).map((entry, idx) => (
                              <div key={`tum-${idx}-${day}`} className="text-xs text-gray-700">
                                {levelIcons[entry.level]} {entry.level}: {entry.time}
                              </div>
                            ))}
                          </li>
                        )}
                        {visibleTeams.size > 0 && teamPractice.some((entry) => entry.days.includes(day) && visibleTeams.has(entry.team)) && (
                          <li className="bg-yellow-50 shadow-sm p-2 rounded">
                            <p className="text-yellow-700 font-semibold text-sm mb-1">Team Practices</p>
                            {teamPractice.filter((entry) => entry.days.includes(day) && visibleTeams.has(entry.team)).map((entry, idx) => (
                              <div key={`team-${idx}-${day}`} className="text-xs text-gray-700">
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
        
        {/* UPDATED Upcoming Competitions Section */}
        <section>
          <div className="text-center mb-6">
            {/* Changed heading to plural as we are showing a list */}
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Upcoming Competitions</h2>
            <Link to="/competitions" className="text-sm text-pink-600 hover:text-pink-800 hover:underline transition-colors">
              (View All Competitions)
            </Link>
          </div>

          {upcomingCompetitions.length > 0 ? (
            // Horizontally scrollable container for competition cards
            // Note: For a truly "no scrollbar" experience, you might need custom CSS like:
            // .no-scrollbar::-webkit-scrollbar { display: none; }
            // .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            // and add 'no-scrollbar' class to the div below.
            <div className="flex overflow-x-auto pb-4 pt-2 gap-6 snap-x snap-mandatory">
              {upcomingCompetitions.map((comp) => (
                <div
                  key={comp.id}
                  // Each card: flex-shrink-0 is important for scrollable flex items.
                  // w-80 (320px) or w-72 (288px) is a good starting width for mobile.
                  // Adjust width for different screen sizes if desired.
                  className="flex-shrink-0 w-80 snap-center bg-white shadow-xl rounded-lg p-6 transition-all duration-300 ease-in-out hover:shadow-2xl flex flex-col items-center text-center"
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
                  <h3 className="text-xl font-bold text-pink-600 mb-1 line-clamp-2">{comp.eventName}</h3>
                  {comp.brand && <p className="text-xs text-gray-400 mb-2">{comp.brand}</p>}
                  <p className="text-gray-700 text-sm mb-1">
                    📅 <span className="font-medium">{comp.fullDates || comp.dateString}</span>
                  </p>
                  {comp.venue && (
                    <p className="text-gray-500 text-xs mb-3">
                      📍 {comp.venue.name}{comp.venue.address.split(',').length > 1 ? `, ${comp.venue.address.split(',').slice(1, 2).join(',').trim()}` : ''} {/* Show only city if address is long */}
                    </p>
                  )}
                  {comp.description && (
                    <p className="text-gray-600 text-xs mt-1 mb-3 line-clamp-3 flex-grow">
                      {comp.description}
                    </p>
                  )}
                  <Link
                    to={`/competitions/${comp.id}`}
                    className="mt-auto inline-block bg-pink-500 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-pink-600 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 py-8">
              <p className="text-lg mb-2">No upcoming competitions found in our current schedule.</p>
              <p>Please check back later or <Link to="/competitions" className="text-pink-600 hover:underline">view all competitions</Link>.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
