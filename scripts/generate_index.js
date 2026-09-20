const fs = require('fs');
const path = require('path');

const rootDir = __dirname ? path.join(__dirname, '..') : process.cwd();

// Load data files safely
const toolsDataRaw = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'tools.json'), 'utf-8'));
const questsDataRaw = fs.existsSync(path.join(rootDir, 'data', 'quests.json')) 
  ? JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'quests.json'), 'utf-8')) : { quests: [], categories: [] };
const instrumentsDataRaw = fs.existsSync(path.join(rootDir, 'data', 'instruments.json')) 
  ? JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'instruments.json'), 'utf-8')) : { instruments: [], categories: [] };
const quizzesDataRaw = fs.existsSync(path.join(rootDir, 'data', 'quizzes.json')) 
  ? JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'quizzes.json'), 'utf-8')) : { quizzes: [], categories: [] };
const themesDataRaw = fs.existsSync(path.join(rootDir, 'data', 'themes.json')) 
  ? JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'themes.json'), 'utf-8')) : { themes: [] };

// Normalize all items into a unified collection
const allItems = [];

// 1. Tools
(toolsDataRaw.tools || []).forEach(t => {
  allItems.push({
    id: t.id,
    type: 'tool',
    typeName: 'Developer Tool',
    typeIcon: '🛠️',
    name: t.name,
    shortDescription: t.shortDescription,
    longDescription: t.longDescription || t.shortDescription,
    category: t.category,
    categoryName: toolsDataRaw.categories?.find(c => c.id === t.category)?.name || t.category,
    categoryIcon: toolsDataRaw.categories?.find(c => c.id === t.category)?.icon || '🛠️',
    tags: t.tags || [],
    techStack: t.techStack || ['HTML5', 'CSS3', 'JavaScript'],
    difficulty: t.difficulty || 'Medium',
    status: t.status || 'live',
    url: `tools/${t.id}.html`,
    thumbnail: `tools/${t.id}.png`,
    featured: ['a11y-contrast-grid', 'git-commit-range-cleaner', 'animation-cubic-bezier-editor'].includes(t.id)
  });
});

// 2. Quests
(questsDataRaw.quests || []).forEach(q => {
  allItems.push({
    id: q.id,
    type: 'quest',
    typeName: 'Gamified Quest',
    typeIcon: '🎮',
    name: q.name,
    shortDescription: q.shortDescription,
    longDescription: q.longDescription || q.shortDescription,
    category: q.category,
    categoryName: questsDataRaw.categories?.find(c => c.id === q.category)?.name || q.category,
    categoryIcon: questsDataRaw.categories?.find(c => c.id === q.category)?.icon || '🎮',
    tags: q.tags || [],
    techStack: q.techStack || ['HTML5', 'CSS3', 'Vanilla JS'],
    difficulty: q.difficulty || 'Hard',
    status: q.status || 'live',
    url: `quests/${q.id}.html`,
    thumbnail: `quests/${q.id}.png`,
    featured: ['abyssal-current', 'closure-escape-room', 'merge-conflict-from-hell', 'the-lost-commits'].includes(q.id)
  });
});

// 3. Instruments
(instrumentsDataRaw.instruments || []).forEach(inst => {
  allItems.push({
    id: inst.id,
    type: 'instrument',
    typeName: 'Web Audio Lab',
    typeIcon: '🎹',
    name: inst.name,
    shortDescription: inst.shortDescription,
    longDescription: inst.longDescription || inst.shortDescription,
    category: inst.category,
    categoryName: instrumentsDataRaw.categories?.find(c => c.id === inst.category)?.name || inst.category,
    categoryIcon: instrumentsDataRaw.categories?.find(c => c.id === inst.category)?.icon || '🎹',
    tags: inst.tags || [],
    techStack: inst.techStack || ['HTML5', 'Web Audio API', 'Canvas'],
    difficulty: inst.difficulty || 'Hard',
    status: inst.status || 'live',
    url: `instruments/${inst.id}.html`,
    thumbnail: `instruments/${inst.id}.png`,
    featured: ['glassmorphic-wavetable-synth', 'euclidean-polyrhythm-sequencer', 'interactive-fretboard-chord-explorer'].includes(inst.id)
  });
});

// 4. Quizzes
(quizzesDataRaw.quizzes || []).forEach(qz => {
  // Check if quiz has a html file in quests or tools
  let url = fs.existsSync(path.join(rootDir, 'quests', `${qz.id}.html`)) 
    ? `quests/${qz.id}.html` 
    : (fs.existsSync(path.join(rootDir, 'tools', `${qz.id}.html`)) ? `tools/${qz.id}.html` : `quests/${qz.id}.html`);
  let thumb = fs.existsSync(path.join(rootDir, 'quests', `${qz.id}.png`)) ? `quests/${qz.id}.png` : `tools/${qz.id}.png`;

  allItems.push({
    id: qz.id,
    type: 'quiz',
    typeName: 'Quiz & Drill',
    typeIcon: '🧠',
    name: qz.name,
    shortDescription: qz.shortDescription,
    longDescription: qz.longDescription || qz.shortDescription,
    category: qz.category,
    categoryName: quizzesDataRaw.categories?.find(c => c.id === qz.category)?.name || qz.category,
    categoryIcon: quizzesDataRaw.categories?.find(c => c.id === qz.category)?.icon || '🧠',
    tags: qz.tags || [],
    techStack: qz.techStack || ['HTML5', 'CSS3', 'JavaScript'],
    difficulty: qz.difficulty || 'Medium',
    status: qz.status || 'live',
    url: url,
    thumbnail: thumb,
    featured: ['closure-chronicles', 'command-line-craze'].includes(qz.id)
  });
});

// 5. Portfolio & Resume Themes
const resumeThemes = [
  { id: 'classic', name: 'Classic Minimalist Resume', desc: 'Timeless layout engineered for ATS clarity and clean typography.', type: 'theme', thumb: 'resume/classic.png' },
  { id: 'cosmic', name: 'Cosmic Cyberpunk Resume', desc: 'Futuristic glowing layout with dark galactic accents and neon highlights.', type: 'theme', thumb: 'resume/cosmic.png' },
  { id: 'herbarium', name: 'Herbarium Botanical Resume', desc: 'Organic, editorial resume theme featuring natural tones and refined typography.', type: 'theme', thumb: 'resume/herbarium.png' },
  { id: 'resume-opus-5', name: 'Opus 5 Executive Resume', desc: 'Comprehensive multi-section executive CV theme with timeline visualization.', type: 'theme', thumb: 'resume/resume-opus-5.png' }
];

const portfolioThemes = [
  { id: 'space', name: 'Deep Space Portfolio', desc: 'Dark theme portfolio featuring starry glass cards and cosmic design details.', type: 'theme', thumb: 'portfolio/space.png' },
  { id: 'fable', name: 'Fable Storyteller Portfolio', desc: 'Whimsical, illustrated narrative portfolio theme for creative developers.', type: 'theme', thumb: 'portfolio/fable.png' },
  { id: 'desert', name: 'Warm Desert Portfolio', desc: 'Earthy, sun-soaked color palette with smooth glassmorphism.', type: 'theme', thumb: 'portfolio/desert.png' },
  { id: 'developer', name: 'Developer Terminal Portfolio', desc: 'Code-first portfolio design with terminal syntax highlighting accents.', type: 'theme', thumb: 'portfolio/developer.png' }
];

[...resumeThemes, ...portfolioThemes].forEach(th => {
  allItems.push({
    id: th.id,
    type: 'theme',
    typeName: 'Theme & Template',
    typeIcon: '🎨',
    name: th.name,
    shortDescription: th.desc,
    longDescription: th.desc,
    category: 'themes',
    categoryName: 'Themes & Templates',
    categoryIcon: '🎨',
    tags: ['design', 'responsive', 'portfolio', 'resume'],
    techStack: ['HTML5', 'CSS3', 'Design System'],
    difficulty: 'Easy',
    status: 'live',
    url: th.thumb.replace('.png', '.hbs'),
    thumbnail: th.thumb,
    featured: ['herbarium', 'space'].includes(th.id)
  });
});

console.log(`Loaded ${allItems.length} total items across all categories.`);

