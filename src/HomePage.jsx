import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addDays, format, startOfWeek } from 'date-fns';

const tumblingSchedule = [
  { level: 'Level 1', day: 'Mon', time: '6:00 PM – 7:00 PM' },
  { level: 'Level 2', day: 'Tue', time: '6:00 PM – 7:00 PM' },
  { level: 'Level 3', day: 'Wed', time: '6:00 PM – 7:00 PM' },
  { level: 'Level 4', day: 'Thu', time: '6:00 PM – 7:00 PM' },
  { level: 'Level 5/6', day: 'Fri', time: '6:00 PM – 7:00 PM' }
];

const teams = [
  'Majors', 'Legacy', 'Blaze', 'Dynasty', 'Reign', 'Prodigy', 'Lady Legends', 'Black Smack', 'Inferno'
];

export default function HomePage() {
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedTeam, setSelectedTeam] = useState('All');
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });

  const filteredTumbling = tumblingSchedule.filter(item => selectedLevel === 'All' || item.level === selectedLevel);

  return (
    <main className="min-h-screen p-6 bg-gray-50 space-y-10">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-2">Cheer Me Out</h1>
        <p className="text-lg text-gray-700">Your full season hub: practice schedules, competitions, and more!</p>
      </header>

      <section className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Filter by Level</h2>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button onClick={() => setSelectedLevel('All')} className={`px-4 py-2 rounded ${selectedLevel === 'All' ? 'bg-pink-600 text-white' : 'bg-pink-100 text-pink-800'}`}>All Levels</button>
          {['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5/6'].map(lvl => (
            <button key={lvl} onClick={() => setSelectedLevel(lvl)} className={`px-4 py-2 rounded ${selectedLevel === lvl ? 'bg-pink-600 text-white' : 'bg-pink-100 text-pink-800'}`}>{lvl}</button>
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Filter by Team</h2>
        <div className="flex flex-wrap justify-center gap-2">
          <button onClick={() => setSelectedTeam('All')} className={`px-4 py-2 rounded ${selectedTeam === 'All' ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-800'}`}>All Teams</button>
          {teams.map(team => (
            <button key={team} onClick={() => setSelectedTeam(team)} className={`px-4 py-2 rounded ${selectedTeam === team ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-800'}`}>{team}</button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">This Week's Tumbling Schedule</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredTumbling.map((item, index) => (
            <div key={index} className="bg-white shadow rounded p-4">
              <h3 className="text-pink-600 font-bold">{item.level}</h3>
              <p>{item.day} | {item.time}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center mt-10">
        <Link to="/calendar" className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700">View Full Calendar</Link>
      </section>
    </main>
  );
}
