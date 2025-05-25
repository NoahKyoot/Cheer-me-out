// HomePage.jsx
// ... (other imports and code remain the same) ...
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addDays, format, startOfWeek } from 'date-fns';

export default function HomePage() {
  // ... (all your existing state, data, and functions remain the same) ...
  // The 'competitions' array here can be just a slice or the first few items
  // if the full list is managed elsewhere or in CompetitionsPage.jsx
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [weekOffset, setWeekOffset] = useState(0);
  const [visibleLevels, setVisibleLevels] = useState(new Set());
  const [visibleTeams, setVisibleTeams] = useState(new Set());

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

  // This 'competitions' array on HomePage could be a subset of all competitions
  const competitions = [
    { id: 'showcase-memphis-2025', name: 'Showcase – Memphis, TN', date: 'November 8, 2025', description: 'Join us for our annual team showcase!' },
    { id: 'cheersport-memphis-2025', name: 'Cheersport – Memphis, TN', date: 'November 9, 2025', description: 'A major regional competition.' },
    { id: 'winter-classic-nashville-2026', name: 'Winter Classic – Nashville, TN', date: 'January 25-26, 2026', description: 'Kick off the new year with fierce competition.' } // Showing 3 here
  ];


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
        {/* ... Week Navigation and Filter Buttons ... */}
        <div className="flex justify-center gap-4">
          <button onClick={() => setWeekOffset(weekOffset - 1)} className="px-4 py-2 bg-pink-100 rounded hover:bg-pink-200 transition-colors">← Previous Week</button>
          <button onClick={() => setWeekOffset(0)} className="px-4 py-2 bg-pink-100 rounded hover:bg-pink-200 transition-colors">This Week</button>
          <button onClick={() => setWeekOffset(weekOffset + 1)} className="px-4 py-2 bg-pink-100 rounded hover:bg-pink-200 transition-colors">Next Week →</button>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-pink-600 mb-3">All Star Tumbling</h3>
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
            <div className="flex flex-wrap justify-center items-center gap-4 mt-3">
              {teamPractice.map((teamInfo) => (
                <button
                  key={teamInfo.team}
                  onClick={() => toggleTeam(teamInfo.team)}
                  className={`rounded overflow-hidden w-20 h-20 border hover:shadow-lg focus:outline-none flex items-center justify-center p-1 transition-all duration-150 ease-in-out ${
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
        
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            {/* ... Table ... */}
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

        {/* MODIFIED UPCOMING COMPETITIONS SECTION */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            <Link to="/competitions" className="hover:text-pink-600 hover:underline transition-colors">
              Upcoming Competitions
            </Link>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* The homepage shows a slice of competitions (e.g., first 3) */}
            {competitions.slice(0, 3).map((comp) => (
              <div key={comp.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow flex flex-col justify-between">
                <div>
                  <h3 className="text-pink-600 font-bold text-xl mb-2">{comp.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">📅 {comp.date}</p>
                </div>
                <Link 
                  to={`/competitions/${comp.id}`} 
                  className="mt-4 inline-block bg-pink-500 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-pink-600 transition-colors self-start"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