// Generate index.html
const htmlContent = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OpenPlayground — The Single-File Web Universe & Interactive Showcase</title>
  <meta name="description" content="Explore an extraordinary suite of single-file developer tools, gamified coding quests, Web Audio synthesizers, and portfolio themes with 0 dependencies." />
  <meta name="keywords" content="developer tools, web audio, css games, coding quests, single-file html, synth, escape room, portfolio themes" />
  <meta name="author" content="Aditya Mahajan" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="OpenPlayground — The Single-File Web Universe" />
  <meta property="og:description" content="Interactive developer tools, gamified coding quests, Web Audio synthesizers, and portfolio themes." />
  <meta property="og:type" content="website" />
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet" />

  <style>
    /* ==========================================================================
       DESIGN SYSTEM & CSS VARIABLES
       ========================================================================== */
    :root {
      --font-main: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-display: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;

      /* Dark Nebula Theme (Default) */
      --bg-base: #070a13;
      --bg-surface: #0e1526;
      --bg-surface-elevated: #162038;
      --bg-glass: rgba(14, 21, 38, 0.78);
      --bg-glass-card: rgba(18, 27, 50, 0.65);
      --bg-glass-hover: rgba(28, 40, 72, 0.85);
      --border-subtle: rgba(255, 255, 255, 0.08);
      --border-glow: rgba(99, 102, 241, 0.35);
      --border-active: rgba(129, 140, 248, 0.6);

      --text-primary: #f8fafc;
      --text-secondary: #94a3b8;
      --text-muted: #64748b;
      --text-accent: #38bdf8;

      /* Vibrant Accents */
      --accent-cyan: #06b6d4;
      --accent-indigo: #6366f1;
      --accent-violet: #8b5cf6;
      --accent-fuchsia: #d946ef;
      --accent-emerald: #10b981;
      --accent-amber: #f59e0b;
      --accent-rose: #f43f5e;

      /* Glow & Shadows */
      --glow-cyan: 0 0 30px -5px rgba(6, 182, 212, 0.35);
      --glow-indigo: 0 0 30px -5px rgba(99, 102, 241, 0.35);
      --shadow-card: 0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05);

      --radius-sm: 8px;
      --radius-md: 14px;
      --radius-lg: 20px;
      --radius-full: 9999px;

      --transition-smooth: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      --transition-bounce: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    [data-theme="cyberpunk"] {
      --bg-base: #06050b;
      --bg-surface: #0e0919;
      --bg-surface-elevated: #1b1130;
      --bg-glass: rgba(14, 9, 25, 0.85);
      --bg-glass-card: rgba(22, 13, 38, 0.7);
      --border-subtle: rgba(236, 72, 153, 0.22);
      --border-glow: rgba(0, 240, 255, 0.5);
      --accent-cyan: #00f0ff;
      --accent-indigo: #ff007f;
      --accent-violet: #7928ca;
      --text-accent: #00f0ff;
      --shadow-card: 0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 0, 127, 0.15);
    }

    [data-theme="aurora"] {
      --bg-base: #03131a;
      --bg-surface: #06222c;
      --bg-surface-elevated: #0d3846;
      --bg-glass: rgba(6, 34, 44, 0.85);
      --bg-glass-card: rgba(8, 43, 56, 0.7);
      --border-subtle: rgba(45, 212, 191, 0.22);
      --border-glow: rgba(52, 211, 153, 0.45);
      --accent-cyan: #2dd4bf;
      --accent-indigo: #3b82f6;
      --accent-violet: #10b981;
      --text-accent: #2dd4bf;
      --shadow-card: 0 10px 30px -10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(45, 212, 191, 0.15);
    }

    [data-theme="light"] {
      --bg-base: #f8fafc;
      --bg-surface: #ffffff;
      --bg-surface-elevated: #f1f5f9;
      --bg-glass: rgba(255, 255, 255, 0.88);
      --bg-glass-card: rgba(255, 255, 255, 0.8);
      --bg-glass-hover: rgba(241, 245, 249, 0.95);
      --border-subtle: rgba(0, 0, 0, 0.08);
      --border-glow: rgba(99, 102, 241, 0.25);
      --border-active: rgba(99, 102, 241, 0.5);
      --text-primary: #0f172a;
      --text-secondary: #475569;
      --text-muted: #94a3b8;
      --text-accent: #0284c7;
      --shadow-card: 0 10px 30px -10px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.04);
    }

    /* Reset */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
      font-size: 16px;
    }

    body {
      font-family: var(--font-main);
      background-color: var(--bg-base);
      color: var(--text-primary);
      min-height: 100vh;
      overflow-x: hidden;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      position: relative;
    }

    /* Ambient Canvas */
    #ambient-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: 0.6;
    }

    .ambient-blob {
      position: fixed;
      pointer-events: none;
      z-index: 0;
      filter: blur(80px);
      border-radius: 50%;
      transition: background 0.5s ease;
    }
    .blob-1 {
      top: -150px;
      left: 10%;
      width: 650px;
      height: 650px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.16) 0%, rgba(99, 102, 241, 0) 70%);
    }
    .blob-2 {
      top: 35%;
      right: -100px;
      width: 700px;
      height: 700px;
      background: radial-gradient(circle, rgba(6, 182, 212, 0.14) 0%, rgba(6, 182, 212, 0) 70%);
    }
    .blob-3 {
      bottom: -150px;
      left: 20%;
      width: 750px;
      height: 750px;
      background: radial-gradient(circle, rgba(217, 70, 239, 0.12) 0%, rgba(217, 70, 239, 0) 70%);
    }

    .app-container {
      position: relative;
      z-index: 1;
      max-width: 1440px;
      margin: 0 auto;
      padding: 0 24px 80px 24px;
    }

    /* Navbar */
    .navbar {
      position: sticky;
      top: 16px;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 12px 24px;
      background: var(--bg-glass);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      box-shadow: var(--shadow-card);
      margin-top: 16px;
      margin-bottom: 32px;
      transition: var(--transition-smooth);
    }
    .navbar:hover {
      border-color: var(--border-glow);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: var(--text-primary);
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.25rem;
      letter-spacing: -0.02em;
    }

    .brand-logo {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: linear-gradient(135deg, #06b6d4, #6366f1, #d946ef);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 1.15rem;
      box-shadow: 0 0 16px rgba(99, 102, 241, 0.4);
      animation: logoPulse 4s infinite ease-in-out;
    }
    @keyframes logoPulse {
      0%, 100% { transform: scale(1); filter: brightness(1); }
      50% { transform: scale(1.05); filter: brightness(1.2); box-shadow: 0 0 24px rgba(6, 182, 212, 0.6); }
    }

    .brand-text {
      background: linear-gradient(135deg, #f8fafc 30%, #38bdf8 70%, #818cf8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .search-trigger-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 16px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      color: var(--text-secondary);
      font-size: 0.875rem;
      cursor: pointer;
      transition: var(--transition-smooth);
    }
    .search-trigger-btn:hover {
      background: var(--bg-glass-hover);
      border-color: var(--accent-indigo);
      color: var(--text-primary);
    }

    .search-kbd {
      padding: 2px 6px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.1);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 600;
    }

    .icon-btn {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-full);
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: var(--transition-smooth);
      position: relative;
    }
    .icon-btn:hover {
      background: var(--bg-glass-hover);
      border-color: var(--accent-cyan);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    .icon-btn.active {
      border-color: var(--accent-indigo);
      color: var(--accent-cyan);
      background: rgba(99, 102, 241, 0.15);
    }

    .fav-badge-counter {
      position: absolute;
      top: -4px;
      right: -4px;
      background: var(--accent-amber);
      color: #000;
      font-size: 0.65rem;
      font-weight: 800;
      padding: 1px 5px;
      border-radius: var(--radius-full);
    }

    /* Hero */
    .hero-section {
      text-align: center;
      padding: 36px 16px 28px 16px;
      position: relative;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      border-radius: var(--radius-full);
      background: rgba(99, 102, 241, 0.12);
      border: 1px solid rgba(99, 102, 241, 0.35);
      color: #a5b4fc;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 20px;
      box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
    }

    .hero-badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 10px #10b981;
      animation: blink 2s infinite ease-in-out;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }

    .hero-title {
      font-family: var(--font-display);
      font-size: clamp(2.3rem, 5vw, 4.2rem);
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin-bottom: 18px;
    }

    .hero-title-gradient {
      background: linear-gradient(135deg, #ffffff 10%, #67e8f9 50%, #c084fc 80%, #f472b6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 0 30px rgba(6, 182, 212, 0.25));
    }

    .hero-desc {
      max-width: 780px;
      margin: 0 auto 32px auto;
      font-size: clamp(1rem, 2vw, 1.2rem);
      color: var(--text-secondary);
      font-weight: 400;
      line-height: 1.6;
    }

    .hero-stats-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 14px;
      margin-bottom: 36px;
    }

    .stat-pill {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 18px;
      background: var(--bg-glass-card);
      backdrop-filter: blur(12px);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      transition: var(--transition-smooth);
      cursor: pointer;
    }
    .stat-pill:hover {
      transform: translateY(-3px);
      border-color: var(--border-glow);
      box-shadow: var(--shadow-card);
    }
    .stat-icon { font-size: 1.35rem; }
    .stat-number {
      font-family: var(--font-display);
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--text-primary);
    }
    .stat-label {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.05em;
    }

    .hero-cta-group {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 14px;
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 28px;
      border-radius: var(--radius-full);
      background: linear-gradient(135deg, #06b6d4, #6366f1);
      color: #ffffff;
      font-weight: 700;
      font-size: 0.95rem;
      text-decoration: none;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
      transition: var(--transition-bounce);
    }
    .btn-primary:hover {
      transform: translateY(-3px) scale(1.03);
      box-shadow: 0 8px 30px rgba(6, 182, 212, 0.6);
      filter: brightness(1.1);
    }

    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: var(--radius-full);
      background: var(--bg-surface-elevated);
      color: var(--text-primary);
      font-weight: 600;
      font-size: 0.95rem;
      text-decoration: none;
      border: 1px solid var(--border-subtle);
      cursor: pointer;
      transition: var(--transition-smooth);
    }
    .btn-secondary:hover {
      background: var(--bg-glass-hover);
      border-color: var(--border-active);
      transform: translateY(-2px);
    }

    /* Spotlight Carousel */
    .spotlight-section {
      margin-bottom: 48px;
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .section-title-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .section-badge-icon { font-size: 1.5rem; }
    .section-title {
      font-family: var(--font-display);
      font-size: 1.6rem;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .section-subtitle {
      font-size: 0.9rem;
      color: var(--text-muted);
    }

    .carousel-container {
      position: relative;
      overflow: hidden;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-subtle);
      background: var(--bg-glass-card);
      backdrop-filter: blur(16px);
      box-shadow: var(--shadow-card);
    }

    .carousel-track {
      display: flex;
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .carousel-slide {
      min-width: 100%;
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 32px;
      padding: 32px;
      align-items: center;
    }
    @media (max-width: 900px) {
      .carousel-slide {
        grid-template-columns: 1fr;
        padding: 20px;
        gap: 20px;
      }
    }

    .slide-media {
      position: relative;
      border-radius: var(--radius-md);
      overflow: hidden;
      aspect-ratio: 16 / 10;
      background: #020617;
      border: 1px solid var(--border-subtle);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    .slide-media img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }
    .slide-media:hover img { transform: scale(1.04); }

    .slide-content {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .slide-badge-row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .type-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .type-badge.quest { background: rgba(217, 70, 239, 0.15); color: #f0abfc; border: 1px solid rgba(217, 70, 239, 0.3); }
    .type-badge.tool { background: rgba(6, 182, 212, 0.15); color: #67e8f9; border: 1px solid rgba(6, 182, 212, 0.3); }
    .type-badge.instrument { background: rgba(139, 92, 246, 0.15); color: #c084fc; border: 1px solid rgba(139, 92, 246, 0.3); }
    .type-badge.theme { background: rgba(245, 158, 11, 0.15); color: #fcd34d; border: 1px solid rgba(245, 158, 11, 0.3); }
    .type-badge.quiz { background: rgba(16, 185, 129, 0.15); color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.3); }

    .diff-badge {
      font-size: 0.75rem;
      padding: 3px 10px;
      border-radius: var(--radius-full);
      font-weight: 600;
    }
    .diff-badge.Easy { background: rgba(16, 185, 129, 0.15); color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.3); }
    .diff-badge.Medium { background: rgba(245, 158, 11, 0.15); color: #fde68a; border: 1px solid rgba(245, 158, 11, 0.3); }
    .diff-badge.Hard { background: rgba(244, 63, 94, 0.15); color: #fda4af; border: 1px solid rgba(244, 63, 94, 0.3); }

    .slide-title {
      font-family: var(--font-display);
      font-size: 1.85rem;
      font-weight: 800;
      line-height: 1.2;
    }

    .slide-desc {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.6;
    }

    .slide-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .tag-chip {
      padding: 3px 10px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle);
      font-size: 0.75rem;
      color: var(--text-muted);
      font-family: var(--font-mono);
    }

    .slide-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 6px;
    }

    .carousel-nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
      transition: var(--transition-smooth);
    }
    .carousel-nav-btn:hover {
      background: var(--bg-glass-hover);
      border-color: var(--accent-indigo);
      transform: translateY(-50%) scale(1.1);
    }
    .carousel-nav-btn.prev { left: 16px; }
    .carousel-nav-btn.next { right: 16px; }

    .carousel-indicators {
      display: flex;
      justify-content: center;
      gap: 8px;
      padding: 16px;
    }
    .indicator-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--border-subtle);
      cursor: pointer;
      transition: var(--transition-smooth);
    }
    .indicator-dot.active {
      width: 28px;
      border-radius: 4px;
      background: var(--accent-cyan);
      box-shadow: 0 0 10px var(--accent-cyan);
    }

    /* Filter Toolbar & Tabs */
    .filter-section {
      margin-bottom: 32px;
    }

    .tabs-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 12px;
      margin-bottom: 18px;
      scrollbar-width: none;
    }
    .tabs-bar::-webkit-scrollbar { display: none; }

    .tab-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      border-radius: var(--radius-full);
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      white-space: nowrap;
      transition: var(--transition-smooth);
    }
    .tab-btn:hover {
      background: var(--bg-surface-elevated);
      color: var(--text-primary);
      border-color: var(--border-glow);
    }
    .tab-btn.active {
      background: linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(99, 102, 241, 0.2));
      border-color: var(--accent-cyan);
      color: #ffffff;
      box-shadow: 0 0 15px rgba(6, 182, 212, 0.25);
    }
    .tab-count {
      padding: 2px 8px;
      border-radius: var(--radius-full);
      background: rgba(255, 255, 255, 0.1);
      font-size: 0.75rem;
      font-weight: 700;
    }

    .controls-toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 16px 20px;
      background: var(--bg-glass);
      backdrop-filter: blur(16px);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-card);
    }

    .search-box-wrap {
      flex: 1;
      min-width: 260px;
      position: relative;
      display: flex;
      align-items: center;
    }
    .search-icon-inside {
      position: absolute;
      left: 14px;
      color: var(--text-muted);
      pointer-events: none;
    }
    .main-search-input {
      width: 100%;
      padding: 10px 40px 10px 42px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      color: var(--text-primary);
      font-family: var(--font-main);
      font-size: 0.9rem;
      outline: none;
      transition: var(--transition-smooth);
    }
    .main-search-input:focus {
      border-color: var(--accent-cyan);
      box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.2);
    }

    .search-clear-btn {
      position: absolute;
      right: 12px;
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      display: none;
      font-size: 1rem;
      padding: 4px;
    }

    .filter-dropdowns {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .select-dropdown {
      padding: 9px 16px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      color: var(--text-primary);
      font-family: var(--font-main);
      font-size: 0.85rem;
      font-weight: 500;
      outline: none;
      cursor: pointer;
      transition: var(--transition-smooth);
    }
    .select-dropdown:hover, .select-dropdown:focus {
      border-color: var(--border-glow);
    }

    .view-switchers {
      display: flex;
      align-items: center;
      gap: 4px;
      background: var(--bg-surface-elevated);
      padding: 4px;
      border-radius: var(--radius-full);
      border: 1px solid var(--border-subtle);
    }

    .view-btn {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-full);
      background: transparent;
      border: none;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: var(--transition-smooth);
    }
    .view-btn:hover { color: var(--text-primary); }
    .view-btn.active {
      background: var(--bg-glass-hover);
      color: var(--accent-cyan);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }

    .subcats-filter-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-top: 14px;
    }

    .subcat-pill {
      padding: 5px 14px;
      border-radius: var(--radius-full);
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-subtle);
      font-size: 0.8rem;
      color: var(--text-secondary);
      cursor: pointer;
      transition: var(--transition-smooth);
    }
    .subcat-pill:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: var(--border-glow);
      color: var(--text-primary);
    }
    .subcat-pill.active {
      background: rgba(99, 102, 241, 0.2);
      border-color: var(--accent-indigo);
      color: #c7d2fe;
    }

    /* Catalog Grid */
    .catalog-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 24px;
      margin-top: 24px;
    }
    .catalog-grid.compact {
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
      gap: 16px;
    }
    .catalog-grid.list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    /* Card */
    .card-item {
      position: relative;
      background: var(--bg-glass-card);
      backdrop-filter: blur(16px);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-card);
      transition: var(--transition-smooth);
    }
    .card-item:hover {
      transform: translateY(-5px);
      border-color: var(--border-glow);
      box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.6), 0 0 25px -5px rgba(99, 102, 241, 0.25);
    }

    .card-thumb-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #020617;
      overflow: hidden;
    }
    .card-thumb-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .card-item:hover .card-thumb-img {
      transform: scale(1.05);
    }

    .card-floating-badges {
      position: absolute;
      top: 12px;
      left: 12px;
      right: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      pointer-events: none;
      z-index: 2;
    }

    .live-indicator-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: var(--radius-full);
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #34d399;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.05em;
    }

    .star-bookmark-btn {
      pointer-events: auto;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #94a3b8;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: var(--transition-smooth);
    }
    .star-bookmark-btn:hover {
      background: #f59e0b;
      color: #000;
      transform: scale(1.1);
      box-shadow: 0 0 15px rgba(245, 158, 11, 0.6);
    }
    .star-bookmark-btn.favorited {
      background: #f59e0b;
      color: #ffffff;
      border-color: #f59e0b;
      box-shadow: 0 0 12px rgba(245, 158, 11, 0.5);
    }

    .card-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 12px;
    }

    .card-meta-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .card-title {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1.3;
      color: var(--text-primary);
    }

    .card-desc {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      flex: 1;
    }

    .card-tech-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }
    .tech-mini-chip {
      padding: 2px 8px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-subtle);
      font-size: 0.7rem;
      font-family: var(--font-mono);
      color: var(--text-muted);
    }

    .card-footer-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 12px;
      padding-top: 14px;
      border-top: 1px solid var(--border-subtle);
    }

    .launch-btn {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 16px;
      border-radius: var(--radius-md);
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo));
      color: #ffffff;
      font-weight: 700;
      font-size: 0.85rem;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: var(--transition-bounce);
    }
    .launch-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);
      filter: brightness(1.1);
    }

    .preview-modal-btn {
      padding: 10px 14px;
      border-radius: var(--radius-md);
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      color: var(--text-primary);
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: var(--transition-smooth);
    }
    .preview-modal-btn:hover {
      background: var(--bg-glass-hover);
      border-color: var(--border-active);
    }

    /* List view specific overrides */
    .catalog-grid.list .card-item {
      flex-direction: row;
      align-items: center;
      min-height: 90px;
    }
    .catalog-grid.list .card-thumb-wrap {
      width: 140px;
      height: 100%;
      aspect-ratio: auto;
    }
    .catalog-grid.list .card-body {
      flex-direction: row;
      align-items: center;
      padding: 12px 20px;
      gap: 20px;
    }
    .catalog-grid.list .card-footer-actions {
      margin-top: 0;
      padding-top: 0;
      border-top: none;
      width: 240px;
    }

    @media (max-width: 768px) {
      .catalog-grid.list .card-item {
        flex-direction: column;
      }
      .catalog-grid.list .card-thumb-wrap {
        width: 100%;
        aspect-ratio: 16 / 9;
      }
      .catalog-grid.list .card-body {
        flex-direction: column;
        align-items: stretch;
      }
      .catalog-grid.list .card-footer-actions {
        width: 100%;
      }
    }

    /* Empty state */
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      grid-column: 1 / -1;
      background: var(--bg-glass-card);
      border-radius: var(--radius-lg);
      border: 1px dashed var(--border-subtle);
    }
    .empty-icon { font-size: 3rem; margin-bottom: 12px; }
    .empty-title {
      font-family: var(--font-display);
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .empty-desc { color: var(--text-muted); margin-bottom: 20px; }

    /* Preview Modal & Device Simulator */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(16px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .modal-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }

    .modal-window {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      width: 100%;
      max-width: 1320px;
      height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(99, 102, 241, 0.2);
      overflow: hidden;
      transform: scale(0.95) translateY(20px);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .modal-overlay.active .modal-window {
      transform: scale(1) translateY(0);
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 14px 20px;
      background: var(--bg-surface-elevated);
      border-bottom: 1px solid var(--border-subtle);
    }

    .modal-title-info {
      display: flex;
      align-items: center;
      gap: 12px;
      overflow: hidden;
    }
    .modal-item-title {
      font-family: var(--font-display);
      font-size: 1.15rem;
      font-weight: 700;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .device-switcher-bar {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(0, 0, 0, 0.25);
      padding: 4px;
      border-radius: var(--radius-full);
      border: 1px solid var(--border-subtle);
    }

    .device-btn {
      padding: 6px 12px;
      border-radius: var(--radius-full);
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: var(--transition-smooth);
    }
    .device-btn:hover { color: var(--text-primary); }
    .device-btn.active {
      background: var(--accent-indigo);
      color: #ffffff;
    }

    .modal-header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .modal-main-content {
      display: flex;
      flex: 1;
      overflow: hidden;
      position: relative;
    }

    .iframe-viewport-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #000000;
      padding: 0;
      overflow: hidden;
      position: relative;
    }

    .preview-iframe {
      width: 100%;
      height: 100%;
      border: none;
      background: #ffffff;
      transition: width 0.3s ease;
    }
    .preview-iframe.device-laptop { width: 1024px; box-shadow: 0 0 30px rgba(0,0,0,0.8); }
    .preview-iframe.device-tablet { width: 768px; box-shadow: 0 0 30px rgba(0,0,0,0.8); }
    .preview-iframe.device-mobile { width: 375px; box-shadow: 0 0 30px rgba(0,0,0,0.8); }

    .modal-sidebar {
      width: 340px;
      background: var(--bg-surface);
      border-left: 1px solid var(--border-subtle);
      overflow-y: auto;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    @media (max-width: 960px) {
      .modal-sidebar { display: none; }
    }

    .sidebar-section-title {
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 8px;
    }
    .sidebar-desc-text {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    /* Command Palette */
    .palette-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(12px);
      z-index: 2000;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 10vh 20px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    .palette-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }

    .palette-dialog {
      background: var(--bg-surface);
      border: 1px solid var(--border-glow);
      border-radius: var(--radius-lg);
      width: 100%;
      max-width: 640px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(6, 182, 212, 0.25);
      overflow: hidden;
      transform: translateY(-20px);
      transition: transform 0.2s ease;
    }
    .palette-overlay.active .palette-dialog { transform: translateY(0); }

    .palette-search-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border-subtle);
      background: var(--bg-surface-elevated);
    }
    .palette-input {
      flex: 1;
      background: transparent;
      border: none;
      color: var(--text-primary);
      font-family: var(--font-main);
      font-size: 1.1rem;
      outline: none;
    }

    .palette-results {
      max-height: 380px;
      overflow-y: auto;
      padding: 8px;
    }
    .palette-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      border-radius: var(--radius-md);
      color: var(--text-primary);
      text-decoration: none;
      cursor: pointer;
      transition: var(--transition-smooth);
    }
    .palette-item:hover, .palette-item.selected {
      background: var(--bg-glass-hover);
    }
    .palette-item-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .palette-item-title { font-weight: 600; font-size: 0.95rem; }
    .palette-item-type { font-size: 0.75rem; color: var(--text-muted); }

    .palette-footer {
      padding: 10px 20px;
      background: var(--bg-surface-elevated);
      border-top: 1px solid var(--border-subtle);
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    /* Toast */
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 3000;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .toast-msg {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 20px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-glow);
      border-radius: var(--radius-full);
      color: var(--text-primary);
      font-size: 0.875rem;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      animation: slideInToast 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes slideInToast {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    /* Theme menu */
    .theme-menu {
      position: absolute;
      top: 55px;
      right: 0;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 8px;
      display: none;
      flex-direction: column;
      gap: 4px;
      box-shadow: var(--shadow-card);
      z-index: 150;
    }
    .theme-menu.active { display: flex; }
    .theme-option-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 6px;
      background: transparent;
      border: none;
      color: var(--text-primary);
      font-size: 0.85rem;
      cursor: pointer;
      white-space: nowrap;
      transition: var(--transition-smooth);
    }
    .theme-option-btn:hover { background: var(--bg-glass-hover); }

    /* Footer */
    .site-footer {
      margin-top: 80px;
      padding: 40px 20px;
      border-top: 1px solid var(--border-subtle);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    .footer-links {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }
    .footer-link {
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 0.9rem;
      transition: var(--transition-smooth);
    }
    .footer-link:hover { color: var(--accent-cyan); }
    .footer-credit { font-size: 0.85rem; color: var(--text-muted); }
  </style>
</head>
<body>

  <!-- Ambient Animated Particle Canvas -->
  <canvas id="ambient-canvas"></canvas>
  <div class="ambient-blob blob-1"></div>
  <div class="ambient-blob blob-2"></div>
  <div class="ambient-blob blob-3"></div>

  <div class="app-container">

    <!-- Top Sticky Navbar -->
    <header class="navbar" id="top-navbar">
      <a href="#" class="brand">
        <div class="brand-logo">⚡</div>
        <div class="brand-text">OpenPlayground</div>
      </a>

      <div class="nav-actions">
        <!-- Search Trigger -->
        <button class="search-trigger-btn" id="search-palette-trigger" title="Quick Search (Ctrl+K)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <span>Search creations...</span>
          <span class="search-kbd">⌘K</span>
        </button>

        <!-- Sound FX Toggle -->
        <button class="icon-btn active" id="sound-toggle-btn" title="Toggle Synthesized Audio FX">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id="sound-icon-on"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        </button>

        <!-- Theme Menu Button -->
        <div style="position: relative;">
          <button class="icon-btn" id="theme-menu-btn" title="Choose Appearance Theme">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path><circle cx="12" cy="12" r="4"></circle></svg>
          </button>
          <div class="theme-menu" id="theme-dropdown-menu">
            <button class="theme-option-btn" data-set-theme="dark">🌌 Dark Nebula</button>
            <button class="theme-option-btn" data-set-theme="cyberpunk">⚡ Cyberpunk Neon</button>
            <button class="theme-option-btn" data-set-theme="aurora">🌿 Aurora Teal</button>
            <button class="theme-option-btn" data-set-theme="light">☀️ Studio Light</button>
          </div>
        </div>

        <!-- Random Lucky App -->
        <button class="icon-btn" id="random-launch-btn" title="I'm Feeling Lucky (Launch Random App)">
          🎲
        </button>

        <!-- Favorites Counter Pill -->
        <button class="icon-btn" id="fav-filter-btn" title="View Bookmarked Favorites">
          ⭐
          <span class="fav-badge-counter" id="nav-fav-count">0</span>
        </button>
      </div>
    </header>

    <!-- Hero Header -->
    <section class="hero-section" id="hero">
      <div class="hero-badge">
        <span class="hero-badge-dot"></span>
        <span>Zero External Dependencies &bull; 100% Offline Ready</span>
      </div>

      <h1 class="hero-title">
        The Creative Developer's<br />
        <span class="hero-title-gradient">Interactive Universe</span>
      </h1>

      <p class="hero-desc">
        A masterfully crafted suite of single-file browser tools, gamified coding escape rooms, Web Audio synthesizers, and portfolio themes. Pure Vanilla JS & HTML5.
      </p>

      <!-- Stats Row -->
      <div class="hero-stats-row">
        <div class="stat-pill" data-filter-tab="all">
          <span class="stat-icon">⚡</span>
          <div>
            <div class="stat-number" id="stat-total-count">${allItems.length}</div>
            <div class="stat-label">Live HTML Apps</div>
          </div>
        </div>
        <div class="stat-pill" data-filter-tab="quest">
          <span class="stat-icon">🎮</span>
          <div>
            <div class="stat-number">${allItems.filter(x => x.type === 'quest').length}</div>
            <div class="stat-label">Gamified Quests</div>
          </div>
        </div>
        <div class="stat-pill" data-filter-tab="tool">
          <span class="stat-icon">🛠️</span>
          <div>
            <div class="stat-number">${allItems.filter(x => x.type === 'tool').length}</div>
            <div class="stat-label">Developer Tools</div>
          </div>
        </div>
        <div class="stat-pill" data-filter-tab="instrument">
          <span class="stat-icon">🎹</span>
          <div>
            <div class="stat-number">${allItems.filter(x => x.type === 'instrument').length}</div>
            <div class="stat-label">Web Audio Labs</div>
          </div>
        </div>
        <div class="stat-pill" data-filter-tab="quiz">
          <span class="stat-icon">🧠</span>
          <div>
            <div class="stat-number">${allItems.filter(x => x.type === 'quiz').length}</div>
            <div class="stat-label">Code Quizzes</div>
          </div>
        </div>
        <div class="stat-pill" data-filter-tab="theme">
          <span class="stat-icon">🎨</span>
          <div>
            <div class="stat-number">${allItems.filter(x => x.type === 'theme').length}</div>
            <div class="stat-label">Themes & Resumes</div>
          </div>
        </div>
      </div>

      <div class="hero-cta-group">
        <button class="btn-primary" id="explore-quests-btn">
          <span>🎮 Launch Interactive Quests</span>
        </button>
        <button class="btn-secondary" id="explore-tools-btn">
          <span>🛠️ Developer Tools</span>
        </button>
        <button class="btn-secondary" id="explore-instruments-btn">
          <span>🎹 Web Audio Labs</span>
        </button>
      </div>
    </section>

    <!-- Featured Spotlight Carousel -->
    <section class="spotlight-section">
      <div class="section-header">
        <div class="section-title-wrap">
          <span class="section-badge-icon">✨</span>
          <div>
            <h2 class="section-title">Featured Creations</h2>
            <p class="section-subtitle">Hand-picked highlights of interactive mechanics and standalone audio synthesis</p>
          </div>
        </div>
      </div>

      <div class="carousel-container" id="spotlight-carousel">
        <div class="carousel-track" id="carousel-track">
          <!-- Populated by JS -->
        </div>
        <button class="carousel-nav-btn prev" id="carousel-prev" title="Previous Slide">&#10094;</button>
        <button class="carousel-nav-btn next" id="carousel-next" title="Next Slide">&#10095;</button>
        <div class="carousel-indicators" id="carousel-indicators"></div>
      </div>
    </section>

    <!-- Main Catalog Section -->
    <section class="filter-section" id="catalog">
      <!-- Collection Tabs -->
      <div class="tabs-bar" id="collection-tabs">
        <button class="tab-btn active" data-tab="all">
          <span>🌌 All Creations</span>
          <span class="tab-count">${allItems.length}</span>
        </button>
        <button class="tab-btn" data-tab="tool">
          <span>🛠️ Developer Tools</span>
          <span class="tab-count">${allItems.filter(x => x.type === 'tool').length}</span>
        </button>
        <button class="tab-btn" data-tab="quest">
          <span>🎮 Coding Quests</span>
          <span class="tab-count">${allItems.filter(x => x.type === 'quest').length}</span>
        </button>
        <button class="tab-btn" data-tab="instrument">
          <span>🎹 Web Audio Labs</span>
          <span class="tab-count">${allItems.filter(x => x.type === 'instrument').length}</span>
        </button>
        <button class="tab-btn" data-tab="quiz">
          <span>🧠 Code Quizzes</span>
          <span class="tab-count">${allItems.filter(x => x.type === 'quiz').length}</span>
        </button>
        <button class="tab-btn" data-tab="theme">
          <span>🎨 Themes & Resumes</span>
          <span class="tab-count">${allItems.filter(x => x.type === 'theme').length}</span>
        </button>
        <button class="tab-btn" data-tab="favorites">
          <span>⭐ Bookmarked</span>
          <span class="tab-count" id="tab-fav-count">0</span>
        </button>
      </div>

      <!-- Controls Toolbar -->
      <div class="controls-toolbar">
        <div class="search-box-wrap">
          <svg class="search-icon-inside" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" class="main-search-input" id="search-input" placeholder="Search by name, tag, category, or technology..." />
          <button class="search-clear-btn" id="search-clear-btn">&times;</button>
        </div>

        <div class="filter-dropdowns">
          <select class="select-dropdown" id="category-filter-select">
            <option value="all">All Categories</option>
          </select>

          <select class="select-dropdown" id="difficulty-filter-select">
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select class="select-dropdown" id="sort-select">
            <option value="featured">Featured First</option>
            <option value="name-asc">Name (A &rarr; Z)</option>
            <option value="name-desc">Name (Z &rarr; A)</option>
          </select>

          <div class="view-switchers">
            <button class="view-btn active" data-view="grid" title="Standard Grid View">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </button>
            <button class="view-btn" data-view="compact" title="Compact Grid View">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="5" height="5"></rect><rect x="9.5" y="2" width="5" height="5"></rect><rect x="17" y="2" width="5" height="5"></rect><rect x="2" y="9.5" width="5" height="5"></rect><rect x="9.5" y="9.5" width="5" height="5"></rect><rect x="17" y="9.5" width="5" height="5"></rect><rect x="2" y="17" width="5" height="5"></rect><rect x="9.5" y="17" width="5" height="5"></rect><rect x="17" y="17" width="5" height="5"></rect></svg>
            </button>
            <button class="view-btn" data-view="list" title="List View">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Subcategories pill row -->
      <div class="subcats-filter-row" id="subcats-pill-row">
        <!-- Injected by JS -->
      </div>

      <!-- Catalog Grid Output -->
      <div class="catalog-grid" id="catalog-grid">
        <!-- Rendered by JS -->
      </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="footer-links">
        <a href="https://github.com/Aditya8369/OpenPlayGround" class="footer-link" target="_blank" rel="noopener noreferrer">⭐ GitHub Repository</a>
        <a href="#catalog" class="footer-link">Explore Tools</a>
        <a href="#hero" class="footer-link">Back to Top</a>
      </div>
      <div class="footer-credit">
        OpenPlayGround &bull; Curated by <strong>Aditya Mahajan</strong> &bull; Zero External Dependencies
      </div>
    </footer>

  </div>

  <!-- Interactive Device Simulator Modal -->
  <div class="modal-overlay" id="preview-modal">
    <div class="modal-window">
      <div class="modal-header">
        <div class="modal-title-info">
          <span id="modal-app-icon" style="font-size: 1.3rem;">⚡</span>
          <span class="modal-item-title" id="modal-app-title">Application Preview</span>
        </div>

        <!-- Responsive Device Bar -->
        <div class="device-switcher-bar">
          <button class="device-btn active" data-device="full">🖥️ Full</button>
          <button class="device-btn" data-device="laptop">💻 Laptop</button>
          <button class="device-btn" data-device="tablet">📱 Tablet</button>
          <button class="device-btn" data-device="mobile">📲 Mobile</button>
        </div>

        <div class="modal-header-actions">
          <a href="#" target="_blank" class="icon-btn" id="modal-external-link" title="Open in New Tab">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
          <button class="icon-btn" id="modal-close-btn" title="Close Modal (Esc)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>

      <div class="modal-main-content">
        <div class="iframe-viewport-container">
          <iframe id="modal-iframe" class="preview-iframe" src="about:blank" title="App Viewport"></iframe>
        </div>

        <div class="modal-sidebar">
          <div>
            <div class="sidebar-section-title">About this creation</div>
            <p class="sidebar-desc-text" id="modal-desc"></p>
          </div>

          <div>
            <div class="sidebar-section-title">Category & Difficulty</div>
            <div style="display: flex; gap: 8px; align-items: center;" id="modal-meta-pills"></div>
          </div>

          <div>
            <div class="sidebar-section-title">Built With</div>
            <div class="card-tech-chips" id="modal-tech-chips"></div>
          </div>

          <div>
            <div class="sidebar-section-title">Direct File Path</div>
            <code style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-cyan); word-break: break-all;" id="modal-file-path"></code>
          </div>

          <div style="margin-top: auto;">
            <a href="#" target="_blank" class="launch-btn" id="modal-launch-direct-btn" style="width: 100%;">
              🚀 Open Fullscreen App
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Command Palette (Ctrl+K) -->
  <div class="palette-overlay" id="command-palette">
    <div class="palette-dialog">
      <div class="palette-search-wrap">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" class="palette-input" id="palette-input" placeholder="Type a tool, quest, synth or quiz name..." />
      </div>
      <div class="palette-results" id="palette-results">
        <!-- Injected by JS -->
      </div>
      <div class="palette-footer">
        <span>Navigation: <kbd>&uarr;</kbd> <kbd>&darr;</kbd> to navigate &bull; <kbd>&crarr;</kbd> to launch</span>
        <span><kbd>ESC</kbd> to exit</span>
      </div>
    </div>
  </div>

  <!-- Toast Container -->
  <div class="toast-container" id="toast-container"></div>

  <!-- DATA & LOGIC SCRIPT -->
  <script>
    // All items embedded
    const RAW_ITEMS = ${JSON.stringify(allItems, null, 2)};

    // State
    const state = {
      items: RAW_ITEMS,
      activeTab: 'all',
      searchQuery: '',
      activeCategory: 'all',
      activeDifficulty: 'all',
      sortBy: 'featured',
      viewMode: 'grid',
      favorites: JSON.parse(localStorage.getItem('openplayground_favs') || '[]'),
      soundEnabled: localStorage.getItem('openplayground_sound') !== 'false'
    };

    // =========================================================================
    // Web Audio Synthesizer SFX
    // =========================================================================
    class SoundEngine {
      constructor() {
        this.ctx = null;
      }
      init() {
        if (!this.ctx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) this.ctx = new AudioContext();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      }
      playClick() {
        if (!state.soundEnabled) return;
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
      }
      playPop() {
        if (!state.soundEnabled) return;
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
      }
      playChime() {
        if (!state.soundEnabled) return;
        this.init();
        if (!this.ctx) return;
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.04);
          gain.gain.setValueAtTime(0.08, this.ctx.currentTime + idx * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.04 + 0.3);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(this.ctx.currentTime + idx * 0.04);
          osc.stop(this.ctx.currentTime + idx * 0.04 + 0.35);
        });
      }
    }
    const sound = new SoundEngine();

    // =========================================================================
    // Ambient Particle Canvas Animation
    // =========================================================================
    function initAmbientCanvas() {
      const canvas = document.getElementById('ambient-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);

      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });

      const particles = [];
      const count = Math.min(width > 768 ? 45 : 25, 50);

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          hue: Math.random() > 0.5 ? 190 : 260
        });
      }

      let mouseX = width / 2;
      let mouseY = height / 2;
      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Connect lines between nearby particles
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              ctx.strokeStyle = \`rgba(99, 102, 241, \${(1 - dist / 120) * 0.18})\`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }

          // Draw particle dot
          ctx.fillStyle = \`hsla(\${p.hue}, 80%, 70%, 0.4)\`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        requestAnimationFrame(animate);
      }
      animate();
    }

    // =========================================================================
    // Spotlight Carousel
    // =========================================================================
    let currentSlide = 0;
    let carouselTimer = null;
    const featuredItems = state.items.filter(item => item.featured);

    function initSpotlightCarousel() {
      const track = document.getElementById('carousel-track');
      const indicators = document.getElementById('carousel-indicators');
      if (!track || !indicators || featuredItems.length === 0) return;

      track.innerHTML = featuredItems.map((item, idx) => \`
        <div class="carousel-slide">
          <div class="slide-media">
            <img src="\${item.thumbnail}" alt="\${item.name}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'250\\' fill=\\'%23111\\'><rect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%230b1021\\'/><text x=\\'50%25\\' y=\\'50%25\\' fill=\\'%236366f1\\' font-size=\\'32\\' font-family=\\'sans-serif\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\'>\${encodeURIComponent(item.typeIcon)} \${encodeURIComponent(item.name)}</text></svg>'" />
          </div>
          <div class="slide-content">
            <div class="slide-badge-row">
              <span class="type-badge \${item.type}">\${item.typeIcon} \${item.typeName}</span>
              <span class="diff-badge \${item.difficulty}">\${item.difficulty}</span>
              <span style="font-size: 0.75rem; color: var(--text-muted);">\${item.categoryName}</span>
            </div>
            <h3 class="slide-title">\${item.name}</h3>
            <p class="slide-desc">\${item.shortDescription}</p>
            <div class="slide-tags">
              \${item.techStack.map(tech => \`<span class="tag-chip">\${tech}</span>\`).join('')}
            </div>
            <div class="slide-actions">
              <a href="\${item.url}" target="_blank" class="launch-btn" onclick="sound.playChime()">
                🚀 Launch Experience
              </a>
              <button class="preview-modal-btn" onclick="openPreviewModal('\${item.id}')">
                👁️ Live Simulator
              </button>
            </div>
          </div>
        </div>
      \`).join('');

      indicators.innerHTML = featuredItems.map((_, idx) => \`
        <div class="indicator-dot \${idx === 0 ? 'active' : ''}" onclick="goToSlide(\${idx})"></div>
      \`).join('');

      document.getElementById('carousel-prev').onclick = () => {
        sound.playClick();
        goToSlide((currentSlide - 1 + featuredItems.length) % featuredItems.length);
      };
      document.getElementById('carousel-next').onclick = () => {
        sound.playClick();
        goToSlide((currentSlide + 1) % featuredItems.length);
      };

      startCarouselAutoRotate();
      const container = document.getElementById('spotlight-carousel');
      container.addEventListener('mouseenter', () => clearInterval(carouselTimer));
      container.addEventListener('mouseleave', () => startCarouselAutoRotate());
    }

    function goToSlide(index) {
      currentSlide = index;
      const track = document.getElementById('carousel-track');
      if (track) track.style.transform = \`translateX(-\${currentSlide * 100}%)\`;
      const dots = document.querySelectorAll('.indicator-dot');
      dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    }

    function startCarouselAutoRotate() {
      clearInterval(carouselTimer);
      carouselTimer = setInterval(() => {
        goToSlide((currentSlide + 1) % featuredItems.length);
      }, 6000);
    }

    // =========================================================================
    // Catalog Filtering & Rendering
    // =========================================================================
    function getFilteredItems() {
      return state.items.filter(item => {
        // Tab filter
        if (state.activeTab === 'favorites') {
          if (!state.favorites.includes(item.id)) return false;
        } else if (state.activeTab !== 'all') {
          if (item.type !== state.activeTab) return false;
        }

        // Category filter
        if (state.activeCategory !== 'all' && item.category !== state.activeCategory) {
          return false;
        }

        // Difficulty filter
        if (state.activeDifficulty !== 'all' && item.difficulty !== state.activeDifficulty) {
          return false;
        }

        // Search Query
        if (state.searchQuery.trim()) {
          const q = state.searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchDesc = item.shortDescription.toLowerCase().includes(q);
          const matchCat = item.categoryName.toLowerCase().includes(q);
          const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
          const matchTech = item.techStack.some(t => t.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchCat && !matchTags && !matchTech) {
            return false;
          }
        }

        return true;
      }).sort((a, b) => {
        if (state.sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (state.sortBy === 'name-desc') return b.name.localeCompare(a.name);
        if (state.sortBy === 'featured') {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
        }
        return 0;
      });
    }

    function renderSubcategoriesPills() {
      const container = document.getElementById('subcats-pill-row');
      const select = document.getElementById('category-filter-select');
      if (!container || !select) return;

      // Extract unique categories for active tab
      const availableItems = state.items.filter(item => {
        if (state.activeTab === 'favorites') return state.favorites.includes(item.id);
        if (state.activeTab !== 'all') return item.type === state.activeTab;
        return true;
      });

      const catMap = new Map();
      availableItems.forEach(i => {
        if (!catMap.has(i.category)) {
          catMap.set(i.category, { id: i.category, name: i.categoryName, icon: i.categoryIcon, count: 0 });
        }
        catMap.get(i.category).count++;
      });

      const categories = Array.from(catMap.values());

      // Update select dropdown
      select.innerHTML = '<option value="all">All Categories</option>' + categories.map(c => \`
        <option value="\${c.id}" \${state.activeCategory === c.id ? 'selected' : ''}>\${c.icon} \${c.name} (\${c.count})</option>
      \`).join('');

      // Update pills
      container.innerHTML = \`
        <button class="subcat-pill \${state.activeCategory === 'all' ? 'active' : ''}" onclick="setCategory('all')">
          🌟 All (\${availableItems.length})
        </button>
      \` + categories.map(c => \`
        <button class="subcat-pill \${state.activeCategory === c.id ? 'active' : ''}" onclick="setCategory('\${c.id}')">
          \${c.icon} \${c.name} (\${c.count})
        </button>
      \`).join('');
    }

    function renderCatalog() {
      const grid = document.getElementById('catalog-grid');
      if (!grid) return;

      const filtered = getFilteredItems();

      // Update favorite counts in UI
      const favCount = state.favorites.length;
      document.getElementById('nav-fav-count').textContent = favCount;
      document.getElementById('tab-fav-count').textContent = favCount;

      if (filtered.length === 0) {
        grid.innerHTML = \`
          <div class="empty-state">
            <div class="empty-icon">🔍</div>
            <h3 class="empty-title">No creations matched your filters</h3>
            <p class="empty-desc">Try clearing your search query or selecting a different category tab.</p>
            <button class="btn-secondary" onclick="resetFilters()">Reset All Filters</button>
          </div>
        \`;
        return;
      }

      grid.innerHTML = filtered.map(item => {
        const isFav = state.favorites.includes(item.id);
        return \`
          <div class="card-item" data-id="\${item.id}">
            <div class="card-thumb-wrap">
              <img class="card-thumb-img" src="\${item.thumbnail}" alt="\${item.name}" loading="lazy" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'225\\' fill=\\'%23111\\'><rect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%230f172a\\'/><text x=\\'50%25\\' y=\\'50%25\\' fill=\\'%2338bdf8\\' font-size=\\'26\\' font-family=\\'sans-serif\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\'>\${encodeURIComponent(item.typeIcon)} \${encodeURIComponent(item.name)}</text></svg>'" />
              
              <div class="card-floating-badges">
                <span class="live-indicator-pill">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background: #34d399; box-shadow: 0 0 6px #34d399;"></span>
                  LIVE APP
                </span>

                <button class="star-bookmark-btn \${isFav ? 'favorited' : ''}" onclick="toggleFavorite('\${item.id}', event)" title="\${isFav ? 'Remove from favorites' : 'Add to favorites'}">
                  ★
                </button>
              </div>
            </div>

            <div class="card-body">
              <div class="card-meta-row">
                <span class="type-badge \${item.type}">\${item.typeIcon} \${item.typeName}</span>
                <span class="diff-badge \${item.difficulty}">\${item.difficulty}</span>
              </div>

              <h3 class="card-title">\${item.name}</h3>
              <p class="card-desc">\${item.shortDescription}</p>

              <div class="card-tech-chips">
                \${item.techStack.slice(0, 4).map(tech => \`<span class="tech-mini-chip">\${tech}</span>\`).join('')}
              </div>

              <div class="card-footer-actions">
                <a href="\${item.url}" target="_blank" class="launch-btn" onclick="sound.playChime()">
                  🚀 Launch
                </a>
                <button class="preview-modal-btn" onclick="openPreviewModal('\${item.id}')">
                  👁️ Simulator
                </button>
              </div>
            </div>
          </div>
        \`;
      }).join('');
    }

    function setTab(tab) {
      sound.playClick();
      state.activeTab = tab;
      state.activeCategory = 'all';
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
      });
      renderSubcategoriesPills();
      renderCatalog();
    }

    function setCategory(cat) {
      sound.playPop();
      state.activeCategory = cat;
      document.getElementById('category-filter-select').value = cat;
      renderSubcategoriesPills();
      renderCatalog();
    }

    function toggleFavorite(id, e) {
      if (e) e.stopPropagation();
      sound.playPop();
      const idx = state.favorites.indexOf(id);
      if (idx === -1) {
        state.favorites.push(id);
        showToast('⭐ Added to your bookmarked favorites!');
      } else {
        state.favorites.splice(idx, 1);
        showToast('Removed from favorites.');
      }
      localStorage.setItem('openplayground_favs', JSON.stringify(state.favorites));
      renderCatalog();
    }

    function resetFilters() {
      state.searchQuery = '';
      state.activeCategory = 'all';
      state.activeDifficulty = 'all';
      document.getElementById('search-input').value = '';
      document.getElementById('search-clear-btn').style.display = 'none';
      document.getElementById('category-filter-select').value = 'all';
      document.getElementById('difficulty-filter-select').value = 'all';
      renderSubcategoriesPills();
      renderCatalog();
    }

    // =========================================================================
    // Device Simulator Preview Modal
    // =========================================================================
    function openPreviewModal(id) {
      const item = state.items.find(x => x.id === id);
      if (!item) return;

      sound.playChime();
      const modal = document.getElementById('preview-modal');
      const iframe = document.getElementById('modal-iframe');

      document.getElementById('modal-app-icon').textContent = item.typeIcon;
      document.getElementById('modal-app-title').textContent = item.name;
      document.getElementById('modal-desc').textContent = item.shortDescription;
      document.getElementById('modal-file-path').textContent = item.url;
      document.getElementById('modal-external-link').href = item.url;
      document.getElementById('modal-launch-direct-btn').href = item.url;

      document.getElementById('modal-meta-pills').innerHTML = \`
        <span class="type-badge \${item.type}">\${item.typeIcon} \${item.typeName}</span>
        <span class="diff-badge \${item.difficulty}">\${item.difficulty}</span>
      \`;

      document.getElementById('modal-tech-chips').innerHTML = item.techStack.map(t => \`
        <span class="tech-mini-chip">\${t}</span>
      \`).join('');

      iframe.src = item.url;
      modal.classList.add('active');
    }

    function closePreviewModal() {
      sound.playClick();
      const modal = document.getElementById('preview-modal');
      const iframe = document.getElementById('modal-iframe');
      modal.classList.remove('active');
      setTimeout(() => { iframe.src = 'about:blank'; }, 200);
    }

    // =========================================================================
    // Command Palette (Ctrl+K)
    // =========================================================================
    function openCommandPalette() {
      sound.playPop();
      const overlay = document.getElementById('command-palette');
      const input = document.getElementById('palette-input');
      overlay.classList.add('active');
      input.value = '';
      input.focus();
      renderPaletteResults('');
    }

    function closeCommandPalette() {
      document.getElementById('command-palette').classList.remove('active');
    }

    function renderPaletteResults(query) {
      const results = document.getElementById('palette-results');
      const q = query.toLowerCase().trim();
      const matched = state.items.filter(item => {
        return !q || item.name.toLowerCase().includes(q) || item.tags.some(t => t.toLowerCase().includes(q));
      }).slice(0, 10);

      if (matched.length === 0) {
        results.innerHTML = '<div style="padding: 16px; color: var(--text-muted); text-align: center;">No matches found</div>';
        return;
      }

      results.innerHTML = matched.map((item, idx) => \`
        <div class="palette-item \${idx === 0 ? 'selected' : ''}" onclick="window.open('\${item.url}', '_blank'); closeCommandPalette();">
          <div class="palette-item-left">
            <span>\${item.typeIcon}</span>
            <div>
              <div class="palette-item-title">\${item.name}</div>
              <div class="palette-item-type">\${item.categoryName} &bull; \${item.typeName}</div>
            </div>
          </div>
          <span style="font-size: 0.75rem; color: var(--accent-cyan); font-family: var(--font-mono);">\${item.url} &rarr;</span>
        </div>
      \`).join('');
    }

    // =========================================================================
    // Toast Notification
    // =========================================================================
    function showToast(msg) {
      const container = document.getElementById('toast-container');
      if (!container) return;
      const toast = document.createElement('div');
      toast.className = 'toast-msg';
      toast.innerHTML = \`<span>✨</span><span>\${msg}</span>\`;
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }

    // =========================================================================
    // Init & Event Listeners
    // =========================================================================
    document.addEventListener('DOMContentLoaded', () => {
      initAmbientCanvas();
      initSpotlightCarousel();
      renderSubcategoriesPills();
      renderCatalog();

      // Tab bar clicks
      document.getElementById('collection-tabs').addEventListener('click', (e) => {
        const btn = e.target.closest('.tab-btn');
        if (btn) setTab(btn.dataset.tab);
      });

      // Stat pills in hero
      document.querySelectorAll('.stat-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          setTab(pill.dataset.filterTab);
          document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
        });
      });

      // Hero CTA buttons
      document.getElementById('explore-quests-btn').onclick = () => {
        setTab('quest');
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
      };
      document.getElementById('explore-tools-btn').onclick = () => {
        setTab('tool');
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
      };
      document.getElementById('explore-instruments-btn').onclick = () => {
        setTab('instrument');
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
      };

      // Search input
      const searchInput = document.getElementById('search-input');
      const clearBtn = document.getElementById('search-clear-btn');
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        clearBtn.style.display = state.searchQuery ? 'block' : 'none';
        renderCatalog();
      });
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        state.searchQuery = '';
        clearBtn.style.display = 'none';
        renderCatalog();
      });

      // Category select
      document.getElementById('category-filter-select').addEventListener('change', (e) => {
        setCategory(e.target.value);
      });

      // Difficulty select
      document.getElementById('difficulty-filter-select').addEventListener('change', (e) => {
        sound.playPop();
        state.activeDifficulty = e.target.value;
        renderCatalog();
      });

      // Sort select
      document.getElementById('sort-select').addEventListener('change', (e) => {
        sound.playPop();
        state.sortBy = e.target.value;
        renderCatalog();
      });

      // View switcher
      document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          sound.playClick();
          document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const view = btn.dataset.view;
          state.viewMode = view;
          const grid = document.getElementById('catalog-grid');
          grid.className = 'catalog-grid' + (view !== 'grid' ? ' ' + view : '');
        });
      });

      // Theme toggle menu
      const themeBtn = document.getElementById('theme-menu-btn');
      const themeMenu = document.getElementById('theme-dropdown-menu');
      themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.playClick();
        themeMenu.classList.toggle('active');
      });
      document.addEventListener('click', () => themeMenu.classList.remove('active'));

      document.querySelectorAll('.theme-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const theme = btn.dataset.setTheme;
          document.documentElement.setAttribute('data-theme', theme);
          localStorage.setItem('openplayground_theme', theme);
          showToast('Theme set to ' + btn.textContent);
        });
      });

      const savedTheme = localStorage.getItem('openplayground_theme');
      if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

      // Sound toggle
      const soundBtn = document.getElementById('sound-toggle-btn');
      soundBtn.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        soundBtn.classList.toggle('active', state.soundEnabled);
        localStorage.setItem('openplayground_sound', state.soundEnabled);
        showToast(state.soundEnabled ? '🔊 Sound effects enabled' : '🔇 Sound effects muted');
      });

      // Random Lucky App launcher
      document.getElementById('random-launch-btn').addEventListener('click', () => {
        const randomItem = state.items[Math.floor(Math.random() * state.items.length)];
        showToast('🎲 Launching ' + randomItem.name + '!');
        setTimeout(() => openPreviewModal(randomItem.id), 300);
      });

      // Favorites button in nav
      document.getElementById('fav-filter-btn').addEventListener('click', () => {
        setTab('favorites');
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
      });

      // Modal close & device switcher
      document.getElementById('modal-close-btn').onclick = closePreviewModal;
      document.getElementById('preview-modal').addEventListener('click', (e) => {
        if (e.target.id === 'preview-modal') closePreviewModal();
      });

      document.querySelectorAll('.device-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          sound.playClick();
          document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const device = btn.dataset.device;
          const iframe = document.getElementById('modal-iframe');
          iframe.className = 'preview-iframe' + (device !== 'full' ? ' device-' + device : '');
        });
      });

      // Command Palette (Ctrl+K)
      document.getElementById('search-palette-trigger').onclick = openCommandPalette;
      document.getElementById('command-palette').addEventListener('click', (e) => {
        if (e.target.id === 'command-palette') closeCommandPalette();
      });
      document.getElementById('palette-input').addEventListener('input', (e) => {
        renderPaletteResults(e.target.value);
      });

      // Global keyboard shortcuts
      window.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          openCommandPalette();
        }
        if (e.key === 'Escape') {
          closePreviewModal();
          closeCommandPalette();
        }
      });
    });
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(rootDir, 'index.html'), htmlContent, 'utf-8');
console.log('Successfully generated master index.html at root!');
