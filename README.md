# 🪐 OpenPlayGround

> **One tool. One file. Open and use.**

A curated suite of developer tools, gamified learning quests, browser-synthesized musical instruments, interactive quizzes, ATS resume themes, and portfolio templates — each crafted as a **single, self-contained HTML file**.

Zero build steps. Zero runtime dependencies. Zero trackers. Completely offline-first.

---

## 🌟 Key Highlights

- **Single-File Architecture** — Every tool, quest, instrument, and quiz lives in its own standalone `.html` file. Double-click to open in any modern browser.
- **Offline-First by Design** — Operates entirely in client-side memory using modern Web Platform APIs (Canvas, Web Audio, LocalStorage, SVG).
- **Zero Dependencies** — No bloated node runtime required for end-users. Fast, lightweight, and accessible anywhere.
- **Dark & Light Modes** — Built-in Linear/Raycast-inspired design systems with responsive layouts.

---

## 📑 Table of Contents

- [🛠️ Developer Tools](#️-developer-tools)
- [🎮 Interactive Quests](#-interactive-quests)
- [🎹 Web Audio Instruments](#-web-audio-instruments)
- [🧠 Interactive Quizzes](#-interactive-quizzes)
- [📄 Resume & Portfolio Themes](#-resume--portfolio-themes)
- [🚀 Getting Started](#-getting-started)
- [📂 Project Structure](#-project-structure)
- [⚙️ Development & Scripts](#️-development--scripts)
- [📜 License](#-license)

---

## 🛠️ Developer Tools

Standalone browser utilities for design, SEO, formatting, and day-to-day software development.

| Tool | Category | Difficulty | Highlights & Features |
| :--- | :--- | :--- | :--- |
| [**A11y Contrast Grid Generator**](tools/a11y-contrast-grid.html) | Accessibility | Medium | Full color palette accessibility matrix comparing all background and foreground combinations against WCAG 2.1 guidelines (AA/AAA). Supports Tailwind, CSS vars, SCSS, JSON export. |
| [**Advanced Robots.txt Generator**](tools/advanced-robots-txt-generator.html) | Web & SEO | Easy | Visual rules builder for multi-user-agent crawler configurations, Allow/Disallow directives, crawl-delay, host rules, and XML sitemaps with live code preview. |
| [**Animation Cubic-Bezier Editor**](tools/animation-cubic-bezier-editor.html) | CSS | Easy | Interactive visual curve editor with draggable control points, standard presets (`ease`, `ease-in-out`, etc.), and live animation comparison box. |
| [**Bash Sandbox**](tools/bash-commands-sandbox.html) | Utilities | Medium | Client-side simulated Linux/Bash terminal with virtual filesystem, persistent history, tab completion, and core command emulation (`ls`, `cd`, `mkdir`, `cat`, `echo`, `pwd`). |
| [**Commit Message & Range Cleaner**](tools/git-commit-range-cleaner.html) | Utilities | Medium | Visual interactive rebase planner (`git-rebase-todo` generator). Lints commit messages against Conventional Commits specs with instant autofix suggestions. |
| [**CSS Easing Visualizer**](tools/css-easing-visualizer.html) | CSS | Medium | Side-by-side easing curve comparison on a synchronized SVG graph and real-time multi-ball animation race track powered by the Web Animations API. |
| [**CSS Unit Converter**](tools/css-unit-converter.html) | CSS | Medium | Real-time bi-directional converter across `px`, `rem`, `em`, `vw`, `vh`, `%`, and `pt` with configurable base font size and viewport context. |
| [**Curl Builder**](tools/curl-builder.html) | JSON & API | Medium | Construct REST API cURL commands with URL query params, authentication headers (Bearer / Basic), form data, JSON payloads, and multipart file uploads. |
| [**Favicon Generator**](tools/favicon-generator.html) | Utilities | Easy | Client-side favicon generation supporting 7 dimensions (16px to 512px) with auto-crop canvas preview, HTML meta snippet generation, and 1-click ZIP export. |
| [**GitHub Profile README Generator**](tools/github-profile-readme-generator.html) | Utilities | Medium | Live Markdown builder with bio templates, tech stack skill badges, social link icons, and live GitHub stats fetching. |
| [**Sitemap Generator**](tools/sitemap-generator.html) | Web & SEO | Medium | Generate search engine-compliant `sitemap.xml` files with single/bulk URL import, `changefreq`, `priority`, and `lastmod` metadata. |

---

## 🎮 Interactive Quests

Gamified, story-driven browser games designed to teach core engineering principles through live-evaluated code execution and simulations.

| Quest | Category | Difficulty | Concept & Mechanics |
| :--- | :--- | :--- | :--- |
| [**Abyssal Current**](quests/abyssal-current.html) | CSS Fundamentals | Hard | Deep-sea bioluminescence simulator teaching CSS `@keyframes`, timeline buoys, animation timing, and procedural SVG marine creatures under a draining oxygen gauge. |
| [**Accessibility Audit Quest**](quests/accessibility-audit-quest.html) | General Dev | Medium | Hands-on accessibility auditor simulator. Diagnose and resolve ARIA errors, contrast failures, missing alternative text, and heading hierarchy bugs. |
| [**Branch Navigator**](quests/branch-navigator.html) | Git & Version Control | Easy | Visual commit graph time-traveler. Execute `git log`, `git branch`, and `git checkout` in a terminal simulator to navigate git branches. |
| [**Closure Escape Room**](quests/closure-escape-room.html) | JS Fundamentals | Medium | 10 progressive puzzle rooms unlocked by solving closures, lexical scope chains, IIFE data encapsulation, and private variables. |
| [**CSS Grid Quest**](quests/css-grid-quest.html) | CSS Fundamentals | Easy | 6 interactive visual grid challenges covering grid tracks, `fr` units, `grid-template-areas`, `gap`, and responsive auto-placement. |
| [**Flexbox Frenzy: The Alignment Heist**](quests/flexbox-frenzy.html) | CSS Fundamentals | Hard | Crack bank vaults by writing real Flexbox container CSS. Elements are measured live using `getBoundingClientRect()` and scored on minimal property count (CSS Golf). |
| [**Memory Heap Detective**](quests/memory-heap-detective.html) | JS Fundamentals | Hard | Interactive V8 heap snapshot visualizer. Trace GC roots, detached DOM subtrees, dangling event listeners, and trigger manual mark-and-sweep GC cycles. |
| [**Regex CSS Golf**](quests/regex-css-golf.html) | CSS Fundamentals | Medium | Code golf puzzle engine: write the shortest valid CSS selector matching only target DOM elements using combinators, pseudo-classes, and attribute filters. |
| [**Strata: The Lost Commits**](quests/the-lost-commits.html) | Git & Version Control | Medium | Archaeological commit history dig. Map `git rebase -i` actions (Pick, Reword, Squash, Fixup, Drop) to excavation tools to restore archaeological logs. |
| [**The Merge Conflict from Hell**](quests/merge-conflict-from-hell.html) | Git & Version Control | Medium | Terminal horror escape room. Resolve multi-hunk merge conflicts, fix detached HEAD states, and force push under a draining sanity meter with synthetic Web Audio SFX. |
| [**The Reconciler**](quests/the-reconciler.html) | React Fundamentals | Hard | Victorian manor horror powered by a live fiber-tree diagram. Fix one-way prop flow, unmount leaks, and reconciliation key collisions floor by floor. |
| [**XSS Defender**](quests/xss-defender.html) | JS Fundamentals | Medium | Security simulator game. Defend applications against Reflected XSS, DOM-based injections, HTML entity bypasses, and configure strict Content Security Policies (CSP). |

---

## 🎹 Web Audio Instruments

Playable musical instruments and synthesizers built entirely using the native browser **Web Audio API** and HTML5 Canvas. No audio samples or plugins required.

| Instrument | Focus | Key Features |
| :--- | :--- | :--- |
| [**Euclidean Polyrhythm Sequencer**](instruments/euclidean-polyrhythm-sequencer.html) | Rhythm & Percussion | Concentric glowing ring interface utilizing Euclid's algorithm to generate organic polyrhythms with a lookahead scheduler and real-time canvas visualizer. |
| [**Glassmorphic Wavetable Synthesizer**](instruments/glassmorphic-wavetable-synth.html) | Melody & Synthesis | Dual-oscillator wavetable synthesizer with custom periodic waveform drawing on frosted glass, dynamic ADSR envelope visualizer, and a multi-stage ambient reverb engine. |
| [**Interactive Fretboard & Chord Explorer**](instruments/interactive-fretboard-chord-explorer.html) | Chords & Harmony | Skeuomorphic dark-wood guitar fretboard with chord calculation engine and physical-modeling acoustic string synthesis triggered by cursor swipe strumming. |
| [**Interactive Theory Sandbox**](instruments/interactive-theory-sandbox.html) | Notation & Theory | Bi-directional bridge between the standard grand staff notation and visual piano keys with dynamic chord recognition and interval analysis. |
| [**Neon Launchpad Matrix**](instruments/neon-launchpad-matrix.html) | Melody & Performance | 8x8 neon neumorphic pad matrix mapped to a harmonious pentatonic scale with tactile visual ripples and zero-latency audio synthesis. |

---

## 🧠 Interactive Quizzes

Rapid-fire, browser-based quiz challenges to test your core engineering knowledge with instant feedback and scorecards.

- **[Closure Chronicles](quizzes/closure-chronicles.html)** — 10-level interactive code challenge on JavaScript lexical scope, hoisting, closures, and modules.
- **[Command Line Craze](quizzes/command-line-craze.html)** — 10-level retro CRT terminal quiz covering essential Bash and shell commands.
- **[CSS Grid Quest](quizzes/css-grid-quest.html)** — Interactive quiz testing CSS grid column definitions, fractional units, and layout properties.
- **[Dev Escape Room](quizzes/dev_escape_room.html)** — Multi-room challenge testing HTML, CSS, JavaScript, Git, and REST API troubleshooting.
- **[Event Loop Arena](quizzes/event-loop-arena.html)** — 10-level async execution challenge predicting output order between `setTimeout`, microtasks, Promises, and `async/await`.
- **[Git Commands Guru](quizzes/git-commands-guru.html)** — Retro terminal quiz covering branching, staging, stashing, and remote syncing.
- **[HTTP Status Code Quiz](quizzes/http-status-code-quiz.html)** — Rapid scenario-based quiz testing 1xx, 2xx, 3xx, 4xx, and 5xx status codes.
- **[JS Type Coercion Trivia](quizzes/js-type-coercion-trivia.html)** — Test your understanding of JavaScript's tricky implicit/explicit type coercion behaviors, `NaN`, and equality rules.
- **[The Branch That Wouldn't Die](quizzes/branch-quest.html)** — 8-level branching quiz on merge conflicts, fast-forwarding, branch renaming, and rebasing.

---

## 📄 Resume & Portfolio Themes

Generate production-ready personal websites and ATS-compliant resumes from a single [`data/profile.json`](data/profile.json) file.

### Resume Themes (`resume/`)
- **Classic** — Single-column, minimalist, ATS-compliant, zero JavaScript, A4 print-ready layout using clean system typography.
- **Cosmic** — Two-column modern theme with a dark starry aesthetic, luminous highlights, and monospace typography.
- **Cyber** — High-contrast, retro-futuristic dark mode resume with neon accents.
- **Herbarium** — Warm linen paper background with editorial serif type pairing and dusty plum accent tones.
- **Monotone** — Clean, distraction-free monochrome styling with optimal whitespace balance.
- **Opus 5** — Two-column card design with muted teal accents, brass honors, and print optimization.

### Portfolio Themes (`portfolio/`)
- **Developer** — Tech-forward developer portfolio with interactive project cards, skills matrices, timeline displays, and testimonials.
- **Desert** — Warm, golden-sand color palette with bronze accents and modern typography.
- **Fable** — Immersive dark developer showcase with rich visual hierarchy.
- **Pastel** — Soft, modern pastel gradient aesthetic with minimal cards.
- **Retro** — 90s CRT-inspired desktop interface and operating system theme.
- **Space** — Futuristic dark interface with animated starfields and monospace typography.

---

## 🚀 Getting Started

### 1. Direct Browser Usage (Zero Install)
You can directly open any `.html` file inside the repository in your favorite browser:
- Double-click [`index.html`](index.html) to launch the full portal.
- Or open any tool directly from the `tools/`, `quests/`, `instruments/`, or `quizzes/` directories.

### 2. Local Development
To customize or build templates locally:

```bash
# Clone the repository
git clone https://github.com/Aditya8369/OpenPlayGround.git
cd OpenPlayGround

# Install dev dependencies (Handlebars, Prettier)
npm install

# Build index.html from data and templates
npm run build

# Generate resume and portfolio HTML files from data/profile.json
npm run themes

# Validate all assets, JSON schemas, and files
npm run validate
```
Note- For public deployment, click [https://reliable-lokum-c2dc61.netlify.app/](url)
---

## 📂 Project Structure

```text
OpenPlayGround/
├── data/                       # JSON registries & profile configurations
│   ├── instruments.json        # Audio instruments metadata
│   ├── profile.json            # Resume & portfolio source data
│   ├── quests.json             # Interactive quests registry
│   ├── quizzes.json            # Quizzes metadata
│   ├── themes.json             # Theme definitions
│   └── tools.json              # Developer tools registry
├── functions/                  # Serverless proxy endpoints (Cloudflare/Vercel)
│   └── api/
│       └── fetch.js            # CORS-safe API proxy
├── instruments/                # Web Audio standalone instrument HTML files
├── portfolio/                  # Portfolio templates (.hbs & compiled .html)
├── quests/                     # Interactive quest game HTML files
├── resume/                     # Resume templates (.hbs & compiled .html)
├── scripts/                    # Automation and build scripts
│   ├── build.js                # Core index.html generator
│   ├── theme-gen.js            # Handlebars theme compiler
│   ├── validate.js             # Asset & structure validator
│   ├── sort-norm.js            # JSON schema sorter and normalizer
│   └── index-template.txt      # Main portal template
├── tools/                      # Single-file developer tools
├── index.html                  # Main portal entrypoint
└── package.json                # Project scripts & metadata
```

---

## ⚙️ Development & Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| **Build Portal** | `npm run build` | Compiles `data/*.json` and `scripts/index-template.txt` into `index.html`. |
| **Compile Themes**| `npm run themes`| Renders Handlebars templates in `resume/` & `portfolio/` using `data/profile.json`. |
| **Validate** | `npm run validate` | Audits all JSON metadata entries against real files on disk. |
| **Format** | `npm run format` | Runs Prettier on standalone HTML utilities. |
| **Sort JSON** | `npm run sort` | Normalizes and alphabetically sorts all registry data files. |

---

## 📜 License

This project is licensed under the [Unlicense](LICENSE) (Public Domain Dedication) — free to use, modify, distribute, and embed for any purpose without restrictions.
