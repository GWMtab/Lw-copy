# Lw-copy — Execution Bootstrap

This repository now contains an executable bootstrap for the strategy MMO game plan in `GAME_PLAN.md`.

## What is included
- **Concise GDD v1** (`docs/GDD_V1.md`)
- **Architecture Decision Record** (`docs/ADR-001-stack-and-runtime.md`)
- **30-day implementation plan** (`docs/EXECUTION_30_DAYS.md`)
- **Initial telemetry/live-config contract** (`docs/TELEMETRY_AND_REMOTE_CONFIG.md`)
- **Vertical-slice definition of done** (`docs/VERTICAL_SLICE_DOD.md`)
- **Web client bootstrap** (`apps/web`) with React + TypeScript + PixiJS + Zustand.

## Start the game prototype
```bash
cd apps/web
npm install
npm run dev
```

The first playable bootstrap includes:
- resource HUD with auto-ticking economy,
- manual “Collect Outpost Supplies” action,
- animated lane-skirmish placeholder rendered in PixiJS.

## Recommended next command sequence
1. Review and approve ADR + GDD scope.
2. Create the API and realtime service workspaces (`services/api`, `services/realtime`).
3. Implement milestone tickets from `docs/EXECUTION_30_DAYS.md` in priority order.

## Scope note
This is a planning-and-architecture execution pass intended to convert the high-level vision into immediately actionable engineering artifacts.
