// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import TeamsPage from './TeamsPage';
import TeamDetailPage from './TeamDetailPage';
import CompetitionsPage from './CompetitionsPage';
import CompetitionDetail from './CompetitionDetail';
import TumblingLevelsPage from './TumblingLevelsPage';
import MonthCalendarPage from './MonthCalendarPage'; // <-- Import the new page

// NotFound component (assuming it's defined here or imported)
function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-10 text-center">
      <h1 className="text-3xl font-bold text-red-500 mb-4">404 - Page Not Found</h1>
      <p className="text-slate-400 mb-6">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-400 underline hover:text-blue-300">← Back to Home</Link>
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
        <Route path="/competitions/:competitionSlug" element={<CompetitionDetail />} />
        <Route path="/tumbling-levels" element={<TumblingLevelsPage />} />
        <Route path="/month-calendar" element={<MonthCalendarPage />} /> {/* <-- New route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
