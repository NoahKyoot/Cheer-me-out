import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import TeamsPage from './TeamsPage';
import TeamDetailPage from './TeamDetailPage';
import CompetitionsPage from './CompetitionsPage';
import CompetitionDetail from './CompetitionDetail'; // Assuming CompetitionDetail is in its own file now
import TumblingLevelsPage from './TumblingLevelsPage';

// Your existing NotFound component (or you might move it to its own file too)
function NotFound() {
  return (
    <div className="min-h-screen bg-white p-10 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-700 mb-6">The page you are looking for does not exist.</p>
      <Link to="/" className="text-pink-500 underline hover:text-pink-700">← Back to Home</Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/teams/:teamSlug" element={<TeamDetailPage />} />
        <Route path="/competitions" element={<CompetitionsPage />} />
        {/* UPDATED ROUTE for specific competition detail */}
        <Route path="/competitions/:competitionSlug" element={<CompetitionDetail />} />
        <Route path="/tumbling-levels" element={<TumblingLevelsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
