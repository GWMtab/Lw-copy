# Project Plan: AAA-Style Browser Strategy MMO (inspired by Last War / Tiles Survive! / State of Survival)

## 1) Product Vision
Build a **high-fidelity, live-ops-first strategy MMO web app** that combines:
- asynchronous base building,
- hero squad progression,
- lane/tile combat moments,
- alliance warfare,
- seasonal world resets,
- deep monetization and event systems,
all in a polished browser-first package with performance parity across desktop and mobile web.

The experience target is “mobile F2P depth + premium web UX”, with enough systemic complexity to support **12+ months of content cadence**.

---

## 2) Core Pillars
1. **Strategic Depth Over Time**
   - Multi-layer loops: city management, squad optimization, map control, alliance politics.
2. **Session Flexibility**
   - 2–5 minute actions (collect, queue, raid) and 20–60 minute strategic sessions (wars, events).
3. **Competitive Social Play**
   - Alliances, rally mechanics, world bosses, server-vs-server seasons.
4. **Live Ops as a First-Class System**
   - Event authoring tools, AB experiments, dynamic economy tuning.
5. **Top-End Presentation**
   - Cohesive art direction, rich VFX/SFX feedback, animation polish, cinematic onboarding.

---

## 3) Platform Scope (Web App First)
### In-Scope Launch Platforms
- Desktop browsers: Chrome, Edge, Safari, Firefox (latest 2 versions).
- Mobile web/PWA: iOS Safari, Android Chrome.

### Technical Targets
- Initial load < 5s on mid-tier broadband with streamed assets.
- 60 FPS target on desktop, 30–60 FPS adaptive on mobile.
- Deterministic server-authoritative combat outcomes for PvP fairness.

---

## 4) Game Loops
### Macro Loop (Weeks/Seasons)
1. Expand base
2. Unlock technology and troops
3. Compete for map resources and capitals
4. Participate in seasonal faction war
5. Season reset with persistent meta progression

### Mid Loop (Daily)
- Build/upgrade queues
- Hero leveling/equipment
- Campaign stages and elite encounters
- Alliance donations, rallies, cooperative bosses
- Limited-time event missions

### Micro Loop (Per Session)
- Collect resources
- Run tactical battles (tile/lane skirmishes)
- Optimize formation, skills, and buffs
- Claim rewards and set long timers

---

## 5) System Design (Complexity Comparable to Genre Leaders)
## 5.1 City/Base Layer
- 30+ building types grouped by Economy, Military, Research, Utility, Alliance.
- Prerequisite graph with strategic branching (not only linear unlocks).
- Worker/queue management with speedup economy.
- Production risk/reward modifiers tied to map control.

## 5.2 World Map Layer
- Tiled world with fog-of-war, points of interest, neutral camps, bosses, wonders.
- Territory ownership and alliance control zones.
- Marching, scouting, intercept, garrison, and rally mechanics.
- PvP battle reports with replay timelines.

## 5.3 Tactical Battle Layer (Tiles/Lane Hybrid)
- Real-time-lite encounter maps using lane pressure + tile modifiers.
- Squad comp: Tank/DPS/Support classes with faction synergies.
- Active hero ultimates + passive proc system.
- Enemy archetypes with counterplay tags.

## 5.4 Hero/Progression Layer
- 80–120 heroes at long-term scale.
- Rarity tiers, stars/awakening, skill trees, gear sets, artifacts.
- Formation bonuses, faction resonance, commander talents.
- Collection bonuses for long-tail goals.

## 5.5 Alliance Layer
- Alliance tech tree, gift system, cooperative tasks.
- Scheduled alliance wars with matchmaking bands.
- Officer permissions, diplomacy tools, shared objectives.

## 5.6 Seasonal Layer
- 8–12 week season cadence.
- Rotating rule mutators (weather, faction perks, map hazards).
- Seasonal leaderboard + milestone rewards.
- Carryover currencies/meta trees to preserve progress feeling.

---

## 6) Economy & Monetization (Fairness-Conscious F2P)
### Currencies
- Soft: food/metal/energy.
- Hard: premium gems.
- Event currencies: seasonal tokens.

### Sinks & Sources
- Controlled faucets via missions, map nodes, and events.
- Sinks in crafting, rerolls, boosts, hero ascension.

### Monetization Systems
- Battle pass (free/premium tracks).
- Time-limited offers personalized by progression segment.
- Cosmetic skins + base themes.
- Convenience boosts and packs (avoid direct hard paywalls for core content).

### Compliance
- Regionalized disclosure for probabilities.
- Spending controls and parental gate where required.

---

