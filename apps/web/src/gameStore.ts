import { create } from 'zustand';

type ResourceKey = 'food' | 'metal' | 'energy';

type BattleState = {
  squadPower: number;
  enemyPower: number;
  squadHp: number;
  enemyHp: number;
  wins: number;
  losses: number;
  isBattleActive: boolean;
};

type GameState = {
  resources: Record<ResourceKey, number>;
  tickCount: number;
  battle: BattleState;
  collect: () => void;
  recruitTroop: () => void;
  startBattle: () => void;
  tick: () => void;
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
  isBattleActive: false
};

const RECRUIT_COST: Record<ResourceKey, number> = {
  food: 40,
  metal: 25,
  energy: 15
};

const canAfford = (resources: Record<ResourceKey, number>) =>
  resources.food >= RECRUIT_COST.food &&
  resources.metal >= RECRUIT_COST.metal &&
  resources.energy >= RECRUIT_COST.energy;

export const useGameStore = create<GameState>((set) => ({
  resources: {
    food: 100,
    metal: 100,
    energy: 100
  },
  tickCount: 0,
  battle: INITIAL_BATTLE,
  collect: () =>
    set((state) => ({
      resources: {
        food: state.resources.food + 25,
        metal: state.resources.metal + 20,
        energy: state.resources.energy + 15
      }
    })),
  recruitTroop: () =>
    set((state) => {
      if (!canAfford(state.resources)) {
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
        }
      };
    }),
  startBattle: () =>
    set((state) => ({
      battle: {
        ...state.battle,
        squadHp: 100,
        enemyHp: 100,
        enemyPower: 7 + Math.floor(state.tickCount / 30),
        isBattleActive: true
      }
    })),
  tick: () =>
    set((state) => {
      const nextResources: Record<ResourceKey, number> = {
        food: state.resources.food + TICK_GAIN.food,
        metal: state.resources.metal + TICK_GAIN.metal,
        energy: state.resources.energy + TICK_GAIN.energy
      };

      const nextBattle = { ...state.battle };

      if (nextBattle.isBattleActive) {
        nextBattle.enemyHp = Math.max(nextBattle.enemyHp - nextBattle.squadPower, 0);
        if (nextBattle.enemyHp === 0) {
          nextBattle.isBattleActive = false;
          nextBattle.wins += 1;
          return {
            tickCount: state.tickCount + 1,
            resources: {
              food: nextResources.food + 50,
              metal: nextResources.metal + 35,
              energy: nextResources.energy + 20
            },
            battle: nextBattle
          };
        }

        nextBattle.squadHp = Math.max(nextBattle.squadHp - nextBattle.enemyPower, 0);
        if (nextBattle.squadHp === 0) {
          nextBattle.isBattleActive = false;
          nextBattle.losses += 1;
        }
      }

      return {
        tickCount: state.tickCount + 1,
        resources: nextResources,
        battle: nextBattle
      };
    })
}));
