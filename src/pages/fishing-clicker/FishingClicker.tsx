import { Match, Switch, createSignal } from "solid-js";
import { GameStateEnum } from "../../models/GameStateEnum";
import { ReadyScreen } from "./ReadyScreen";
import type { Fish } from "./models/Fish";
import type { GameResult } from "./models/GameResult";
import { Game } from "./Game";

export function FishingClicker() {
  const [gameState, setGameState] = createSignal(GameStateEnum.ready);
  const [prize, setPrize] = createSignal<Fish | undefined>();

  const handleGameStart = () => {
    setPrize(undefined);
    setGameState(GameStateEnum.inProgress);
  }

  const handleGameEnd = (res: GameResult) => {
    if (res.success) {
      setPrize(res.prize);
      setGameState(GameStateEnum.won);
    } else {
      setGameState(GameStateEnum.lost);
    }
  }

  return (
    <div class="fishing-clicker">
      <Switch fallback={<ReadyScreen onGameStart={handleGameStart} />}>
        <Match when={gameState() === GameStateEnum.inProgress}>
          <Game onGameEnd={handleGameEnd} />
        </Match>
        <Match when={gameState() === GameStateEnum.lost}>
          TODO
        </Match>
        <Match when={gameState() === GameStateEnum.won}>
          prize: {prize()?.name}
        </Match>
      </Switch>
    </div>
  )
}