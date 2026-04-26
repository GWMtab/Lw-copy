# ADR-001: Stack and Runtime Baseline

- **Status**: Accepted
- **Date**: 2026-04-26

## Context
The game requires browser-first rendering performance, fast iteration on UI, server-authoritative progression/combat outcomes, and live-ops tunability.

## Decision
1. **Frontend**
   - React + TypeScript for shell/UI.
   - PixiJS for combat/map rendering on WebGL/canvas.
   - Zustand for state slices and event bus adapters.

2. **Backend services**
   - API/Gateway: NestJS.
   - Realtime world updates: dedicated WebSocket service (Node.js).
   - Async timers/events: queue worker service.

3. **Data**
   - PostgreSQL for persistent account/progression.
   - Redis for cache/session/ephemeral world state.
   - S3-compatible blob store for replays and static payload exports.

4. **Operations**
   - Feature flags and remote config are mandatory before content scaling.
   - OpenTelemetry spans + Grafana dashboards required from vertical slice.

## Consequences
### Positive
- Shared TypeScript language across client/server teams.
- Fast UI iteration and broad hiring compatibility.
- Clear path to live-ops controls.

### Negative
- Node-heavy stack may need strict profiling for high concurrency.
- Frontend complexity (React + PixiJS boundary) needs architectural discipline.

## Follow-up Tasks
- Define service contracts for combat resolution and march events.
- Add load-testing harness before soft launch.
