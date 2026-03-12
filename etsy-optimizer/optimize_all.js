const fs = require('fs');

const listings = JSON.parse(fs.readFileSync('./listings_raw.json', 'utf8'));

// ─────────────────────────────────────────────
// FIXED SECTIONS (same for every listing)
// Customized for: Digital Products (SVG, Printable)
// ─────────────────────────────────────────────

const INSTANT_DOWNLOAD = `

⚡ INSTANT DOWNLOAD
This is a DIGITAL product — no physical item will be shipped. After payment, you'll receive an instant download link from Etsy. Files are also available in your Etsy account under "Purchases and Reviews".`;

const WHATS_INCLUDED = `

📁 WHAT YOU'LL RECEIVE
• High-resolution files ready for print or cut
• Compatible with Cricut, Silhouette Cameo, and most cutting machines
• Works with Adobe Illustrator, Photoshop, Canva, and Inkscape`;

const HOW_TO_USE = `

🖨️ HOW TO USE
1. Purchase and download your files instantly
2. Open in your preferred design software or cutting machine app
3. Resize to fit your project — all vectors are fully scalable
4. Print at home, at a print shop, or cut with your machine

No design skills required. Files are ready to use as-is.`;

const TERMS = `

📋 TERMS OF USE
• For PERSONAL and SMALL COMMERCIAL USE (sell up to 200 physical items made with this design)
• Do NOT resell, share, or redistribute the digital files
• Do NOT claim the design as your own
• Extended commercial license available — send us a message

Questions? Message us before purchasing — we respond within 24 hours.`;

// ─────────────────────────────────────────────
// PRODUCT-SPECIFIC DESCRIPTION GENERATOR
// ─────────────────────────────────────────────

