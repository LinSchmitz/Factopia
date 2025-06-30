const CATEGORIES = [
  { name: 'technology', color: '#aec6cf' }, // Pastel Blue-Green
  { name: 'science', color: '#c7d2fe' }, // Soft Pastel Green
  { name: 'finance', color: '#ddd6fe' }, // Light Coral Pastel
  { name: 'society', color: '#fdfd96' }, // Lemon Pastel Yellow
  { name: 'entertainment', color: '#ffb7ce' }, // Bubblegum Pink
  { name: 'health', color: '#b0e0e6' }, // Powder Blue
  { name: 'history', color: '#ffcccb' }, // Blush Pastel Red
  { name: 'news', color: '#dcbdfb' }, // Lavender Pastel Purple
];

const initialFacts = [
  {
    id: 1,
    text: 'React is being developed by Meta (formerly facebook)',
    source: 'https://opensource.fb.com/',
    category: 'technology',
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: 'Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%',
    source:
      'https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids',
    category: 'society',
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: 'Lisbon is the capital of Portugal',
    source: 'https://en.wikipedia.org/wiki/Lisbon',
    category: 'society',
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

// LINK TO APP SAMPLE DATA:

// 👍 🤯 ⛔️
// supabase: Factopia / 322792

//  curl.exe "https://hamcgcpwtbzfjrzqqsie.supabase.co/rest/v1/facts" `
// -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhbWNnY3B3dGJ6ZmpyenFxc2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNzE3NzEsImV4cCI6MjA2Njg0Nzc3MX0.Gb4r9HExetrC3uXNkuMacCKr7GNwU14P8Vwf4OjWCEQ" \`
// -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhbWNnY3B3dGJ6ZmpyenFxc2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNzE3NzEsImV4cCI6MjA2Njg0Nzc3MX0.Gb4r9HExetrC3uXNkuMacCKr7GNwU14P8Vwf4OjWCEQ"
