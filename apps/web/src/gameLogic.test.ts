import { describe, expect, it } from 'vitest';
import {
  BUILDINGS,
  INITIAL_BUILDINGS,
  canAfford,
  meetsPrerequisites,
  upgradeCostForLevel,
  upgradeDurationForLevel
} from './gameLogic';

describe('gameLogic helpers', () => {
  it('scales upgrade costs by level', () => {
    const hq = BUILDINGS.find((building) => building.id === 'hq');
    expect(hq).toBeDefined();

    const level1Cost = upgradeCostForLevel(hq!.baseCost, 1);
    const level3Cost = upgradeCostForLevel(hq!.baseCost, 3);

    expect(level1Cost.food).toBe(120);
    expect(level3Cost.food).toBeGreaterThan(level1Cost.food);
    expect(level3Cost.metal).toBeGreaterThan(level1Cost.metal);
  });

  it('requires prerequisites before unlocking upgrades', () => {
    const snapshot = {
      ...INITIAL_BUILDINGS,
      hq: { ...INITIAL_BUILDINGS.hq, level: 1 }
    };

    expect(meetsPrerequisites('smelter', snapshot)).toBe(false);

    const withHqLevel2 = {
      ...snapshot,
      hq: { ...snapshot.hq, level: 2 }
    };

    expect(meetsPrerequisites('smelter', withHqLevel2)).toBe(true);
  });

  it('computes upgrade durations and resource affordability', () => {
    const duration = upgradeDurationForLevel(20, 4);
    expect(duration).toBe(35);

    const affordable = canAfford(
      { food: 200, metal: 150, energy: 100 },
      { food: 180, metal: 120, energy: 80 }
    );
    const notAffordable = canAfford(
      { food: 50, metal: 50, energy: 50 },
      { food: 60, metal: 50, energy: 40 }
    );

    expect(affordable).toBe(true);
    expect(notAffordable).toBe(false);
  });
});
