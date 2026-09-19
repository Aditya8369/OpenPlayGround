# 🚀 OpenPlayGround

A curated, community-driven hub for open-source mini-projects, games, tools, and interactive web experiments.

[![GitHub license](https://img.shields.io/github/license/Aditya8369/OpenPlayGround?style=flat-square)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Aditya8369/OpenPlayGround?style=flat-square)](https://github.com/Aditya8369/OpenPlayGround/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Aditya8369/OpenPlayGround?style=flat-square)](https://github.com/Aditya8369/OpenPlayGround/network)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

---

## 📌 Problem Statement
Beginner developers often struggle to find low-friction platforms for their first open-source contributions, resulting in mini-projects and creative prototypes remaining isolated in local machines or hidden repositories without visibility.

## 💡 Solution
**OpenPlayGround** provides a frictionless platform where developers can showcase their standalone web projects. By adding project assets and a single entry into a JSON manifest, new experiments are instantly indexed and rendered into an interactive, filterable catalog.

---

## ✨ Features
- **Instant Discovery:** Search, sort, and filter mini-projects by tags and categories (Games, Utilities, Productivity, Fun).
- **Interactive Showcase:** Test and play mini-apps directly in the browser without installing dependencies.
- **Zero-Friction Contribution:** Standardized architecture designed specifically for first-time open-source contributors.
- **Lightweight & Fast:** Pure vanilla implementation with zero build-tool bloat.

---

## 🛠️ Technology Stack
- **Core:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Data & Configuration:** JSON (`project-manifest.json`)
- **Icons & Styling:** RemixIcon, Modern CSS Variables
- **Hosting:** GitHub Pages / Vercel

---

## 📁 Repository Structure

```text
OpenPlayGround/
├── index.html              # Main catalog interface
├── style.css               # Global application styles
├── script.js               # Manifest loader, search, and filter logic
├── project-manifest.json   # Registry of all community projects
└── projects/               # Community project directory
    ├── project-one/
    │   ├── index.html
    │   ├── style.css
    │   └── script.js
    └── project-two/
