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

const competitions = [
  { id: 'showcase-memphis-2025', name: 'Showcase – Memphis, TN', date: 'November 8, 2025' },
  { id: 'cheersport-memphis-2025', name: 'Cheersport – Memphis, TN', date: 'November 9, 2025' }
];

export default function HomePage() {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });

  return (
    <main className="min-h-screen p-6 bg-gray-50 space-y-10">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-2">Cheer Me Out</h1>
        <p className="text-lg text-gray-700">Your full season hub: practice schedules, competitions, and more!</p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">This Week's Tumbling Schedule</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tumblingSchedule.map((item, index) => (
            <div key={index} className="bg-white shadow rounded p-4">
              <h3 className="text-pink-600 font-bold">{item.level}</h3>
              <p>{item.day} | {item.time}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Competitions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {competitions.map((comp) => (
            <div key={comp.id} className="bg-white shadow rounded p-4">
              <h3 className="text-pink-600 font-bold">{comp.name}</h3>
              <p className="text-gray-700 mb-2">📅 {comp.date}</p>
              <Link to={`/competitions/${comp.id}`} className="text-white bg-pink-500 px-4 py-2 rounded hover:bg-pink-600 inline-block">
                View Details
              </Link>
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
