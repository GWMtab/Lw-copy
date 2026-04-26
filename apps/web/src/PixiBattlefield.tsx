import { useEffect, useRef } from 'react';
import { Application, Color, Graphics, Text, TextStyle } from 'pixi.js';

type PixiBattlefieldProps = {
  squadHp: number;
  enemyHp: number;
  isBattleActive: boolean;
};

export function PixiBattlefield({ squadHp, enemyHp, isBattleActive }: PixiBattlefieldProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const squadRef = useRef<Graphics | null>(null);
  const enemyRef = useRef<Graphics | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const app = new Application();

    void app
      .init({
        width: 640,
        height: 360,
        background: new Color('#111827'),
        antialias: true
      })
      .then(() => {
        container.appendChild(app.canvas);

        const lane = new Graphics();
        lane.roundRect(40, 150, 560, 64, 12).fill('#1f2937');
        app.stage.addChild(lane);

        const squad = new Graphics();
        squad.circle(120, 182, 22).fill('#22c55e');
        app.stage.addChild(squad);
        squadRef.current = squad;

        const enemy = new Graphics();
        enemy.circle(520, 182, 22).fill('#ef4444');
        app.stage.addChild(enemy);
        enemyRef.current = enemy;

        const style = new TextStyle({
          fill: '#e5e7eb',
          fontSize: 18,
          fontWeight: 'bold'
        });
        const label = new Text({ text: 'Lane Skirmish Prototype', style });
        label.position.set(210, 40);
        app.stage.addChild(label);

        let direction = 1;
        app.ticker.add((delta) => {
          if (!isBattleActive) {
            return;
          }

          squad.x += 0.55 * direction * delta.deltaTime;
          enemy.x -= 0.25 * direction * delta.deltaTime;
          if (squad.x > 260 || squad.x < -10) {
            direction *= -1;
          }
        });
      });

    return () => {
      app.destroy(true, { children: true });
    };
  }, [isBattleActive]);

  useEffect(() => {
    if (squadRef.current) {
      const alpha = Math.max(squadHp / 100, 0.2);
      squadRef.current.alpha = alpha;
    }

    if (enemyRef.current) {
      const alpha = Math.max(enemyHp / 100, 0.2);
      enemyRef.current.alpha = alpha;
    }
  }, [enemyHp, squadHp]);

  return <div ref={containerRef} />;
}
