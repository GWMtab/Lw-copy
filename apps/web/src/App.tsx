import { useEffect } from 'react';
import { PixiBattlefield } from './PixiBattlefield';
import { useGameStore } from './gameStore';
import './styles.css';

export default function App() {
  const { resources, tickCount, battle, collect, recruitTroop, startBattle, tick } = useGameStore();

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
        <p>Idle economy + lightweight auto-battle with squad growth.</p>
        <div className="resourceGrid">
          <span>Food: {resources.food}</span>
          <span>Metal: {resources.metal}</span>
          <span>Energy: {resources.energy}</span>
        </div>

        <div className="battleStats">
          <h2>Skirmish Ops</h2>
          <p>Simulation Ticks: {tickCount}</p>
          <p>Squad Power: {battle.squadPower}</p>
          <p>Squad HP: {battle.squadHp}</p>
          <p>Enemy HP: {battle.enemyHp}</p>
          <p>
            Record: {battle.wins}W - {battle.losses}L
          </p>
          <p>Status: {battle.isBattleActive ? 'In Battle' : 'Ready'}</p>
        </div>

        <div className="actions">
          <button onClick={collect} type="button">
            Collect Outpost Supplies
          </button>
          <button onClick={recruitTroop} type="button">
            Recruit Troop (40 Food / 25 Metal / 15 Energy)
          </button>
          <button disabled={battle.isBattleActive} onClick={startBattle} type="button">
            {battle.isBattleActive ? 'Battle In Progress...' : 'Launch Skirmish'}
          </button>
        </div>
      </section>

      <section className="battlefield">
        <PixiBattlefield
          enemyHp={battle.enemyHp}
          isBattleActive={battle.isBattleActive}
          squadHp={battle.squadHp}
        />
      </section>
    </main>
  );
}
