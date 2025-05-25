import React from 'react';
import { Link } from 'react-router-dom'; // Make sure Link is imported

// Updated team data with slugs for URL generation
const teamsData = [
  { name: 'Majors', slug: 'majors' },
  { name: 'Legacy', slug: 'legacy' },
  { name: 'Blaze', slug: 'blaze' },
  { name: 'Dynasty', slug: 'dynasty' },
  { name: 'Reign', slug: 'reign' },
  { name: 'Prodigy', slug: 'prodigy' },
  { name: 'Lady Legends', slug: 'lady-legends' },
  { name: 'Black Smack', slug: 'black-smack' },
  { name: 'Inferno', slug: 'inferno' }
];

export default function TeamsPage() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-600 sm:text-5xl">
            Memphis Pride Cheer Teams
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Get to know our amazing cheerleading teams!
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamsData.map((team) => (
            <Link
              key={team.slug} // Use slug for key
              to={`/teams/${team.slug}`} // Link to the specific team page
              className="block bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl transform hover:-translate-y-1 group"
            >
              <div className="w-full h-56 sm:h-64">
                <img
                  src={`/images/${team.name.replace(/ /g, '')}.png`}
                  alt={`${team.name} Team Logo`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {team.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
