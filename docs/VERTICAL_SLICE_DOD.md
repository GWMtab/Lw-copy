# Vertical Slice Definition of Done

A build is considered vertical-slice complete when all categories below are green:

## Gameplay
- Player can complete onboarding and reach playable base screen.
- Player can run at least one campaign battle and one map skirmish.
- Player can upgrade at least 3 building types and level at least 2 heroes.

## Social
- Player can create or join an alliance.
- Player can perform at least one alliance contribution action.

## Economy
- Soft currency faucets and sinks are both active and observable.
- Gem spend path for speedup exists and is logged.

## Reliability
- Crash-free sessions >= 99.5% in test cohort.
- No blocker defects in onboarding, battle completion, or resource save integrity.

## Observability
- Funnel dashboard visible for tutorial and first battle completion.
- Economy dashboard shows sink/source ratios for soft currencies.
- Remote config updates can be published and rolled back.
