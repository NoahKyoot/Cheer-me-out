import React from 'react';
import { Link } from 'react-router-dom'; // Link might be used for future "Learn More" per level
import { tumblingLevels } from './data/tumblingLevelsData';

export default function TumblingLevelsPage() {
  return (
    <main className="min-h-screen p-6 bg-gray-100"> {/* Changed background for contrast */}
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-pink-600 sm:text-5xl">
            All Star Tumbling Levels
          </h1>
          <p className="mt-4 text-xl text-gray-700">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8"> {/* Changed to 1 column on lg for more space per card, or keep more columns if preferred */}
          {tumblingLevels.map((level) => (
            <div 
              key={level.id}
              className="bg-white rounded-xl shadow-xl overflow-hidden transition-shadow duration-300 hover:shadow-2xl flex flex-col"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-5xl mr-4">{level.icon}</span>
                  <div>
                    <h3 className="text-3xl font-bold text-pink-700">
                      {level.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">{level.description}</p>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 space-y-4 border-t border-gray-200 pt-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Skills Include:</h4>
                  {Array.isArray(level.skills) && level.skills.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm pl-2">
                      {level.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">Details coming soon.</p>
                  )}
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Advancement Criteria:</h4>
                  {level.advancement ? (
                    <p className="text-gray-700 text-sm leading-relaxed">{level.advancement}</p>
                  ) : (
                    <p className="text-gray-500 text-sm">Details coming soon.</p>
                  )}
                </div>
              </div>
              {/* Future: You might add a link here to a specific class schedule or registration for this level
                <div className="p-6 border-t border-gray-200 mt-auto text-right">
                  <Link to={`/tumbling-registration?level=${level.id}`} className="text-pink-600 hover:text-pink-800 font-semibold">
                    Class Schedule &rarr;
                  </Link>
                </div> 
              */}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
