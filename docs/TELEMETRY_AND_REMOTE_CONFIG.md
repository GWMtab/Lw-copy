# Telemetry and Remote Config Contract (v0)

## Telemetry Events

## Onboarding
- `tutorial_started`
- `tutorial_step_completed`
- `tutorial_completed`

## Economy
- `resource_earned`
- `resource_spent`
- `speedup_used`

## Combat
- `battle_started`
- `battle_finished`
- `battle_abandoned`

## Alliance
- `alliance_joined`
- `alliance_donation_made`
- `rally_joined`

## Required Event Fields
- `player_id`
- `session_id`
- `event_time_utc`
- `build_version`
- `platform`

## Remote Config Keys (initial)
- `economy.building_upgrade_multiplier`
- `economy.speedup_value_minutes_per_gem`
- `combat.enemy_hp_multiplier`
- `combat.ultimate_charge_rate`
- `events.active_event_id`

## Operational Rules
- Remote config values are read-only at runtime and cached for session duration.
- Invalid config payloads fallback to last known-good snapshot.
- Every config publish must include author, reason, and rollback token.
