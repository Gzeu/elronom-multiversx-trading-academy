# 🎮 ELRONOM - The MultiversX Trading Academy

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MultiversX](https://img.shields.io/badge/Blockchain-MultiversX-blue.svg)](https://multiversx.com/)
[![Status](https://img.shields.io/badge/Status-Planning-orange.svg)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](#)
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](#)
[![Rust](https://img.shields.io/badge/Rust-000000?logo=rust&logoColor=white)](#)

> 🚀 **Prima aplicație gamificată educațională pe MultiversX** care transformă învățarea trading-ului și blockchain-ului într-o aventură interactivă cu recompense NFT reale!

## 📊 Project Overview

**ELRONOM** este o platformă educațională revoluționară care combină:
- 🎯 **Educational Trading RPG** + Adventure Quest + Social Competition
- 🏗️ **Progressive Web App (PWA)** mobile-first
- ⚡ **MultiversX smart contracts** pentru NFTs și rewards
- 🎯 **Target**: Crypto beginners (18-35) + MultiversX enthusiasts
- ⚖️ **Legal Status**: Educational gaming platform (exempt MiCA pentru NFT utility)

---

## 🛠️ Tech Stack

### Frontend & UI
- **Framework**: Next.js 14 + TypeScript
- **Styling**: TailwindCSS + Framer Motion
- **MultiversX**: @multiversx/sdk-dapp + @multiversx/sdk-core
- **Charts**: Chart.js + TradingView widgets
- **PWA**: Workbox + Service Workers

### Backend & APIs
- **Runtime**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Redis (caching)
- **AI Integration**: OpenAI GPT-4 + custom ML models
- **Real-time**: Socket.io pentru live updates
- **Deployment**: Vercel (frontend) + Railway (backend)

### Blockchain & Smart Contracts
```rust
// Smart Contract Structure (MultiversX Rust)
#[elrond_wasm::contract]
pub trait ElronomContract {
    // Quest management
    #[endpoint]
    fn complete_quest(&self, quest_id: u64, accuracy_score: u8);
    
    // Educational NFT minting (MiCA exempt)
    #[endpoint]
    fn mint_educational_badge(&self, user_address: &ManagedAddress, course_id: u8);
    
    // Leaderboard updates
    #[endpoint]
    fn update_leaderboard(&self, user_id: u64, new_score: u32);
}
```

---

## 🎮 Game Design & Features

### 1. Quest System Architecture

#### Daily Quests (50-200 XP + micro EGLD rewards)
- 🔮 **Predict EGLD Price**: Ghicește prețul în următoarele 4 ore (±5% accuracy)
- 📈 **Technical Analysis Challenge**: Identifică pattern-uri pe grafice reale
- 🧠 **MultiversX Trivia**: Întrebări despre ecosistem, tehnologie, proiecte
- 💼 **Portfolio Simulator**: Construiește un portofoliu virtual optim
- 🎯 **Risk Assessment**: Evaluează scenarii de trading în condiții controlate

#### Weekly Adventures (Educational NFT Badges + Premium XP)
- 🏆 **Trading Tournament**: Competiții simulate cu clasamente live
- 🌐 **Ecosystem Explorer**: Descoperă și analizează proiecte noi MultiversX
- 🤖 **AI Duel**: Provocare directă împotriva AI-ului la predicții
- 👥 **Guild Challenges**: Misiuni colaborative în echipă

#### Epic Challenges (NFT Certificate + EGLD premii)
- 📊 **Master Trader Certification**: 10 trade-uri consecutive corecte
- 🕵️ **Blockchain Detective Course**: Analizează tranzacții și identifică pattern-uri
- 👑 **Community Educator**: Ghidează alți jucători și primește rating pozitiv

### 2. AI Mentor System - "ARIA"

```javascript
const aiPersonalities = {
  "Sage Scholar": {
    focus: "Fundamentals & Technical Analysis",
    style: "Calm, educational, thorough",
    specialty: "Long-term investment strategies"
  },
  "Crypto Gladiator": {
    focus: "Quick opportunities & market timing",
    style: "Aggressive, fast-paced, direct",
    specialty: "Day trading & scalping techniques"
  },
  "Tech Oracle": {
    focus: "Blockchain technology & DeFi",
    style: "Technical, innovative, forward-thinking",
    specialty: "Protocol analysis & new project evaluation"
  }
}
```

---

## 🏅 NFT Educational Ecosystem

### Tipuri de NFT-uri (MiCA Exempt)

#### Learning Certificates (Common → Rare)
- "Blockchain Basics Graduate"
- "Technical Analysis Specialist"
- "DeFi Protocol Expert"
- "Risk Management Certified"

**UTILITATE:**
- Access la advanced courses
- Multiplicatori XP (1.1x-1.5x)
- Special chat channels
- Mentorship program eligibility

#### Achievement Badges (Epic → Legendary)
- "Prediction Master" (90%+ accuracy rate)
- "Community Helper" (high peer ratings)
- "Consistent Learner" (30+ day streak)
- "Market Analyst" (completed advanced courses)

**UTILITATE:**
- Tournament entry privileges
- Early access la new features
- Governance voting rights
- Premium AI mentor sessions

---

## 💰 Business Model

### Revenue Streams
```text
Monthly Fixed Costs: €8,700
Breakeven Revenue Needed: €15,000/lună

Revenue Sources:
1. Premium Learning Pass: €15/lună
   - Target: 1,000 users = €15,000
   - Unlimited energy pentru quests
   - AI mentor advanced sessions
   - Exclusive educational content

2. Corporate Training Licenses: €500-2,000/lună
   - Enterprise blockchain education
   - Custom course development
   - Team leaderboards și competitions

3. Educational NFT Marketplace: 2.5% fee
   - Focus pe learning achievements
   - Estimated €2,000/lună la maturitate

4. Certification Programs: €50-200 per certificate
   - Verified blockchain competency
   - Partnership cu universități
   - Professional recognition value
```

---

## 🚀 Implementation Roadmap

### 🔵 Faza 0: Legal Foundation (Oct-Dec 2025)
**Budget: €50,000**
- ✅ Înregistrare SRL România cu capital €25,000
- ✅ Contract director român local (€36,000/an)
- ✅ Legal opinion pentru MiCA exemption
- ✅ Voluntary compliance framework implementation
- ✅ Smart contract legal review

### 🟢 Faza 1: MVP Educational (Ian-Mar 2026)
**Budget: €40,000**
- ✅ 10 educational quest types
- ✅ AI Mentor cu 3 personalities
- ✅ Basic learning progress tracking
- ✅ Educational NFT minting system
- ✅ MultiversX wallet integration

### 🟡 Faza 2: Social Learning (Apr-Jun 2026)
**Budget: €30,000**
- 👥 Study groups și peer learning
- 💬 Educational chat cu moderation
- 🏆 Learning competitions și tournaments
- 📱 Mobile app pentru continuous learning
- 🔔 Smart notifications pentru study reminders

### 🔴 Faza 3: Advanced Platform (Jul-Sep 2026)
**Budget: €40,000 + Compliance pentru full MiCA**
- 🏦 Advanced educational analytics
- 🤝 University partnerships pentru certificates
- 📊 Corporate training modules
- 🌍 Multi-language support (EN, RO, FR)
- 🎓 Professional certification pathways

---

## 📁 Project Structure

```
elronom-multiversx-trading-academy/
├── 📂 frontend/                 # Next.js PWA application
│   ├── 📂 src/
│   │   ├── 📂 components/       # Reusable UI components
│   │   ├── 📂 pages/           # Next.js pages
│   │   ├── 📂 hooks/           # Custom React hooks
│   │   ├── 📂 utils/           # Utility functions
│   │   └── 📂 styles/          # TailwindCSS styles
│   ├── 📂 public/              # Static assets
│   └── 📄 package.json
├── 📂 backend/                  # Node.js API server
│   ├── 📂 src/
│   │   ├── 📂 routes/          # API routes
│   │   ├── 📂 services/        # Business logic
│   │   ├── 📂 models/          # Database models
│   │   └── 📂 ai/              # AI integration
│   └── 📄 package.json
├── 📂 smart-contracts/          # MultiversX Rust contracts
│   ├── 📂 elronom-core/        # Main contract
│   ├── 📂 educational-nft/     # NFT contract
│   └── 📂 quest-system/        # Quest management
├── 📂 mobile/                   # React Native app
├── 📂 docs/                     # Documentation
├── 📂 tests/                    # Test suites
├── 📂 deployment/               # DevOps configs
└── 📄 README.md
```

---

## 🎯 Success Metrics & KPIs

### Educational Impact (Primary)
```text
Learning Outcomes:
- Knowledge improvement: +40% average score increase
- Course completion rate: 70%+ pentru basic modules
- Skill retention: 80%+ after 90 days
- Professional application: 60%+ report workplace usage

User Engagement:
- Daily active learners: 500+ by month 6
- Average study session: 20+ minutes
- Weekly login rate: 75%+
- Community participation: 40%+ în discussions
```

### Financial Sustainability
```text
Revenue Targets:
- Month 3: €5,000 (break-even pentru development)
- Month 6: €15,000 (operational break-even)
- Month 12: €25,000 (profitability cu expansion fund)
- Year 2: €50,000 (market leadership position)
```

---

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ și npm/yarn
- Rust și MultiversX toolchain
- PostgreSQL și Redis
- OpenAI API key pentru AI features

### Development Setup
```bash
# Clone repository
git clone https://github.com/Gzeu/elronom-multiversx-trading-academy.git
cd elronom-multiversx-trading-academy

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Smart Contract Development
```bash
# Setup MultiversX environment
cd smart-contracts

# Build contracts
sc-meta all build

# Run tests
sc-meta all test

# Deploy to testnet
npm run deploy:testnet
```

---

## 🤝 Contributing

Vedem cu interes contribuțiile comunității! Te rugăm să citești [CONTRIBUTING.md](CONTRIBUTING.md) pentru ghiduri detaliate.

### Development Workflow
1. Fork repository-ul
2. Creează un branch pentru feature (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push la branch (`git push origin feature/amazing-feature`)
5. Deschide un Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📞 Contact & Resources

### Legal & Compliance
- **Manimama Law Firm**: MiCA compliance consultation
- **ASF (Autoritatea de Supraveghere Financiară)**: CASP licensing

### Technical Partners
- **CertiK**: Smart contract security auditing
- **MultiversX Team**: Technical support și resources
- **OpenAI**: AI integration consultation

### Educational Partners
- **ASE București**: Economics și business courses
- **UPB**: Technical și blockchain courses
- **Babeș-Bolyai**: Computer science și economics

---

## 🌟 Project Links

- **📋 Task Management**: [Linear Project](https://linear.app/gpz/project/elronom)
- **📚 Documentation**: [Notion Workspace](https://www.notion.so/ELRONOM-The-MultiversX-Trading-Academy-278c2a54483580729f32ddbfa87af7c1)
- **🌐 Website**: Coming soon...
- **📱 App**: Coming soon...

---

*Ultima actualizare: 24 Septembrie 2025*  
*Creat de: George Pricop*  
*Status: 🚀 Ready for Legal Foundation Phase*  
*Next Milestone: Legal entity setup by November 2025*

---

**🎯 ELRONOM - Where Learning Meets Adventure on MultiversX! 🚀**