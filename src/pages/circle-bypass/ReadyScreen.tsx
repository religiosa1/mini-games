interface ReadyScreenProps {
  onGameStart: () => void;
}
export function ReadyScreen(props: ReadyScreenProps) {
  return (
    <div class="fishing-clicker__ready-screen">
      <button type="button" onClick={props.onGameStart}>
        Start the game
      </button>
    </div>
  );
}