import { create } from 'zustand';
import {
  BUILDINGS,
  BUILDING_MAP,
  INITIAL_BUILDINGS,
  canAfford,
  meetsPrerequisites,
  upgradeCostForLevel,
  upgradeDurationForLevel,
  type BuildingId,
  type PlayerBuilding,
  type ResourceKey
} from './gameLogic';

type BattleOutcome = 'idle' | 'victory' | 'defeat';

type BattleState = {
  squadPower: number;
  enemyPower: number;
  squadHp: number;
  enemyHp: number;
  wins: number;
  losses: number;
  isBattleActive: boolean;
  lastOutcome: BattleOutcome;
};

type TelemetryEvent = {
  id: number;
  type:
    | 'collect'
    | 'recruit'
    | 'battle_start'
    | 'battle_win'
    | 'battle_loss'
    | 'building_upgrade_start'
    | 'building_upgrade_complete';
  tick: number;
  payload: Record<string, number | string>;
};

type GameState = {
  resources: Record<ResourceKey, number>;
  tickCount: number;
  battle: BattleState;
  telemetry: TelemetryEvent[];
  buildings: Record<BuildingId, PlayerBuilding>;
  collect: () => void;
  recruitTroop: () => void;
  startBattle: () => void;
  startBuildingUpgrade: (buildingId: BuildingId) => void;
  canStartBuildingUpgrade: (buildingId: BuildingId) => boolean;
  tick: () => void;
  canRecruit: () => boolean;
};

const TICK_GAIN: Record<ResourceKey, number> = {
  food: 1,
  metal: 1,
  energy: 1
};

const INITIAL_BATTLE: BattleState = {
  squadPower: 10,
  enemyPower: 8,
  squadHp: 100,
  enemyHp: 100,
  wins: 0,
  losses: 0,
  isBattleActive: false,
  lastOutcome: 'idle'
};

const RECRUIT_COST: Record<ResourceKey, number> = {
  food: 40,
  metal: 25,
  energy: 15
};

const appendTelemetry = (
  events: TelemetryEvent[],
  event: Omit<TelemetryEvent, 'id'>
): TelemetryEvent[] => {
  const nextEvent: TelemetryEvent = {
    id: events.length === 0 ? 1 : events[events.length - 1].id + 1,
    ...event
  };

  return [...events.slice(-19), nextEvent];
};

const canUpgrade = (
  buildingId: BuildingId,
  state: Pick<GameState, 'buildings' | 'resources'>
): boolean => {
  const def = BUILDING_MAP[buildingId];
  const building = state.buildings[buildingId];
  const nextLevel = building.level + 1;

  if (building.upgradingTo !== null || building.level >= def.maxLevel) {
    return false;
  }

  if (!meetsPrerequisites(buildingId, state.buildings)) {
    return false;
  }

  const cost = upgradeCostForLevel(def.baseCost, nextLevel);
  return canAfford(state.resources, cost);
};