function generateDescription(title, tags) {
  const t = (title || '').toLowerCase();
  const specific = (title || '').split(',')[0].trim();

  let intro = '';

  // ── SVG / CUTTING FILES ──
  if (t.includes('svg') || t.includes('cut file') || t.includes('cricut') || t.includes('silhouette')) {
    intro = `Ready-to-cut SVG file — ${specific}.

Download, upload to Cricut Design Space or Silhouette Studio, and start cutting in minutes. No complicated setup, no waiting for shipping — just instant access to a clean, well-crafted cut file.

This design works beautifully on shirts, tote bags, mugs, tumblers, wood signs, decals, and more. Scale it up or down without any loss in quality.`;
  }

  // ── PRINTABLE / WALL ART ──
  else if (t.includes('printable') || t.includes('wall art') || t.includes('print') || t.includes('poster') || t.includes('artwork')) {
    intro = `Printable wall art that actually looks good on your wall — ${specific}.

Download, print at home or at a local print shop, frame it, and done. Instant upgrade to any room without the shipping wait or the gallery price tag.

Works at standard frame sizes. Print as many copies as you need for personal use.`;
  }

  // ── PLANNER / JOURNAL / TEMPLATE ──
  else if (t.includes('planner') || t.includes('journal') || t.includes('template') || t.includes('organizer') || t.includes('tracker')) {
    intro = `Get organized with this printable — ${specific}.

Print it, put it in a binder, or use it with your iPad and GoodNotes / Notability. Clean layout, functional design, zero fluff.

Ideal for anyone who wants to plan better without spending hours setting up a system from scratch.`;
  }

  // ── CLIPART / BUNDLE ──
  else if (t.includes('clipart') || t.includes('clip art') || t.includes('bundle') || t.includes('graphics') || t.includes('sticker')) {
    intro = `High-quality digital clipart — ${specific}.

Transparent PNG backgrounds, crisp edges, ready for any project. Use in Canva, Photoshop, Procreate, Word, PowerPoint, or any design tool you prefer.

Perfect for creating your own products, party printables, invitations, social media graphics, and more.`;
  }

  // ── GENERAL DIGITAL FALLBACK ──
  else {
    intro = `Instant download digital file — ${specific}.

Buy once, download immediately, use forever. No waiting, no shipping, no hassle. Open the file in your preferred software and you're ready to go.

High-quality design that's fully editable and scalable. Works across all major design apps.`;
  }

  // ── CLOSING CTA ──
  const closingOptions = [
    `Save this listing to your favorites so you can find it easily later — and explore our shop for more designs like this one.`,
    `Add to cart now for instant access. Check out our other digital files for matching designs.`,
    `Questions before buying? Send us a message — we typically respond within a few hours.`,
    `Add to your favorites and come back when you're ready. We add new designs regularly.`,
  ];
  const closing = closingOptions[Math.abs(hashCode(title)) % closingOptions.length];

  return intro + INSTANT_DOWNLOAD + WHATS_INCLUDED + HOW_TO_USE + TERMS + '\n\n' + closing;
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < (str || '').length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

// ─────────────────────────────────────────────
// ALT TEXT GENERATOR
// ─────────────────────────────────────────────

function generateAltTexts(title, tags) {
  const full = (title || '').trim();
  const mainProduct = full.split(',')[0].trim();
  const tagList = (tags || []).filter(t => t && t.length > 0);

  const usedTags = new Set();
  function pickTag() {
    for (const t of tagList) {
      if (!usedTags.has(t)) { usedTags.add(t); return t; }
    }
    return '';
  }

  const alts = [
    full,
    [mainProduct, pickTag()].filter(Boolean).join(' - '),
    [pickTag(), mainProduct].filter(Boolean).join(', '),
    [mainProduct, pickTag(), pickTag()].filter(Boolean).join(', '),
    [pickTag(), pickTag()].filter(Boolean).join(', '),
    [mainProduct, pickTag()].filter(Boolean).join(', '),
    [pickTag(), mainProduct].filter(Boolean).join(' - '),
    [pickTag(), pickTag(), pickTag()].filter(Boolean).join(', '),
    [mainProduct, pickTag()].filter(Boolean).join(' - '),
    [pickTag(), pickTag()].filter(Boolean).join(', '),
  ];

  return alts.slice(0, 10).map(alt => alt.trim().substring(0, 250));
}

// ─────────────────────────────────────────────
// TAG OPTIMIZATION (Digital Products Niche)
// ─────────────────────────────────────────────

const TAG_POOLS = {
  svg: [
    'svg cut file', 'cricut svg file', 'silhouette svg', 'instant download svg',
    'digital cut file', 'svg for cricut', 'svg for shirts', 'dxf cut file',
    'eps vector file', 'png transparent', 'cutting machine file', 'heat transfer svg'
  ],
  printable: [
    'instant download art', 'printable wall art', 'digital wall print',
    'home decor printable', 'gallery wall print', 'digital download art',
    'print at home art', 'frameable wall art', 'modern wall decor',
    'minimalist print', 'boho wall art', 'aesthetic wall decor'
  ],
  planner: [
    'printable planner', 'digital planner page', 'instant download planner',
    'daily planner print', 'weekly planner pdf', 'productivity printable',
    'habit tracker print', 'planner insert pdf', 'goodnotes template',
    'binder planner page', 'letter size planner', 'a4 planner printable'
  ],
  clipart: [
    'digital clipart png', 'transparent png file', 'clipart bundle',
    'commercial use clipart', 'canva elements', 'scrapbook clipart',
    'party printable art', 'invitation clipart', 'digital sticker pack',
    'procreate stamp', 'graphic design asset', 'png clip art download'
  ],
  general: [
    'instant download file', 'digital download', 'commercial use ok',
    'printable gift idea', 'digital file gift', 'easy download file',
    'no physical item', 'digital craft file', 'diy project digital',
    'design resource file', 'crafters digital file', 'maker digital download'
  ]
};

function getTitleWords(title) {
  return (title || '')
    .toLowerCase()
    .split(/[\s,\-|\/]+/)
    .filter(w => w.length > 3);
}

function tagOverlapsTitle(tag, titleWords) {
  const tagWords = tag.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  const matches = tagWords.filter(w => titleWords.includes(w));
  return matches.length >= 2;
}

function getCategory(title) {
  const t = (title || '').toLowerCase();
  if (t.includes('svg') || t.includes('cut file') || t.includes('cricut') || t.includes('silhouette') || t.includes('dxf')) return 'svg';
  if (t.includes('printable') || t.includes('wall art') || t.includes('print') || t.includes('poster')) return 'printable';
  if (t.includes('planner') || t.includes('journal') || t.includes('template') || t.includes('tracker')) return 'planner';
  if (t.includes('clipart') || t.includes('clip art') || t.includes('bundle') || t.includes('sticker') || t.includes('png')) return 'clipart';
  return 'general';
}

function optimizeTags(listing) {
  const title = listing.title || '';
  const titleWords = getTitleWords(title);
  const category = getCategory(title);
  const pool = [...(TAG_POOLS[category] || []), ...TAG_POOLS.general];

  const used = new Set();
  const result = (listing.tags || []).map(tag => {
    if (!tag) return tag;
    used.add(tag);
    if (!tagOverlapsTitle(tag, titleWords)) return tag;

    for (const candidate of pool) {
      const c = candidate.substring(0, 20).trim();
      if (!tagOverlapsTitle(c, titleWords) && !used.has(c)) {
        used.add(c);
        return c;
      }
    }
    return tag;
  });

  return result;
}

// ─────────────────────────────────────────────
// MAIN OPTIMIZATION
// ─────────────────────────────────────────────

let overlapFixed = 0;

const optimized = listings.map(listing => {
  const newDescription = generateDescription(listing.title, listing.tags);
  const altTexts = generateAltTexts(listing.title, listing.tags);
  const newTags = optimizeTags(listing);

  const titleWords = getTitleWords(listing.title);
  const oldOverlaps = (listing.tags || []).filter(tag => tagOverlapsTitle(tag, titleWords)).length;
  if (oldOverlaps > 0) overlapFixed++;

  return {
    id: listing.id,
    editUrl: listing.editUrl,
    title: listing.title,
    tags: newTags,
    description: newDescription,
    altTexts: altTexts
  };
});

fs.writeFileSync('./listings_optimized.json', JSON.stringify(optimized, null, 2), 'utf8');

console.log(`\n${optimized.length} listings optimized!`);
console.log(`Tag overlap fixed: ${overlapFixed} listings`);
console.log('Saved to listings_optimized.json\n');
console.log('=== PREVIEW (First 3) ===\n');
optimized.slice(0, 3).forEach((l, i) => {
  console.log(`${i + 1}. ${l.title?.substring(0, 70)}`);
  console.log(`   TAGS: ${l.tags.join(' | ')}`);
  console.log(`   DESC: "${l.description.substring(0, 150)}..."`);
  console.log(`   ALT1: ${l.altTexts[0]}`);
  console.log('');
});
