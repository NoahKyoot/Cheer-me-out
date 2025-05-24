import React, { useState } from 'react';
import { addDays, format, startOfWeek } from 'date-fns';

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
  { team: 'Majors', days: ['Mon', 'Wed'] },
  { team: 'Legacy', days: ['Tue', 'Thu'] },
  { team: 'Blaze', days: ['Mon', 'Wed'] },
  { team: 'Dynasty', days: ['Mon', 'Wed'] },
  { team: 'Reign', days: ['Tue', 'Thu'] },
  { team: 'Prodigy', days: ['Mon', 'Wed'] },
  { team: 'Lady Legends', days: ['Tue', 'Thu'] },
  { team: 'Black Smack', days: ['Tue', 'Thu'] },
  { team: 'Inferno', days: ['Mon', 'Wed'] }
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const levelIcons = {
  'Level 1': '🔰',
  'Level 2': '🏅',
  'Level 3': '🥉',
  'Level 4': '🥈',
  'Level 5/6': '🥇'
};
const teamIcons = {
  'Majors': '⭐',
  'Legacy': '📜',
  'Blaze': '🔥',
  'Dynasty': '👑',
  'Reign': '💫',
  'Prodigy': '🚀',
  'Lady Legends': '🌟',
  'Black Smack': '🖤',
  'Inferno': '🔥'
};

export default function HomePage() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [visibleLevels, setVisibleLevels] = useState(new Set());
  const [visibleTeams, setVisibleTeams] = useState(new Set());

  const weekStart = startOfWeek(addDays(new Date(), weekOffset * 7), { weekStartsOn: 0 });

  const toggleLevel = (level) => {
    const updated = new Set(visibleLevels);
    updated.has(level) ? updated.delete(level) : updated.add(level);
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
        <p className="text-lg text-gray-700">Weekly Tumbling & Practice Calendar</p>
      </header>

      <div className="flex justify-center gap-4 mb-4">
        <button onClick={() => setWeekOffset(weekOffset - 1)} className="px-4 py-2 bg-pink-100 rounded">← Previous Week</button>
        <button onClick={() => setWeekOffset(0)} className="px-4 py-2 bg-pink-100 rounded">This Week</button>
        <button onClick={() => setWeekOffset(weekOffset + 1)} className="px-4 py-2 bg-pink-100 rounded">Next Week →</button>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {Object.keys(levelIcons).map((lvl) => (
          <button
            key={lvl}
            onClick={() => toggleLevel(lvl)}
            className={`px-4 py-2 rounded ${visibleLevels.has(lvl) ? 'bg-pink-600 text-white' : 'bg-pink-100 text-pink-800'}`}
          >
            {levelIcons[lvl]} {lvl}
          </button>
        ))}
        {Object.keys(teamIcons).map((team) => (
          <button
            key={team}
            onClick={() => toggleTeam(team)}
            className={`px-4 py-2 rounded ${visibleTeams.has(team) ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-800'}`}
          >
            {teamIcons[team]} {team}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-pink-100">
              {daysOfWeek.map((day, idx) => (
                <th key={day} className="p-2 text-pink-800 border border-gray-300">
                  {day} <br /> <span className="text-sm text-gray-500">{getDateForDay(idx)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {daysOfWeek.map((day) => (
                <td key={day} className="align-top p-2 border border-gray-300 w-1/7">
                  <ul className="space-y-2">
                    {visibleLevels.size > 0 && tumblingSchedule
                      .filter((entry) => entry.day === day && visibleLevels.has(entry.level))
                      .map((entry, idx) => (
                        <li key={`tum-${idx}-${day}`} className="bg-white shadow p-2 rounded">
                          <p className="text-pink-600 font-semibold">{levelIcons[entry.level]} {entry.level}</p>
                          <p className="text-gray-700 text-sm">{entry.time}</p>
                        </li>
                      ))}
                    {visibleTeams.size > 0 && teamPractice
                      .filter((entry) => entry.days.includes(day) && visibleTeams.has(entry.team))
                      .map((entry, idx) => (
                        <li key={`team-${idx}-${day}`} className="bg-yellow-50 shadow p-2 rounded">
                          <p className="text-yellow-700 font-semibold">{teamIcons[entry.team]} {entry.team} Practice</p>
                          <p className="text-gray-700 text-sm">6:00 PM – 8:00 PM</p>
                        </li>
                      ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
