import { useEffect } from 'react';
import { PixiBattlefield } from './PixiBattlefield';
import { useGameStore } from './gameStore';
import './styles.css';

export default function App() {
  const { resources, tickCount, collect, tick } = useGameStore();

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [tick]);

  return (
    <main className="layout">
      <section className="hud">
        <h1>Lw-copy Vertical Slice Start</h1>
        <p>Starting systems: idle economy tick + lane-battle rendering prototype.</p>
        <div className="resourceGrid">
          <span>Food: {resources.food}</span>
          <span>Metal: {resources.metal}</span>
          <span>Energy: {resources.energy}</span>
        </div>
        <p>Simulation Ticks: {tickCount}</p>
        <button onClick={collect} type="button">
          Collect Outpost Supplies
        </button>
      </section>
      <section className="battlefield">
        <PixiBattlefield />
      </section>
    </main>
  );
}
