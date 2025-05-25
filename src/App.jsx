// src/App.jsx (or your main router file)
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import TeamsPage from './TeamsPage';
import TeamDetailPage from './TeamDetailPage';
import CompetitionsPage from './CompetitionsPage'; // <-- Import the new CompetitionsPage component

// Your existing CompetitionDetail component (placeholder for individual competition details)
function CompetitionDetail() {
  // You'll want to use useParams here to get the :id
  // const { id } = useParams();
  return (
    <div className="min-h-screen bg-white p-10 text-center">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">Competition Details Page</h1>
      <p className="text-gray-700 mb-6">Details for competition ID will show here.</p>
      <Link to="/competitions" className="text-pink-500 underline hover:text-pink-700 mr-4">← Back to All Competitions</Link>
      <Link to="/" className="text-pink-500 underline hover:text-pink-700">← Back to Home</Link>
    </div>
  );
}

// Your existing NotFound component
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
        <Route path="/competitions" element={<CompetitionsPage />} /> {/* <-- New route for all competitions page */}
        <Route path="/competitions/:id" element={<CompetitionDetail />} /> {/* Existing route for specific competition detail */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
