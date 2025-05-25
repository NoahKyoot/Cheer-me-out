// src/data/teamDetailsData.js

// Ensure 'slug' is URL-friendly and unique.
// 'imageFilename' must match actual files in your public/images/ folder (e.g., LadyLegends.png, BlackSmack.png).
export const allTeamDetails = [
  {
    slug: 'majors',
    name: 'Majors',
    imageFilename: 'Majors.png', // e.g., Majors.png
    description: 'Our elite Majors team, known for their precision and high-flying stunts. They compete at national levels.',
    schedule: 'Tuesdays & Thursdays, 7:00 PM - 9:00 PM',
    coach: 'Sarah "Coach S" Williams',
    achievements: 'National Champions 2023, Regional Winners 2022 & 2023'
  },
  {
    slug: 'legacy',
    name: 'Legacy',
    imageFilename: 'Legacy.png',
    description: 'Building on a strong tradition, Legacy showcases intricate choreography and teamwork.',
    schedule: 'Mondays & Wednesdays, 7:00 PM - 9:00 PM',
    coach: 'Michael "Mike" Chen',
    achievements: 'Spirit Award Winners 2023'
  },
  {
    slug: 'blaze',
    name: 'Blaze',
    imageFilename: 'Blaze.png',
    description: 'Blaze brings fiery energy and dynamic routines to every performance!',
    schedule: 'Mondays & Wednesdays, 6:00 PM - 8:00 PM',
    coach: 'Linda Rodriguez',
    achievements: 'Most Innovative Choreography 2024'
  },
  {
    slug: 'dynasty',
    name: 'Dynasty',
    imageFilename: 'Dynasty.png',
    description: 'A powerhouse team aiming to build a winning Dynasty with strength and grace.',
    schedule: 'Tuesdays & Thursdays, 6:00 PM - 8:00 PM',
    coach: 'David Miller',
    achievements: 'State Finalists 2023'
  },
  {
    slug: 'reign',
    name: 'Reign',
    imageFilename: 'Reign.png', // Make sure you have Reign.png in public/images/
    description: 'Watch Reign command the floor with their royal presence and powerful tumbling.',
    schedule: 'Mondays & Wednesdays, 5:00 PM - 7:00 PM',
    coach: 'Jessica "Coach J" Lee',
    achievements: 'Grand Champions - Local Showcase 2024'
  },
  {
    slug: 'prodigy',
    name: 'Prodigy',
    imageFilename: 'Prodigy.png',
    description: 'Nurturing young talents, Prodigy is where future champions begin their journey.',
    schedule: 'Tuesdays & Thursdays, 5:00 PM - 7:00 PM',
    coach: 'Kevin Armstrong',
    achievements: 'Rising Stars Award 2023'
  },
  {
    slug: 'lady-legends',
    name: 'Lady Legends',
    imageFilename: 'LadyLegends.png', // Assumes image is LadyLegends.png (no space)
    description: 'Elegance, power, and legendary spirit define the Lady Legends.',
    schedule: 'Mondays & Wednesdays, 8:00 PM - 10:00 PM',
    coach: 'Maria Gonzalez',
    achievements: 'Crowd Favorite Award 2024'
  },
  {
    slug: 'black-smack',
    name: 'Black Smack',
    imageFilename: 'BlackSmack.png', // Assumes image is BlackSmack.png (no space)
    description: 'Known for their fierce routines and striking performance style.',
    schedule: 'Tuesdays & Thursdays, 8:00 PM - 10:00 PM',
    coach: 'Chris "Smitty" Smith',
    achievements: 'Best Stunts Award 2023'
  },
  {
    slug: 'inferno',
    name: 'Inferno',
    imageFilename: 'Inferno.png',
    description: 'Inferno sets the competition ablaze with their high-energy performances and creativity.',
    schedule: 'Mondays & Wednesdays, 4:00 PM - 6:00 PM',
    coach: 'Emily White',
    achievements: 'Judges Choice Award 2024'
  }
  // Add any other teams with their full details here
];
