// src/TumblingLevelsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { tumblingLevels } from './data/tumblingLevelsData'; // Import level data

export default function TumblingLevelsPage() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-pink-600 sm:text-5xl">
            All Star Tumbling Levels
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Explore our tumbling program from beginner to elite.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition-colors"
            >
              &larr; Back to Homepage
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tumblingLevels.map((level) => (
            // Future: Link to /tumbling-levels/${level.id} if detail pages are made
            <div 
              key={level.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{level.icon}</span>
                <h3 className="text-2xl font-semibold text-pink-700">
                  {level.name}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                {level.description}
              </p>
              {/* <Link to={`/tumbling-levels/${level.id}`} className="mt-4 inline-block text-pink-500 hover:text-pink-700 font-medium">
                Learn More &rarr;
              </Link> 
              */}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
