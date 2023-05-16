import { Match, Switch, createSignal } from "solid-js";
import { GameStateEnum } from "src/models/GameStateEnum";
import { Game } from "./Game";

export function CircleBypass() {
  const [gameState, setGameState] = createSignal(GameStateEnum.ready);

  const handleGameStart = () => {
    setGameState(GameStateEnum.inProgress);
  }

  const handleGameEnd = (res: boolean) => {
    if (res) {
      setGameState(GameStateEnum.won);
    } else {
      setGameState(GameStateEnum.lost);
    }
  }


  return (
    <div class="circle-bypass">
      <Game onGameEnd={handleGameEnd} />
    </div>
  )
}