export const useGameStore = create<GameState>((set, get) => ({
  resources: {
    food: 100,
    metal: 100,
    energy: 100
  },
  tickCount: 0,
  battle: INITIAL_BATTLE,
  telemetry: [],
  buildings: INITIAL_BUILDINGS,
  canRecruit: () => canAfford(get().resources, RECRUIT_COST),
  canStartBuildingUpgrade: (buildingId) => canUpgrade(buildingId, get()),
  collect: () =>
    set((state) => ({
      resources: {
        food: state.resources.food + 25,
        metal: state.resources.metal + 20,
        energy: state.resources.energy + 15
      },
      telemetry: appendTelemetry(state.telemetry, {
        type: 'collect',
        tick: state.tickCount,
        payload: { food: 25, metal: 20, energy: 15 }
      })
    })),
  recruitTroop: () =>
    set((state) => {
      if (!canAfford(state.resources, RECRUIT_COST)) {
        return state;
      }

      return {
        resources: {
          food: state.resources.food - RECRUIT_COST.food,
          metal: state.resources.metal - RECRUIT_COST.metal,
          energy: state.resources.energy - RECRUIT_COST.energy
        },
        battle: {
          ...state.battle,
          squadPower: state.battle.squadPower + 2,
          squadHp: Math.min(state.battle.squadHp + 12, 120)
        },
        telemetry: appendTelemetry(state.telemetry, {
          type: 'recruit',
          tick: state.tickCount,
          payload: { squadPowerGain: 2 }
        })
      };
    }),
  startBattle: () =>
    set((state) => {
      if (state.battle.isBattleActive) {
        return state;
      }

      return {
        battle: {
          ...state.battle,
          squadHp: 100,
          enemyHp: 100,
          enemyPower: 7 + Math.floor(state.tickCount / 30),
          isBattleActive: true,
          lastOutcome: 'idle'
        },
        telemetry: appendTelemetry(state.telemetry, {
          type: 'battle_start',
          tick: state.tickCount,
          payload: { enemyPower: 7 + Math.floor(state.tickCount / 30) }
        })
      };
    }),
  startBuildingUpgrade: (buildingId) =>
    set((state) => {
      if (!canUpgrade(buildingId, state)) {
        return state;
      }

      const def = BUILDING_MAP[buildingId];
      const building = state.buildings[buildingId];
      const nextLevel = building.level + 1;
      const cost = upgradeCostForLevel(def.baseCost, nextLevel);

      return {
        resources: {
          food: state.resources.food - cost.food,
          metal: state.resources.metal - cost.metal,
          energy: state.resources.energy - cost.energy
        },
        buildings: {
          ...state.buildings,
          [buildingId]: {
            ...building,
            upgradingTo: nextLevel,
            remainingSec: upgradeDurationForLevel(def.baseDurationSec, nextLevel)
          }
        },
        telemetry: appendTelemetry(state.telemetry, {
          type: 'building_upgrade_start',
          tick: state.tickCount,
          payload: { building: def.name, level: nextLevel }
        })
      };
    }),
  tick: () =>
    set((state) => {
      const nextResources: Record<ResourceKey, number> = {
        food: state.resources.food + TICK_GAIN.food,
        metal: state.resources.metal + TICK_GAIN.metal,
        energy: state.resources.energy + TICK_GAIN.energy
      };

      const nextBattle = { ...state.battle };
      let telemetry = state.telemetry;

      const nextBuildings = { ...state.buildings };
      for (const buildingDef of BUILDINGS) {
        const slot = nextBuildings[buildingDef.id];
        if (slot.upgradingTo === null) {
          continue;
        }

        const remaining = Math.max(slot.remainingSec - 1, 0);
        nextBuildings[buildingDef.id] = { ...slot, remainingSec: remaining };

        if (remaining === 0) {
          nextBuildings[buildingDef.id] = {
            level: slot.upgradingTo,
            upgradingTo: null,
            remainingSec: 0
          };
          telemetry = appendTelemetry(telemetry, {
            type: 'building_upgrade_complete',
            tick: state.tickCount + 1,
            payload: { building: buildingDef.name, level: slot.upgradingTo }
          });
        }
      }

      if (nextBattle.isBattleActive) {
        nextBattle.enemyHp = Math.max(nextBattle.enemyHp - nextBattle.squadPower, 0);
        if (nextBattle.enemyHp === 0) {
          nextBattle.isBattleActive = false;
          nextBattle.wins += 1;
          nextBattle.lastOutcome = 'victory';

          telemetry = appendTelemetry(telemetry, {
            type: 'battle_win',
            tick: state.tickCount + 1,
            payload: { wins: nextBattle.wins }
          });

          return {
            tickCount: state.tickCount + 1,
            resources: {
              food: nextResources.food + 50,
              metal: nextResources.metal + 35,
              energy: nextResources.energy + 20
            },
            battle: nextBattle,
            buildings: nextBuildings,
            telemetry
          };
        }

        nextBattle.squadHp = Math.max(nextBattle.squadHp - nextBattle.enemyPower, 0);
        if (nextBattle.squadHp === 0) {
          nextBattle.isBattleActive = false;
          nextBattle.losses += 1;
          nextBattle.lastOutcome = 'defeat';
          telemetry = appendTelemetry(telemetry, {
            type: 'battle_loss',
            tick: state.tickCount + 1,
            payload: { losses: nextBattle.losses }
          });
        }
      }

      return {
        tickCount: state.tickCount + 1,
        resources: nextResources,
        battle: nextBattle,
        buildings: nextBuildings,
        telemetry
      };
    })
}));

export { BUILDINGS } from './gameLogic';
