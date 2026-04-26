import { useEffect } from 'react';
import { PixiBattlefield } from './PixiBattlefield';
import { BUILDINGS, useGameStore } from './gameStore';
import './styles.css';

export default function App() {
  const {
    resources,
    tickCount,
    battle,
    telemetry,
    buildings,
    collect,
    recruitTroop,
    startBattle,
    startBuildingUpgrade,
    canStartBuildingUpgrade,
    tick,
    canRecruit
  } = useGameStore();

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [tick]);

  const recruitDisabled = !canRecruit() || battle.isBattleActive;

  return (
    <main className="layout">
      <section className="hud">
        <h1>Lw-copy Vertical Slice Start</h1>
        <p>Idle economy + lightweight auto-battle with building progression.</p>
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
          <p>Last Outcome: {battle.lastOutcome}</p>
        </div>

        <div className="actions">
          <button onClick={collect} type="button">
            Collect Outpost Supplies
          </button>
          <button disabled={recruitDisabled} onClick={recruitTroop} type="button">
            Recruit Troop (40 Food / 25 Metal / 15 Energy)
          </button>
          <button disabled={battle.isBattleActive} onClick={startBattle} type="button">
            {battle.isBattleActive ? 'Battle In Progress...' : 'Launch Skirmish'}
          </button>
        </div>

        <div className="buildingPanel">
          <h3>Base Development</h3>
          <ul>
            {BUILDINGS.map((definition) => {
              const building = buildings[definition.id];
              return (
                <li key={definition.id}>
                  <div>
                    <strong>{definition.name}</strong> L{building.level}
                    {building.upgradingTo !== null ? ` → L${building.upgradingTo} (${building.remainingSec}s)` : ''}
                  </div>
                  <button
                    disabled={!canStartBuildingUpgrade(definition.id)}
                    onClick={() => startBuildingUpgrade(definition.id)}
                    type="button"
                  >
                    Upgrade
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="telemetryPanel">
          <h3>Recent Telemetry</h3>
          {telemetry.length === 0 ? (
            <p>No events yet.</p>
          ) : (
            <ul>
              {telemetry
                .slice()
                .reverse()
                .map((event) => (
                  <li key={event.id}>
                    <strong>{event.type}</strong> @ tick {event.tick}
                  </li>
                ))}
            </ul>
          )}
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
