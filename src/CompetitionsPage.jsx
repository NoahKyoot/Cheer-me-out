import React from 'react';
import { Link } from 'react-router-dom';
import { allCompetitions } from './data/competitionsData'; // Uses the updated rich data

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

        {allCompetitions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allCompetitions.map((comp) => (
              <div key={comp.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow flex flex-col">
                {/* Logo Display Section */}
                {comp.logo && (
                  <div className="h-20 mb-4 flex justify-center items-center">
                    <img 
                      src={`/images/competition-logos/${comp.logo}`} 
                      alt={`${comp.brand || comp.eventName} Logo`} 
                      className="max-h-full object-contain"
                    />
                  </div>
                )}
                <div className="flex-grow">
                  <h3 className="text-pink-600 font-bold text-xl mb-1">{comp.eventName || comp.name}</h3>
                  {comp.brand && <p className="text-gray-500 text-xs mb-2">{comp.brand}</p>}
                  {comp.venue?.name && comp.venue?.address && (
                     <p className="text-gray-700 text-sm mb-1">
                       📍 {comp.venue.name}, {comp.venue.address.split(',').slice(1, 3).join(', ').trim()}
                     </p>
                  )}
                  <p className="text-gray-600 text-sm mb-3">📅 {comp.dateString}</p>
                  {comp.description && <p className="text-gray-700 text-xs mt-2 mb-3 line-clamp-3">{comp.description}</p>}
                </div>
                <Link
                  to={`/competitions/${comp.id}`} // comp.id is the slug
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
