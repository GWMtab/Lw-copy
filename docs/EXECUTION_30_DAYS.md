# 30-Day Execution Plan

## Week 1 — Project Foundations
- [ ] Finalize GDD v1 scope freeze and acceptance criteria.
- [ ] Establish monorepo structure (`apps/web`, `services/api`, `services/realtime`, `packages/shared`).
- [ ] Configure CI: lint, typecheck, unit tests, build artifacts.
- [ ] Stand up PostgreSQL + Redis local docker stack.

## Week 2 — Vertical Slice Gameplay Spine
- [ ] Implement account creation + guest/device binding.
- [ ] Build base screen shell (resource bar, queue panel, CTA rail).
- [ ] Add 10 building definitions with prerequisites and upgrade timers.
- [ ] Implement battle scene prototype with 12 hero data entries and 3 enemy factions.

## Week 3 — Economy + Progression + Telemetry
- [ ] Add hero progression endpoints (level, gear slot, ascension stubs).
- [ ] Implement rewards pipelines for campaign/map skirmish.
- [ ] Add telemetry events for onboarding, battle start/end, upgrade actions.
- [ ] Integrate remote config fetch and fallback behavior.

## Week 4 — Social Feature + Playtest Readiness
- [ ] Add alliance create/join and donation endpoint flow.
- [ ] Implement rally join UX stub and backend validation.
- [ ] Build first-time-user tutorial path for first 20 minutes.
- [ ] Run closed playtest; produce balancing/performance report.

## Exit Criteria (Day 30)
- [ ] End-to-end playable slice from onboarding to alliance interaction.
- [ ] Crash-free rate >= 99.5% on test cohort.
- [ ] Telemetry dashboards live for key funnel and economy metrics.
