const fs = require('fs');

const listings = JSON.parse(fs.readFileSync('./listings_raw.json', 'utf8'));

// Optimization rules:
// 1. Title: Main product first, under 70 chars, natural language
// 2. Tags: 13 slots full, no overlap with title, cover different intents

function optimizeTitle(title) {
  if (!title) return '';
  const parts = title.split(',').map(p => p.trim());
  let main = parts[0];
  if (main.length <= 70) return main;
  return main.substring(0, 67) + '...';
}

function generateTags(listing) {
  const title = listing.title || '';
  const existingTags = listing.tags || [];
  const titleLower = title.toLowerCase();

  let cleanTags = existingTags.filter(t =>
    t && t.length > 1 && t.length <= 20
  );

  // Category-based tag suggestions - Digital Products (SVG, Printable)
  const extraTags = [];

  if (titleLower.includes('svg') || titleLower.includes('cut file') || titleLower.includes('cricut') || titleLower.includes('dxf')) {
    extraTags.push('svg cut file', 'cricut svg', 'silhouette svg', 'instant download');
  }
  if (titleLower.includes('printable') || titleLower.includes('wall art') || titleLower.includes('print')) {
    extraTags.push('printable wall art', 'instant download art', 'digital wall print', 'print at home');
  }
  if (titleLower.includes('planner') || titleLower.includes('template') || titleLower.includes('tracker')) {
    extraTags.push('printable planner', 'digital planner', 'instant download', 'goodnotes template');
  }
  if (titleLower.includes('clipart') || titleLower.includes('bundle') || titleLower.includes('sticker')) {
    extraTags.push('digital clipart png', 'transparent png', 'commercial use', 'canva elements');
  }
  if (titleLower.includes('christmas') || titleLower.includes('holiday') || titleLower.includes('xmas')) {
    extraTags.push('christmas digital', 'holiday printable', 'xmas svg cricut', 'christmas print');
  }
  if (titleLower.includes('birthday') || titleLower.includes('party')) {
    extraTags.push('birthday printable', 'party digital file', 'birthday svg', 'party decoration');
  }

  let allTags = [...new Set([...cleanTags, ...extraTags])];
  allTags = allTags.map(t => t.substring(0, 20).trim());
  allTags = [...new Set(allTags)];

  if (allTags.length > 13) allTags = allTags.slice(0, 13);

  // Fill up to 13 tags with general digital product ones
  const generalTags = [
    'instant download', 'digital download', 'commercial use ok',
    'printable gift', 'digital craft file', 'no physical item',
    'diy project file', 'design resource'
  ];
  let gi = 0;
  while (allTags.length < 13 && gi < generalTags.length) {
    if (!allTags.includes(generalTags[gi])) allTags.push(generalTags[gi]);
    gi++;
  }

  return allTags.slice(0, 13);
}

const optimized = listings.map(listing => {
  const newTitle = optimizeTitle(listing.title);
  const newTags = generateTags(listing);

  return {
    id: listing.id,
    editUrl: listing.editUrl,
    original: {
      title: listing.title,
      tags: listing.tags
    },
    optimized: {
      title: newTitle,
      tags: newTags
    }
  };
});

fs.writeFileSync('./listings_optimized.json', JSON.stringify(optimized, null, 2), 'utf8');

console.log(`\n${optimized.length} listings optimized!`);
console.log('Saved to listings_optimized.json\n');

// Preview
console.log('=== PREVIEW (First 5) ===\n');
optimized.slice(0, 5).forEach((l, i) => {
  console.log(`${i + 1}. ID: ${l.id}`);
  console.log(`   OLD: ${l.original.title?.substring(0, 80)}`);
  console.log(`   NEW: ${l.optimized.title}`);
  console.log(`   TAG: ${l.optimized.tags.join(' | ')}`);
  console.log('');
});
