
import "./Game.scss";


import { FieldProvider } from "../contexts/Field";
import { RingProvider } from "../contexts/Ring";
import { FieldElement } from "./FieldElement";

const nRings = 5;

interface GameProps {
  onGameEnd: (res: boolean) => void;
}
export function Game(props: GameProps) {

  return (
    <FieldProvider>
      <RingProvider nRings={nRings}>
        <FieldElement />
      </RingProvider>
    </FieldProvider>
  );
}