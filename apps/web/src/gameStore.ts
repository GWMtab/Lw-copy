import { create } from 'zustand';

type ResourceKey = 'food' | 'metal' | 'energy';

type GameState = {
  resources: Record<ResourceKey, number>;
  tickCount: number;
  collect: () => void;
  tick: () => void;
};

const TICK_GAIN: Record<ResourceKey, number> = {
  food: 1,
  metal: 1,
  energy: 1
};

export const useGameStore = create<GameState>((set) => ({
  resources: {
    food: 100,
    metal: 100,
    energy: 100
  },
  tickCount: 0,
  collect: () =>
    set((state) => ({
      resources: {
        food: state.resources.food + 25,
        metal: state.resources.metal + 20,
        energy: state.resources.energy + 15
      }
    })),
  tick: () =>
    set((state) => ({
      tickCount: state.tickCount + 1,
      resources: {
        food: state.resources.food + TICK_GAIN.food,
        metal: state.resources.metal + TICK_GAIN.metal,
        energy: state.resources.energy + TICK_GAIN.energy
      }
    }))
}));
