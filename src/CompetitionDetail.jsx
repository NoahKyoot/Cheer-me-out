import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { allCompetitions } from './data/competitionsData'; // Import the updated data

export default function CompetitionDetail() {
  const { competitionSlug } = useParams(); // Changed from 'id' to 'competitionSlug'
  const competition = allCompetitions.find(c => c.id === competitionSlug); // Find by 'id' which is our slug

  if (!competition) {
    return (
      <main className="min-h-screen p-6 bg-gray-50 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Competition Not Found</h2>
        <RouterLink to="/competitions" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
          &larr; Back to All Competitions
        </RouterLink>
      </main>
    );
  }

  const currentYear = competition.sortableDate.substring(0, 4);
  const previousYear = (parseInt(currentYear, 10) - 1).toString();

  const currentResults = competition.results[currentYear] || [];
  const previousResults = competition.results[previousYear] || [];

  const getScoreChange = (teamName, currentScore) => {
    const prevTeamResult = previousResults.find(r => r.teamName === teamName);
    if (prevTeamResult && typeof prevTeamResult.score === 'number' && typeof currentScore === 'number') {
      const change = currentScore - prevTeamResult.score;
      if (change > 0.00005) return { text: `+${change.toFixed(4)}`, color: 'text-green-600', icon: '🔼' }; // Added small tolerance for positive
      if (change < -0.00005) return { text: `${change.toFixed(4)}`, color: 'text-red-600', icon: '🔽' }; // Added small tolerance for negative
      return { text: 'Same', color: 'text-gray-600', icon: '–' };
    }
    return null;
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-left">
          <RouterLink to="/competitions" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition-colors group">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform duration-150 ease-in-out group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to All Competitions
          </RouterLink>
        </div>

        <article className="bg-white shadow-xl rounded-lg overflow-hidden">
          {competition.logo && (
            <div className="bg-gray-50 p-6 flex justify-center items-center border-b border-gray-200">
              <img src={`/images/competition-logos/${competition.logo}`} alt={`${competition.brand} Logo`} className="max-h-24 object-contain" />
            </div>
          )}
          <div className="p-6 md:p-10">
            <header className="mb-6 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-indigo-700">{competition.eventName}</h1>
              <p className="text-lg text-gray-500">{competition.brand}</p>
            </header>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Dates</h2>
                <p className="text-gray-600">{competition.fullDates}</p>
                {competition.scheduleNotes && competition.scheduleNotes.length > 0 && (
                  <ul className="mt-1 text-sm text-gray-500 list-disc list-inside">
                    {competition.scheduleNotes.map((note, index) => <li key={index}>{note}</li>)}
                  </ul>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Venue</h2>
                <p className="text-gray-600">{competition.venue.name}</p>
                <p className="text-gray-600 text-sm">{competition.venue.address}</p>
              </div>
            </div>

            {competition.description && (
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">About this Event</h2>
                <p className="text-gray-600 leading-relaxed">{competition.description}</p>
                {competition.notes && <p className="text-sm text-gray-500 italic mt-2">{competition.notes}</p>}
              </section>
            )}

            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Results ({currentYear})</h2>
              {currentResults.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score ({currentYear})</th>
                        {previousResults.length > 0 && <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">vs. {previousYear}</th>}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentResults.map((result, index) => {
                        const scoreChange = getScoreChange(result.teamName, result.score);
                        return (
                          <tr key={index}>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-800">{result.teamName}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-600">{result.level}</td>
                            <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-800">{result.score !== null && typeof result.score === 'number' ? result.score.toFixed(4) : 'N/A'}</td>
                            {previousResults.length > 0 && (
                              <td className={`px-4 py-3 whitespace-nowrap ${scoreChange ? scoreChange.color : 'text-gray-500'}`}>
                                {scoreChange ? `${scoreChange.icon} ${scoreChange.text}` : (result.score !== null ? 'New' : 'N/A')}
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">Results for {currentYear} are not yet available or this event is upcoming.</p>
              )}
            </section>

            {previousResults.length > 0 && (currentResults.length === 0 || !currentResults.some(cr => previousResults.find(pr => pr.teamName === cr.teamName))) && (
                 <section className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Results from {previousYear}</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {previousResults.map((result, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-3 whitespace-nowrap text-gray-800">{result.teamName}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-gray-600">{result.level}</td>
                                        <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-800">{typeof result.score === 'number' ? result.score.toFixed(4) : 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}
