import type { GameResult } from "../models/GameResult";
import "./Game.css";

interface GameProps {
  onGameEnd: (res: GameResult) => void;
}

export function Game(props: GameProps) {
  return (
    <div class="fishing-clicker-game">
      <div class="fishing-clicker-game__scale"></div>
      <div class="fishing-clicker-game__current-marker">
        {/* TODO: Figure out how velocity icons work */}
      </div>
    </div>
  )
}