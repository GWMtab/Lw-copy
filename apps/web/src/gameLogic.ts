export type ResourceKey = 'food' | 'metal' | 'energy';

export type BuildingId =
  | 'hq'
  | 'farm'
  | 'smelter'
  | 'powerPlant'
  | 'barracks'
  | 'radar'
  | 'hospital'
  | 'garage'
  | 'researchLab'
  | 'allianceCenter';

export type BuildingDefinition = {
  id: BuildingId;
  name: string;
  maxLevel: number;
  baseDurationSec: number;
  baseCost: Record<ResourceKey, number>;
  prerequisites?: Partial<Record<BuildingId, number>>;
};

export type PlayerBuilding = {
  level: number;
  upgradingTo: number | null;
  remainingSec: number;
};

export const BUILDINGS: BuildingDefinition[] = [
  { id: 'hq', name: 'Command HQ', maxLevel: 10, baseDurationSec: 30, baseCost: { food: 120, metal: 80, energy: 60 } },
  { id: 'farm', name: 'Farm', maxLevel: 10, baseDurationSec: 20, baseCost: { food: 70, metal: 30, energy: 20 } },
  {
    id: 'smelter',
    name: 'Smelter',
    maxLevel: 10,
    baseDurationSec: 22,
    baseCost: { food: 40, metal: 90, energy: 20 },
    prerequisites: { hq: 2 }
  },
  {
    id: 'powerPlant',
    name: 'Power Plant',
    maxLevel: 10,
    baseDurationSec: 24,
    baseCost: { food: 45, metal: 35, energy: 85 },
    prerequisites: { hq: 2 }
  },
  {
    id: 'barracks',
    name: 'Barracks',
    maxLevel: 10,
    baseDurationSec: 28,
    baseCost: { food: 90, metal: 70, energy: 50 },
    prerequisites: { hq: 3 }
  },
  {
    id: 'radar',
    name: 'Radar Tower',
    maxLevel: 10,
    baseDurationSec: 30,
    baseCost: { food: 60, metal: 75, energy: 55 },
    prerequisites: { hq: 3 }
  },
  {
    id: 'hospital',
    name: 'Hospital',
    maxLevel: 10,
    baseDurationSec: 26,
    baseCost: { food: 75, metal: 55, energy: 65 },
    prerequisites: { hq: 4 }
  },
  {
    id: 'garage',
    name: 'Garage',
    maxLevel: 10,
    baseDurationSec: 32,
    baseCost: { food: 85, metal: 95, energy: 45 },
    prerequisites: { barracks: 2 }
  },
  {
    id: 'researchLab',
    name: 'Research Lab',
    maxLevel: 10,
    baseDurationSec: 35,
    baseCost: { food: 65, metal: 85, energy: 80 },
    prerequisites: { hq: 5 }
  },
  {
    id: 'allianceCenter',
    name: 'Alliance Center',
    maxLevel: 10,
    baseDurationSec: 36,
    baseCost: { food: 95, metal: 100, energy: 75 },
    prerequisites: { hq: 6 }
  }
];

export const BUILDING_MAP: Record<BuildingId, BuildingDefinition> = Object.fromEntries(
  BUILDINGS.map((building) => [building.id, building])
) as Record<BuildingId, BuildingDefinition>;

export const INITIAL_BUILDINGS: Record<BuildingId, PlayerBuilding> = Object.fromEntries(
  BUILDINGS.map((building) => [
    building.id,
    { level: building.id === 'hq' || building.id === 'farm' ? 1 : 0, upgradingTo: null, remainingSec: 0 }
  ])
) as Record<BuildingId, PlayerBuilding>;

export const canAfford = (resources: Record<ResourceKey, number>, cost: Record<ResourceKey, number>) =>
  resources.food >= cost.food && resources.metal >= cost.metal && resources.energy >= cost.energy;

export const upgradeCostForLevel = (
  baseCost: Record<ResourceKey, number>,
  nextLevel: number
): Record<ResourceKey, number> => ({
  food: Math.round(baseCost.food * (1 + (nextLevel - 1) * 0.35)),
  metal: Math.round(baseCost.metal * (1 + (nextLevel - 1) * 0.35)),
  energy: Math.round(baseCost.energy * (1 + (nextLevel - 1) * 0.35))
});

export const upgradeDurationForLevel = (baseDurationSec: number, nextLevel: number) =>
  Math.round(baseDurationSec * (1 + (nextLevel - 1) * 0.25));

export const meetsPrerequisites = (
  buildingId: BuildingId,
  buildings: Record<BuildingId, PlayerBuilding>
): boolean => {
  const requirements = BUILDING_MAP[buildingId].prerequisites;
  if (!requirements) {
    return true;
  }

  return Object.entries(requirements).every(([reqId, reqLevel]) => {
    const level = buildings[reqId as BuildingId].level;
    return level >= (reqLevel ?? 0);
  });
};
