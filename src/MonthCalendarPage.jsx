// src/MonthCalendarPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function MonthCalendarPage() {
  return (
    <main className="min-h-screen p-6 bg-slate-900 text-slate-200">
      <div className="max-w-7xl mx-auto space-y-8 text-center">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-blue-400 sm:text-5xl">
            Month Calendar View
          </h1>
          <p className="mt-4 text-xl text-slate-400">
            This page will display the full month calendar. (Functionality to be built)
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="text-red-500 hover:text-red-400 hover:underline font-medium transition-colors duration-150 ease-in-out"
            >
              &larr; Back to Homepage
            </Link>
          </div>
        </header>
        
        {/* Placeholder content for the month calendar */}
        <div className="bg-slate-800 p-8 rounded-lg shadow-md">
          <p className="text-lg">Full month calendar display coming soon!</p>
          {/* You would add your month grid and event rendering logic here */}
        </div>
      </div>
    </main>
  );
}
