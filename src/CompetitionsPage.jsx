import React from 'react';
import { Link } from 'react-router-dom';

// Ideally, this data would come from a shared source (e.g., a data file or API)
// For now, we'll define a more comprehensive list here.
const allCompetitionsData = [
  { id: 'showcase-memphis-2025', name: 'Showcase – Memphis, TN', date: 'November 8, 2025', description: 'Join us for our annual team showcase!' },
  { id: 'cheersport-memphis-2025', name: 'Cheersport – Memphis, TN', date: 'November 9, 2025', description: 'A major regional competition.' },
  { id: 'winter-classic-nashville-2026', name: 'Winter Classic – Nashville, TN', date: 'January 25-26, 2026', description: 'Kick off the new year with fierce competition.' },
  { id: 'battle-at-the-beach-myrtle-2026', name: 'Battle at the Beach – Myrtle Beach, SC', date: 'March 14-15, 2026', description: 'Sun, sand, and spirit!' },
  { id: 'nationals-orlando-2026', name: 'Nationals – Orlando, FL', date: 'April 10-12, 2026', description: 'The ultimate showdown for national titles.' },
  { id: 'the-summit-tampa-2026', name: 'The Summit – Tampa, FL', date: 'May 1-3, 2026', description: 'A prestigious end-of-season event.' },
  // Add more competitions as needed
];

export default function CompetitionsPage() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-teal-600 sm:text-5xl">
            All Competitions
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Our full schedule of exciting cheerleading competitions.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="text-pink-600 hover:text-pink-800 hover:underline font-medium transition-colors duration-150 ease-in-out"
            >
              &larr; Back to Homepage
            </Link>
          </div>
        </header>

        {allCompetitionsData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allCompetitionsData.map((comp) => (
              <div key={comp.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow flex flex-col justify-between">
                <div>
                  <h3 className="text-pink-600 font-bold text-xl mb-2">{comp.name}</h3>
                  <p className="text-gray-600 text-sm mb-1">📅 {comp.date}</p>
                  {comp.description && <p className="text-gray-700 text-sm mt-2 mb-3">{comp.description}</p>}
                </div>
                <Link
                  to={`/competitions/${comp.id}`} // Links to specific competition detail page
                  className="mt-4 inline-block bg-pink-500 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-pink-600 transition-colors self-start"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">No competitions scheduled at this time. Please check back soon!</p>
        )}
      </div>
    </main>
  );
}
