import { Match, Show, Switch, createSignal } from "solid-js";
import { GameStateEnum } from "~/models/GameStateEnum";
import { Game } from "~/apps/CircleBypass/components/Game";
import { Notification } from "~/apps/CircleBypass/components/Notification";
import "./CircleBypass.scss";

export function CircleBypass() {
  const [gameState, setGameState] = createSignal<GameStateEnum>(GameStateEnum.ready);
  const [timeoutDisable, setTimeoutDisable] = createSignal(false);

  function handleGameEnd(won: boolean) {
    setGameState(won ? GameStateEnum.won : GameStateEnum.lost);
    setTimeoutDisable(true);
    setTimeout(() => setTimeoutDisable(false), 1000);
  }

  function moveState() {
    if (gameState() === GameStateEnum.inProgress) {
      return;
    }
    setGameState(GameStateEnum.inProgress);
  }

  return (
    <div class="circle-bypass">
      <Game isRunning={gameState() === GameStateEnum.inProgress} onGameEnd={handleGameEnd} />
      <Show when={gameState() !== GameStateEnum.inProgress}>
        <button type="button" disabled={timeoutDisable()} class="circle-bypass__overlay" onClick={moveState}>
          <Switch>
            <Match when={gameState() === GameStateEnum.ready}>
              <Notification>
                Start decryption
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
        </button>
      </Show>
    </div>
  )
}