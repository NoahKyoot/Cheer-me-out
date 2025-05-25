// src/data/competitionsData.js

export const allCompetitions = [
  {
    id: 'cheersport-memphis-2025',
    eventName: 'CHEERSPORT - Memphis - Classic - DI/DII',
    brand: 'Cheersport',
    logo: 'CS-logo-250.png', // Assuming it's in public/images/competition-logos/
    dateString: 'November 9, 2025', // Human-readable display for cards
    sortableDate: '2025-11-09',   // YYYY-MM-DD for sorting and isFuture checks
    fullDates: '11/9/2025 - 11/9/2025', // More explicit date display for detail page
    venue: {
      name: 'Memphis Sports & Events Center',
      address: '995 Early Maxwell Blvd, Memphis, TN, 38104, US'
    },
    scheduleNotes: ['Doors Open - 7:00 AM (Please verify day if event is Sunday)'], // User provided "Monday"
    description: 'A major regional classic competition by Cheersport.',
    notes: 'For Minis, Youth, Juniors, and Seniors.', // General eligibility
    results: {
      // '2025' results would be populated as the event happens
      '2025': [], 
      '2024': [ // Results you provided
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
    eventName: 'Deep South Nationals', // Assuming a more specific name, adjust if needed
    brand: 'Deep South',
    logo: null, // Add logo filename if available
    dateString: 'December 13-14, 2025',
    sortableDate: '2025-12-13',
    fullDates: '12/13/2025 - 12/14/2025',
    venue: {
      name: 'LeConte Center (Example)', // Example, please update
      address: 'Pigeon Forge, TN' // Please update with full address
    },
    scheduleNotes: [],
    description: 'A festive competition in the Smokies.',
    notes: 'For Minis, Youth, Juniors, and Seniors.',
    results: {'2025': [], '2024': [] } // Placeholder for results
  },
  {
    id: 'battle-under-big-top-atlanta-2025',
    eventName: 'Battle Under the Big Top',
    brand: 'Unknown Brand', // Please update brand
    logo: null,
    dateString: 'December 13-14, 2025',
    sortableDate: '2025-12-13',
    fullDates: '12/13/2025 - 12/14/2025',
    venue: {
      name: 'Venue Name (Example)',
      address: 'Atlanta, GA' // Please update with full address
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
    logo: null,
    dateString: 'January 24-25, 2026',
    sortableDate: '2026-01-24',
    fullDates: '1/24/2026 - 1/25/2026',
    venue: {
      name: 'Venue Name (Example)',
      address: 'Chattanooga, TN' // Please update
    },
    scheduleNotes: [],
    description: 'Showcase your athletic prowess!',
    notes: 'For Minis, Youth, Juniors, and Seniors.',
    results: {'2026': [], '2025': [] }
  },
  {
    id: 'cheer-expo-pigeon-forge-2026',
    eventName: 'Cheer Expo',
    brand: 'Cheer Expo', // Assuming brand
    logo: null,
    dateString: 'January 31 - February 1, 2026',
    sortableDate: '2026-01-31',
    fullDates: '1/31/2026 - 2/1/2026',
    venue: {
      name: 'Venue Name (Example)',
      address: 'Pigeon Forge, TN' // Please update
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
      address: 'Memphis, TN' // Please update
    },
    scheduleNotes: [],
    description: 'A classic NCA event.',
    notes: 'For Minis, Youth, Juniors, and Seniors.',
    results: {'2026': [], '2025': [] }
  },
  {
    id: 'deep-south-biloxi-2026',
    eventName: 'Deep South Showdown', // Example specific name
    brand: 'Deep South',
    logo: null,
    dateString: 'February 14-15, 2026',
    sortableDate: '2026-02-14',
    fullDates: '2/14/2026 - 2/15/2026',
    venue: {
      name: 'Venue Name (Example)',
      address: 'Biloxi, MS' // Please update
    },
    scheduleNotes: [],
    description: 'Cheer competition on the coast.',
    notes: 'For Minis, Youth, Juniors, and Seniors.',
    results: {'2026': [], '2025': [] }
  },
  {
    id: 'uca-nationals-orlando-2026',
    eventName: 'UCA National High School Cheerleading Championship', // More specific
    brand: 'UCA',
    logo: null, // Add official UCA logo if desired
    dateString: 'March 14-15, 2026',
    sortableDate: '2026-03-14',
    fullDates: '3/14/2026 - 3/15/2026',
    venue: {
      name: 'ESPN Wide World of Sports Complex (Typically)', // Example
      address: 'Orlando, FL' // Please update
    },
    scheduleNotes: [],
    description: 'The prestigious UCA National Championship.',
    notes: 'For Youth, Juniors, and Seniors.', // Specific note from your list
    results: {'2026': [], '2025': [] }
  },
  {
    id: 'one-up-nashville-2026',
    eventName: 'One Up Championships', // More specific
    brand: 'One Up',
    logo: null,
    dateString: 'March 28-30, 2026',
    sortableDate: '2026-03-28',
    fullDates: '3/28/2026 - 3/30/2026',
    venue: {
      name: 'Venue Name (Example)',
      address: 'Nashville, TN' // Please update
    },
    scheduleNotes: [],
    description: 'A highly competitive championship event.',
    notes: 'For Juniors and Seniors only.', // Specific note from your list
    results: {'2026': [], '2025': [] }
  }
  // Add any other competitions from your list here, following the new structure.
];
