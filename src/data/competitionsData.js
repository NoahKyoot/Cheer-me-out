// src/data/competitionsData.js

export const allCompetitions = [
  {
    id: 'cheersport-memphis-2025',
    eventName: 'CHEERSPORT - Memphis - Classic - DI/DII',
    brand: 'Cheersport',
    logo: 'CS-logo-250.png', // From your previous info
    dateString: 'November 9, 2025',
    sortableDate: '2025-11-09',
    fullDates: '11/9/2025 - 11/9/2025',
    venue: {
      name: 'Memphis Sports & Events Center',
      address: '995 Early Maxwell Blvd, Memphis, TN, 38104, US'
    },
    scheduleNotes: ['Doors Open - 7:00 AM (Please verify day if event is Sunday)'],
    description: 'A major regional classic competition by Cheersport.',
    notes: 'For Minis, Youth, Juniors, and Seniors.',
    results: {
      '2025': [], 
      '2024': [
        { teamName: 'Memphis Pride Cheer Legacy', level: 'L1 Youth', score: 87.9130 },
        { teamName: 'Memphis Pride Cheer Dynasty', level: 'L1 Junior', score: 91.3493 },
        { teamName: 'Memphis Pride Cheer Blaze', level: 'L2 Youth', score: 90.3000 },
        { teamName: 'Memphis Pride Cheer Reign', level: 'L2 Junior', score: 94.0667 },
        { teamName: 'Memphis Pride Cheer Prodigy', level: 'L3 Junior', score: 94.9000 },
        { teamName: 'Memphis Pride Cheer Lady Legends', level: 'L4.2 Senior', score: 90.9167 },
        { teamName: 'Memphis Pride Cheer Black Smack', level: 'L4 Senior', score: 92.5500 },
        { teamName: 'Memphis Pride Cheer Inferno', level: 'L5 Senior', score: 93.5000 }
      ]
    }
  },
  {
    id: 'deep-south-pigeon-forge-2025',
    eventName: 'Deep South Nationals',
    brand: 'Deep South',
    logo: null, // No logo provided for this one yet
    dateString: 'December 13-14, 2025',
    sortableDate: '2025-12-13',
    fullDates: '12/13/2025 - 12/14/2025',
    venue: { name: 'LeConte Center (Example)', address: 'Pigeon Forge, TN' },
    scheduleNotes: [],
    description: 'A festive competition in the Smokies.',
    notes: 'For Minis, Youth, Juniors, and Seniors.',
    results: {'2025': [], '2024': [] }
  },
  {
    id: 'battle-under-big-top-atlanta-2025',
    eventName: 'Battle Under the Big Top',
    brand: 'ASC', // Assuming ASC from logo ASC-1.png, please verify/update
    logo: 'ASC-1.png', // UPDATED
    dateString: 'December 13-14, 2025',
    sortableDate: '2025-12-13',
    fullDates: '12/13/2025 - 12/14/2025',
    venue: {
      name: 'Venue Name (Example)',
      address: 'Atlanta, GA'
    },
    scheduleNotes: [],
    description: 'A spectacular themed event.',
    notes: 'For Minis, Youth, Juniors, and Seniors.',
    results: {'2025': [], '2024': [] }
  },
  {
    id: 'athletic-championships-chattanooga-2026',
    eventName: 'Athletic Championships',
    brand: 'Athletic Championships',
    logo: 'ATH-1.png', // UPDATED
    dateString: 'January 24-25, 2026',
    sortableDate: '2026-01-24',
    fullDates: '1/24/2026 - 1/25/2026',
    venue: {
      name: 'Venue Name (Example)',
      address: 'Chattanooga, TN'
    },
    scheduleNotes: [],
    description: 'Showcase your athletic prowess!',
    notes: 'For Minis, Youth, Juniors, and Seniors.',
    results: {'2026': [], '2025': [] }
  },
  {
    id: 'cheer-expo-pigeon-forge-2026',
    eventName: 'Cheer Expo',
    brand: 'Cheer Expo',
    logo: null,
    dateString: 'January 31 - February 1, 2026',
    sortableDate: '2026-01-31',
    fullDates: '1/31/2026 - 2/1/2026',
    venue: {
      name: 'Venue Name (Example)',
      address: 'Pigeon Forge, TN'
    },
    scheduleNotes: [],
    description: 'Experience the best in cheerleading.',
    notes: 'For Minis, Youth, Juniors, and Seniors.',
    results: {'2026': [], '2025': [] }
  },
  {
    id: 'nca-classic-memphis-2026',
    eventName: 'NCA Classic',
    brand: 'NCA',
    logo: null,
    dateString: 'February 7, 2026',
    sortableDate: '2026-02-07',
    fullDates: '2/7/2026',
    venue: {
      name: 'Venue Name (Example)',
      address: 'Memphis, TN'
    },
    scheduleNotes: [],
    description: 'A classic NCA event.',
    notes: 'For Minis, Youth, Juniors, and Seniors.',
    results: {'2026': [], '2025': [] }
  },
  {
    id: 'deep-south-biloxi-2026',
    eventName: 'Deep South Glow Tour', // Updated eventName to reflect logo if appropriate
    brand: 'Deep South', // Or "Glow Tour" if that's more accurate
    logo: 'Glow_Tour_Biloxi.png', // UPDATED
    dateString: 'February 14-15, 2026',
    sortableDate: '2026-02-14',
    fullDates: '2/14/2026 - 2/15/2026',
    venue: {
      name: 'Venue Name (Example)',
      address: 'Biloxi, MS'
    },
    scheduleNotes: [],
    description: 'Cheer competition on the coast.',
    notes: 'For Minis, Youth, Juniors, and Seniors.',
    results: {'2026': [], '2025': [] }
  },
  {
    id: 'uca-nationals-orlando-2026',
    eventName: 'UCA National High School Cheerleading Championship',
    brand: 'UCA',
    logo: null,
    dateString: 'March 14-15, 2026',
    sortableDate: '2026-03-14',
    fullDates: '3/14/2026 - 3/15/2026',
    venue: {
      name: 'ESPN Wide World of Sports Complex (Typically)',
      address: 'Orlando, FL'
    },
    scheduleNotes: [],
    description: 'The prestigious UCA National Championship.',
    notes: 'For Youth, Juniors, and Seniors.',
    results: {'2026': [], '2025': [] }
  },
  {
    id: 'one-up-nashville-2026',
    eventName: 'One Up Championships',
    brand: 'One Up',
    logo: null,
    dateString: 'March 28-30, 2026',
    sortableDate: '2026-03-28',
    fullDates: '3/28/2026 - 3/30/2026',
    venue: {
      name: 'Venue Name (Example)',
      address: 'Nashville, TN'
    },
    scheduleNotes: [],
    description: 'A highly competitive championship event.',
    notes: 'For Juniors and Seniors only.',
    results: {'2026': [], '2025': [] }
  }
];
