import { Match, Switch, createSignal } from "solid-js";
import { GameStateEnum } from "~/models/GameStateEnum";
import { Game } from "~/apps/CircleBypass/components/Game";
import { Notification } from "~/apps/CircleBypass/components/Notification";
import "./CircleBypass.scss";

export function CircleBypass() {
  const [gameState, setGameState] = createSignal<GameStateEnum>(GameStateEnum.ready);

  function handleGameEnd(won: boolean) {
    setGameState(won ? GameStateEnum.won : GameStateEnum.lost);
  }

  function moveState() {
    if (gameState() === GameStateEnum.inProgress) {
      return;
    }
    setGameState(GameStateEnum.inProgress);
  }

  return (
    <div class="circle-bypass" onClick={moveState}>
      <Game isRunning={gameState() === GameStateEnum.inProgress} onGameEnd={handleGameEnd} />
      <Switch>
        <Match when={gameState() === GameStateEnum.ready}>
          <Notification>
            <button type="button">Start decryption</button>
          </Notification>
        </Match>
        <Match when={gameState() === GameStateEnum.lost}>
          <Notification fail>
            Decryption Failed
          </Notification>
        </Match>
        <Match when={gameState() === GameStateEnum.won}>
          <Notification success>
            Override Succeeeded
          </Notification>
        </Match>
      </Switch>
    </div>
  )
}