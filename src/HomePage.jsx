import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addDays, format, startOfWeek } from 'date-fns';

export default function HomePage() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [weekOffset, setWeekOffset] = useState(0);
  const [visibleLevels, setVisibleLevels] = useState(new Set());
  const [visibleTeams, setVisibleTeams] = useState(new Set());
  const [showSpecials, setShowSpecials] = useState(false);

  const weekStart = addDays(startOfWeek(new Date(), { weekStartsOn: 0 }), weekOffset * 7);

  const levelIcons = { 'Level 1': '🔰', 'Level 2': '🥈', 'Level 3': '🥉', 'Level 4': '🏅', 'Level 5/6': '🔥' };
  const teamIcons = {
    Majors: '🌟',
    Legacy: '👑',
    Blaze: '🔥',
    Dynasty: '🏰',
    Reign: '💎',
    Prodigy: '🚀',
    'Lady Legends': '🎀',
    'Black Smack': '🖤',
    Inferno: '🔥'
  };
  const specialsIcon = '✨';

  const tumblingSchedule = [
    { level: 'Level 3', day: 'Mon', time: '5:00 PM – 6:00 PM' },
    { level: 'Level 5/6', day: 'Mon', time: '5:00 PM – 6:00 PM' },
    { level: 'Level 4', day: 'Mon', time: '6:00 PM – 7:00 PM' },
    { level: 'Level 2', day: 'Mon', time: '7:00 PM – 8:00 PM' },
    { level: 'Level 2', day: 'Tue', time: '5:00 PM – 6:00 PM' },
    { level: 'Level 1', day: 'Tue', time: '6:00 PM – 7:00 PM' },
    { level: 'Level 3', day: 'Tue', time: '7:00 PM – 8:00 PM' },
    { level: 'Level 1', day: 'Wed', time: '5:00 PM – 6:00 PM' },
    { level: 'Level 3', day: 'Wed', time: '6:00 PM – 7:00 PM' },
    { level: 'Level 4', day: 'Wed', time: '7:00 PM – 8:00 PM' },
    { level: 'Level 5/6', day: 'Wed', time: '7:00 PM – 8:00 PM' },
    { level: 'Level 4', day: 'Thu', time: '5:00 PM – 6:00 PM' },
    { level: 'Level 5/6', day: 'Thu', time: '5:00 PM – 6:00 PM' },
    { level: 'Level 2', day: 'Thu', time: '6:00 PM – 7:00 PM' },
    { level: 'Level 1', day: 'Thu', time: '7:00 PM – 8:00 PM' }
  ];

  const teamPractice = [
    { team: 'Legacy', days: ['Tue', 'Thu'] },
    { team: 'Blaze', days: ['Mon', 'Wed'] },
    { team: 'Dynasty', days: ['Mon', 'Wed'] },
    { team: 'Reign', days: ['Tue', 'Thu'] },
    { team: 'Prodigy', days: ['Mon', 'Wed'] },
    { team: 'Lady Legends', days: ['Mon', 'Wed'] },
    { team: 'Black Smack', days: ['Tue', 'Thu'] },
    { team: 'Inferno', days: ['Mon', 'Wed'] }
  ];

  const competitions = [
    { id: 'showcase-memphis-2025', name: 'Showcase – Memphis, TN', date: 'November 8, 2025' },
    { id: 'cheersport-memphis-2025', name: 'Cheersport – Memphis, TN', date: 'November 9, 2025' }
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
    <main className="min-h-screen p-6 bg-gray-50 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-2">Cheer Me Out</h1>
        <p className="text-lg text-gray-700">Weekly Calendar: All Star Tumbling, Team Practices & Specials</p>
      </header>

      <div className="flex justify-center gap-4 mb-4">
        <button onClick={() => setWeekOffset(weekOffset - 1)} className="px-4 py-2 bg-pink-100 rounded">← Previous Week</button>
        <button onClick={() => setWeekOffset(0)} className="px-4 py-2 bg-pink-100 rounded">This Week</button>
        <button onClick={() => setWeekOffset(weekOffset + 1)} className="px-4 py-2 bg-pink-100 rounded">Next Week →</button>
      </div>

      <div className="space-y-6 mb-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-pink-600 mb-3">All Star Tumbling</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.keys(levelIcons).map((lvl) => (
              <button
                key={lvl}
                onClick={() => toggleLevel(lvl)}
                className={`px-4 py-2 rounded text-sm sm:text-base ${visibleLevels.has(lvl) ? 'bg-pink-600 text-white' : 'bg-pink-100 text-pink-800'}`}
              >
                {levelIcons[lvl]} {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold text-yellow-700 mb-3">Memphis Pride Cheer</h3>
          <div className="flex flex-wrap justify-center items-center gap-3"> {/* Increased gap slightly for larger tiles */}
            {Object.keys(teamIcons).map((team) => {
              if (team === 'Blaze') {
                return (
                  <button
                    key={team}
                    title="Blaze"
                    onClick={() => toggleTeam(team)}
                    // Increased size to w-24 h-24 (96px), adjusted padding and styling
                    className={`w-24 h-24 p-1 rounded focus:outline-none flex items-center justify-center
                                ${visibleTeams.has(team) ? 'ring-2 ring-offset-2 ring-yellow-500 bg-yellow-50 shadow-md' : 'bg-white ring-1 ring-gray-300 hover:ring-yellow-400 shadow hover:shadow-lg'}`}
                  >
                    <img
                      src="/images/Blaze.png"
                      alt="Blaze Team Logo"
                      className="object-contain max-h-full max-w-full" // Image will be contained within the button's padding
                    />
                  </button>
                );
              } else if (team === 'Majors') {
                return (
                  <button
                    key={team}
                    title="Majors"
                    onClick={() => toggleTeam(team)}
                    // Increased size to w-24 h-24 (96px), adjusted padding and styling
                    className={`w-24 h-24 p-1 rounded focus:outline-none flex items-center justify-center
                                ${visibleTeams.has(team) ? 'ring-2 ring-offset-2 ring-yellow-500 bg-yellow-50 shadow-md' : 'bg-white ring-1 ring-gray-300 hover:ring-yellow-400 shadow hover:shadow-lg'}`}
                  >
                    <img
                      src="/images/Majors.png"
                      alt="Majors Team Logo"
                      className="object-contain max-h-full max-w-full" // Image will be contained within the button's padding
                    />
                  </button>
                );
              } else {
                // Default button for other teams
                return (
                  <button
                    key={team}
                    onClick={() => toggleTeam(team)}
                    className={`px-4 py-2 rounded text-sm sm:text-base ${visibleTeams.has(team) ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-800'}`}
                  >
                    {teamIcons[team]} {team}
                  </button>
                );
              }
            })}
            <button
              key="specials"
              onClick={() => setShowSpecials(!showSpecials)}
              className={`px-4 py-2 rounded text-sm sm:text-base ${showSpecials ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'}`}
            >
              {specialsIcon} Specials
            </button>
          </div>
        </div>
      </div>

      {/* ... rest of your table and competitions section ... */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-pink-100">
              {daysOfWeek.map((day, idx) => (
                <th key={day} className="p-2 text-pink-800 border border-gray-300">{day}<br /><span className="text-sm text-gray-500">{getDateForDay(idx)}</span></th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {daysOfWeek.map((day) => (
                <td key={day} className="align-top p-2 border border-gray-300 w-1/7">
                  <ul className="space-y-2">
                    {visibleLevels.size > 0 && tumblingSchedule.some((entry) => entry.day === day && visibleLevels.has(entry.level)) && (
                      <li className="bg-white shadow p-2 rounded">
                        <p className="text-pink-600 font-semibold mb-1">All Star Tumbling</p>
                        {tumblingSchedule.filter((entry) => entry.day === day && visibleLevels.has(entry.level)).map((entry, idx) => (
                          <div key={`tum-${idx}-${day}`} className="text-sm text-gray-700">{levelIcons[entry.level]} {entry.level}: {entry.time}</div>
                        ))}
                      </li>
                    )}
                    {visibleTeams.size > 0 && teamPractice.some((entry) => entry.days.includes(day) && visibleTeams.has(entry.team)) && (
                      <li className="bg-yellow-50 shadow p-2 rounded">
                        <p className="text-yellow-700 font-semibold mb-1">Team Practices</p>
                        {teamPractice.filter((entry) => entry.days.includes(day) && visibleTeams.has(entry.team)).map((entry, idx) => (
                          <div key={`team-${idx}-${day}`} className="text-sm text-gray-700">{teamIcons[entry.team]} {entry.team}: 6:00 PM – 8:00 PM</div>
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

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Competitions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {competitions.slice(0, 2).map((comp) => (
            <div key={comp.id} className="bg-white shadow rounded p-4">
              <h3 className="text-pink-600 font-bold text-lg mb-1">{comp.name}</h3>
              <p className="text-gray-700 mb-2">📅 {comp.date}</p>
              <Link to={`/competitions/${comp.id}`} className="inline-block bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">View Details</Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
