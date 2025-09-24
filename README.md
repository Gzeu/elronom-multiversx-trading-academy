# 🎮 ELRONOM — The MultiversX Trading Academy

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![MultiversX](https://img.shields.io/badge/Blockchain-MultiversX-blue.svg)](#)
[![Status](https://img.shields.io/badge/Status-Planning-orange.svg)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](#)
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](#)
[![Rust](https://img.shields.io/badge/Rust-000000?logo=rust&logoColor=white)](#)

> Engage, learn, and level up: a gamified educational platform on MultiversX (EGLD) with real utility NFTs, quests, and an AI mentor.

## 📊 Overview

ELRONOM is an educational, gamified Trading RPG + Adventure + Social platform built on MultiversX. It turns learning crypto trading and blockchain into an interactive experience with quests, tournaments, and educational NFTs that unlock utility and progression.

- **Platform**: Progressive Web App (PWA), mobile-first
- **Chain**: MultiversX smart contracts (WASM/Rust)
- **Audience**: Crypto beginners and MultiversX enthusiasts
- **Focus**: Education-first, responsible learning

## 🎮 Core Features

### Quest System
- **Daily**: Price predictions, TA challenges, MultiversX trivia, portfolio simulator, risk scenarios
- **Weekly**: Trading tournaments, ecosystem exploration, AI duels, guild challenges
- **Epic**: Certifications, on-chain investigation, community educator challenges

### AI Mentor "ARIA"
**Personas**:
- **Sage Scholar** (Fundamentals & TA)
- **Crypto Gladiator** (Timing & scalping)
- **Tech Oracle** (DeFi & protocol analysis)

### Educational NFTs (Utility-Focused)
**Certificates**: "Blockchain Basics Graduate", "TA Specialist", "DeFi Expert", "Risk Management Certified"

**Achievement Badges**: "Prediction Master", "Community Helper", "Consistent Learner", "Market Analyst"

**Utilities**: XP multipliers, advanced course access, tournament eligibility, governance voting, premium AI sessions

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + TypeScript, TailwindCSS, Framer Motion, TradingView widgets, Chart.js, PWA (Workbox)
- **Backend**: Node.js + Express + TypeScript, PostgreSQL, Redis, Socket.io
- **AI**: OpenAI GPT-4 + custom ML
- **Blockchain**: MultiversX (mx-sdk-rs, mx-sdk-js), Rust smart contracts
- **Deployment**: Vercel (frontend), Railway (backend)

## 🧱 Smart Contracts (MultiversX / Rust)

```rust
// Contract skeleton (selected endpoints)
#[elrond_wasm::contract]
pub trait ElronomContract {
    // Quest management
    #[endpoint]
    fn complete_quest(&self, quest_id: u64, accuracy_score: u8);

    // Educational NFT minting
    #[endpoint]
    fn mint_educational_badge(&self, user_address: &ManagedAddress, course_id: u8);

    // Leaderboard updates
    #[endpoint]
    fn update_leaderboard(&self, user_id: u64, new_score: u32);
}
```

Educational NFT data model and verification:
```rust
#[derive(TopEncode, TopDecode, PartialEq, Debug)]
pub struct EducationalNFT {
    pub course_id: u64,
    pub completion_date: u64,
    pub skill_level: u8,
    pub issuing_authority: ManagedBuffer,
    pub verification_hash: ManagedBuffer
}

#[endpoint]
fn verify_educational_achievement(&self, nft_id: &TokenIdentifier) -> bool {
    // External verification integration & validation
    true
}
```

## 🧩 Repository Structure

```
elronom/
├── frontend/              # Next.js PWA
│   └── src/ (components, pages, hooks, utils, styles)
├── backend/               # Node.js API
│   └── src/ (routes, services, models, ai)
├── smart-contracts/       # MultiversX Rust
│   ├── elronom-core/
│   ├── educational-nft/
│   └── quest-system/
├── mobile/                # React Native (planned)
├── docs/                  # Documentation
├── tests/                 # Test suites
└── deployment/            # DevOps configs
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+, npm/yarn
- Rust + MultiversX toolchain (mxpy, sc-meta)
- PostgreSQL + Redis
- OpenAI API key (for AI features)

### Setup
```bash
git clone https://github.com/Gzeu/elronom-multiversx-trading-academy.git
cd elronom-multiversx-trading-academy

# Frontend
cd frontend
cp .env.example .env.local
npm install
npm run dev

# Backend
cd ../backend
cp .env.example .env
npm install
npm run dev
```

### Smart Contracts
```bash
cd smart-contracts
sc-meta all build
sc-meta all test
# example deploy
npm run deploy:testnet
```

## 🗺️ Roadmap (High-Level)

- **Phase 0 — Legal Foundation (Q4 2025)**
  - Legal opinion for educational NFT positioning
  - SRL setup, director, banking, voluntary MiCA-aligned procedures
- **Phase 1 — MVP Educational (Q1 2026)**
  - 10 quest types, AI mentor (3 personas), progress tracking
  - NFT minting system, MultiversX wallet integration
- **Phase 2 — Social Learning (Q2 2026)**
  - Study groups, moderated chat, tournaments, mobile app, smart notifications
- **Phase 3 — Advanced Platform (Q3 2026)**
  - Analytics, university partnerships, B2B training, multilingual support, certifications

## 💼 Business Model (Education-First)

- Premium Learning Pass (subscription)
- Corporate Training Licenses
- Educational NFT marketplace fee
- Certification programs

Targets prioritize sustainable ops and compliance-aligned growth.

## ⚖️ Legal & Compliance (Summary)

- Educational focus with utility NFTs; intended classification aligned with educational use-cases.
- Voluntary MiCA-aligned framework, phased launch, and ongoing regulatory monitoring.
- Independent legal review and security audits planned pre-launch.

**Note**: This project is educational only and not financial advice. All compliance positioning is subject to jurisdictional reviews and may evolve.

## 🤝 Contributing

We welcome community contributions!

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/awesome`
3. Commit: `git commit -m "feat: add awesome feature"`
4. Push: `git push origin feat/awesome`
5. Open a PR

Consider opening issues for bugs/ideas, and follow conventional commits.

## 📄 License

MIT — see LICENSE.

## 🌐 Links

- **📚 Documentation**: [Notion Workspace](https://www.notion.so/ELRONOM-The-MultiversX-Trading-Academy-278c2a54483580729f32ddbfa87af7c1)
- **🛠️ MultiversX**: [Builders Hub](https://multiversx.com/builders)
- **🔒 Auditing**: CertiK (planned)

---

*Last updated: September 25, 2025*  
*Created by: George Pricop*  
*Status: 🚀 Ready for Legal Foundation Phase*  
*Next Milestone: Legal entity setup by November 2025*

---

**🎯 ELRONOM - Where Learning Meets Adventure on MultiversX! 🚀**