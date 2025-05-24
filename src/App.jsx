import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';

function CompetitionDetail() {
  return (
    <div className="min-h-screen bg-white p-10">
      <h1 className="text-3xl font-bold text-pink-600">Competition Details Coming Soon</h1>
      <p className="mt-4 text-gray-700">This will show detailed info based on the event selected.</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/competitions/:id" element={<CompetitionDetail />} />
      </Routes>
    </Router>
  );
}