## 7) Live Ops, Content Pipeline, and Tooling
### Live Ops Console (Internal)
- Event scheduler (calendar + segmentation).
- Remote config for balance constants.
- Offer management and experiment assignment.
- Push notifications and inbox campaigns.

### Content Authoring
- Data-driven mission definitions (JSON + schema validation).
- Enemy wave editor and map encounter templates.
- Scriptable event condition/trigger system.

### Analytics
- Funnel tracking: tutorial -> day1 -> day7 -> alliance join.
- Economy telemetry: inflation index, sink/source ratios.
- Combat telemetry: hero pick/win rates, battle duration.

---

## 8) Suggested Tech Architecture
## Frontend (Web)
- **Game client**: Phaser 3 or PixiJS + custom ECS/state layers.
- **App shell/UI**: React + TypeScript.
- **State**: Zustand/Redux Toolkit + event bus.
- **Rendering strategy**: Canvas/WebGL for combat + DOM UI overlays.
- **Asset delivery**: CDN, texture atlases, lazy streaming.

## Backend
- **Gateway/API**: Node.js (NestJS) or Go microservices.
- **Realtime**: WebSocket service for world state updates.
- **Data**: PostgreSQL (account/progression), Redis (session/cache), S3-compatible object store (assets/replays).
- **Jobs**: queue workers for timers, match resolution, events.
- **Auth**: OAuth/email + device binding.

## DevOps
- Kubernetes deployment with autoscaling.
- Blue/green releases.
- Feature flags + kill switches.
- Observability: OpenTelemetry + Grafana dashboards.

---

## 9) Asset Plan (Use Available/Found Assets Early, Replace Iteratively)
### Prototype Asset Strategy
- Start with licensed/royalty-free packs for:
  - isometric terrain tiles,
  - military/survivor units,
  - VFX packs (explosions, projectiles),
  - UI icon sets.
- Maintain an **asset registry** with license, source, and replacement priority.

### Visual Upgrade Path
1. Placeholder pack baseline.
2. Style harmonization pass (color grading, outline rules, UI theme).
3. Custom hero key art + signature effects.
4. Final branded art pack replacing third-party placeholders.

---

## 10) Content Targets at Milestone Levels
### Vertical Slice
- 1 city biome
- 10 buildings
- 12 heroes
- 2 battle modes
- 1 alliance feature

### Soft Launch
- 2–3 biomes
- 25+ buildings
- 40 heroes
- world map PvP
- first seasonal event

### Global Launch
- 4+ biomes
- 35+ buildings
- 60+ heroes
- full alliance war season
- live ops calendar for 90 days

---

## 11) Roadmap (High Level)
## Phase 0 (4–6 weeks): Foundations
- Core architecture, account system, data schemas, CI/CD.

## Phase 1 (8–10 weeks): Vertical Slice
- Base building, one combat loop, progression skeleton, basic store.

## Phase 2 (10–12 weeks): Social + PvP
- Alliances, world map, rally battles, leaderboard service.

## Phase 3 (8–10 weeks): Live Ops + Economy Hardening
- Event framework, remote config, analytics dashboards, AB tests.

## Phase 4 (6–8 weeks): Soft Launch
- Region-limited release, retention/monetization tuning.

## Phase 5 (ongoing): Global Scale
- Seasonal content pipeline, anti-cheat hardening, creator/community tooling.

---

## 12) Team Composition (Recommended)
- Product: 1 PM, 1 game designer lead, 2 system designers, 1 economy designer.
- Engineering: 3 frontend, 4 backend, 2 platform/devops, 2 QA automation.
- Content: 2 tech artists, 3 game artists, 2 animators, 1 UI/UX.
- Live Ops: 1 producer, 1 analyst, 1 CRM manager.

---

## 13) Risk Register + Mitigations
1. **Scope Creep** -> strict milestone gates and feature flags.
2. **Web Performance Bottlenecks** -> aggressive profiling, LOD strategy, texture budgets.
3. **Economy Instability** -> simulation tooling + capped parameter changes.
4. **PvP Fairness Perception** -> transparent combat logs + matchmaking protection bands.
5. **Content Burnout** -> reusable event templates and procedural encounter variants.

---

## 14) Immediate Next Steps (Actionable 30-Day Plan)
1. Lock a concise GDD v1 and technical architecture decision record.
2. Build clickable UX prototype (onboarding, base screen, battle HUD).
3. Implement vertical slice combat with 12 heroes and 3 enemy factions.
4. Stand up telemetry events and live config from day one.
5. Conduct closed playtests and tune first 20 minutes for retention.

This plan yields a web-first strategy title with the depth, progression complexity, and live-ops sophistication expected from top-tier titles in this genre.
