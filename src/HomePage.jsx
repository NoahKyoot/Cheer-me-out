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

const specialEvents = [
  { name: 'Choreography (Mini, Youth, Juniors, Seniors)', date: 'July 21 - July 25, 2025' },
  { name: 'Team Bonding (extra fee)', date: 'July 26, 2025' },
  { name: 'Christmas/Holiday Party (per team)', date: 'December 2025' }
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const levelIcons = {
  'Level 1': '🔰',
  'Level 2': '🏅',
  'Level 3': '🥉',
  'Level 4': '🥈',
  'Level 5/6': '🥇'
};

export default function HomePage() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [visibleLevels, setVisibleLevels] = useState(new Set());
  const [showSpecials, setShowSpecials] = useState(false);

  const weekStart = startOfWeek(addDays(new Date(), weekOffset * 7), { weekStartsOn: 0 });

  const toggleLevel = (level) => {
    const updated = new Set(visibleLevels);
    updated.has(level) ? updated.delete(level) : updated.add(level);
    setVisibleLevels(updated);
  };

  const getDateForDay = (index) => format(addDays(weekStart, index), 'MMM d');

  return (
    <main className="min-h-screen p-6 bg-gray-50 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-2">Cheer Me Out</h1>
        <p className="text-lg text-gray-700">Weekly Tumbling & Specials Calendar</p>
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
        <button
          onClick={() => setShowSpecials(!showSpecials)}
          className={`px-4 py-2 rounded ${showSpecials ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800'}`}
        >
          🎉 Specials
        </button>
      </div>

      {showSpecials && (
        <section className="bg-green-50 p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Special Events</h2>
          <ul className="list-disc pl-5 space-y-1">
            {specialEvents.map((event, idx) => (
              <li key={idx}>
                <span className="font-bold">{event.name}:</span> {event.date}
              </li>
            ))}
          </ul>
        </section>
      )}

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
                        <li key={`tum-${idx}`} className="bg-white shadow p-2 rounded">
                          <p className="text-pink-600 font-semibold">{levelIcons[entry.level]} {entry.level}</p>
                          <p className="text-gray-700 text-sm">{entry.time}</p>
                        </li>
                      ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Upcoming Competitions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {competitions.map((comp) => (
            <div key={comp.id} className="bg-white shadow rounded p-4">
              <h3 className="text-pink-600 font-bold">{comp.name}</h3>
              <p className="text-gray-700 mb-2">📅 {comp.date}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
