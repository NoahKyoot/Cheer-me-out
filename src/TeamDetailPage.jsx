// src/TeamDetailPage.jsx
import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom'; // Using alias for Link to avoid confusion if ever needed

// Ideally, this detailed data would come from a shared file/API and include more info.
// Ensure 'slug' matches what's in TeamsPage.jsx and 'imageFilename' matches your files in public/images/
const allTeamsDetails = [
  { slug: 'majors', name: 'Majors', imageFilename: 'Majors1.png', description: 'Our elite Majors team, known for their precision and high-flying stunts. They compete at national levels.', schedule: 'Tuesdays & Thursdays, 7:00 PM - 9:00 PM', coach: 'Sarah "Coach S" Williams' },
  { slug: 'legacy', name: 'Legacy', imageFilename: 'Legacy.png', description: 'Building on a strong tradition, Legacy showcases intricate choreography and teamwork.', schedule: 'Mondays & Wednesdays, 7:00 PM - 9:00 PM', coach: 'Michael "Mike" Chen' },
  { slug: 'blaze', name: 'Blaze', imageFilename: 'Blaze.png', description: 'Blaze brings fiery energy and dynamic routines to every performance!', schedule: 'Mondays & Wednesdays, 6:00 PM - 8:00 PM', coach: 'Linda Rodriguez' },
  { slug: 'dynasty', name: 'Dynasty', imageFilename: 'Dynasty.png', description: 'A powerhouse team aiming to build a winning Dynasty with strength and grace.', schedule: 'Tuesdays & Thursdays, 6:00 PM - 8:00 PM', coach: 'David Miller' },
  { slug: 'reign', name: 'Reign', imageFilename: 'Reign.png', description: 'Watch Reign command the floor with their royal presence and powerful tumbling.', schedule: 'Mondays & Wednesdays, 5:00 PM - 7:00 PM', coach: 'Jessica "Coach J" Lee' },
  { slug: 'prodigy', name: 'Prodigy', imageFilename: 'Prodigy.png', description: 'Nurturing young talents, Prodigy is where future champions begin their journey.', schedule: 'Tuesdays & Thursdays, 5:00 PM - 7:00 PM', coach: 'Kevin Armstrong' },
  { slug: 'lady-legends', name: 'Lady Legends', imageFilename: 'LadyLegends.png', description: 'Elegance, power, and legendary spirit define the Lady Legends.', schedule: 'Mondays & Wednesdays, 8:00 PM - 10:00 PM', coach: 'Maria Gonzalez' },
  { slug: 'black-smack', name: 'Black Smack', imageFilename: 'BlackSmack.png', description: 'Known for their fierce routines and striking performance style.', schedule: 'Tuesdays & Thursdays, 8:00 PM - 10:00 PM', coach: 'Chris "Smitty" Smith' },
  { slug: 'inferno', name: 'Inferno', imageFilename: 'Inferno.png', description: 'Inferno sets the competition ablaze with their high-energy performances and creativity.', schedule: 'Mondays & Wednesdays, 4:00 PM - 6:00 PM', coach: 'Emily White' }
];


export default function TeamDetailPage() {
  const { teamSlug } = useParams(); // Gets 'teamSlug' from the URL (e.g., /teams/majors)
  const team = allTeamsDetails.find(t => t.slug === teamSlug);

  if (!team) {
    return (
      <main className="min-h-screen p-6 bg-gray-50 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Team Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, we couldn't find the team you were looking for.
        </p>
        <RouterLink
          to="/teams"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-150 ease-in-out"
        >
          &larr; Back to All Teams
        </RouterLink>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <RouterLink to="/teams" className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition-colors">
            &larr; Back to All Teams
          </RouterLink>
        </div>

        <article className="bg-white shadow-2xl rounded-xl overflow-hidden">
          <div className="w-full h-72 md:h-96 lg:h-[500px] bg-gray-200">
            <img
              src={`/images/${team.imageFilename}`}
              alt={`${team.name} showcasing their skills`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-10 lg:p-12">
            <header className="mb-8 text-center border-b-2 border-indigo-200 pb-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                {team.name}
              </h1>
            </header>
            <section className="space-y-6 text-gray-700 text-lg">
              <p className="leading-relaxed">{team.description}</p>
              
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h2 className="text-2xl font-bold text-indigo-700 mb-2">Practice Schedule</h2>
                <p>{team.schedule}</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h2 className="text-2xl font-bold text-purple-700 mb-2">Coached By</h2>
                <p>{team.coach}</p>
              </div>
              
              {/* You can add more sections here: */}
              {/* - Team Roster */}
              {/* - Recent Achievements */}
              {/* - Photo/Video Gallery */}
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
