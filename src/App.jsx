import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';

function CompetitionDetail() {
  return (
    <div className="min-h-screen bg-white p-10 text-center">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">Competition Details Page</h1>
      <p className="text-gray-700 mb-6">Here you will see detailed info based on the selected competition.</p>
      <Link to="/" className="text-pink-500 underline hover:text-pink-700">← Back to Home</Link>
    </div>
  );
}

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
        <Route path="/competitions/:id" element={<CompetitionDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
