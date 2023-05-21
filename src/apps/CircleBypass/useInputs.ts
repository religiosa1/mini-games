import { createEffect, createSignal } from "solid-js";
import { UserInput } from "~/apps/CircleBypass/models/UserInputs";

export function useInputs() {
  const [inputs, setInputs] = createSignal<UserInput[]>([]);

  function keydownEventHandler(e: KeyboardEvent) {
    switch (e.code) {
      case 'Space':
      case 'KeyW':
      case 'Enter':
        advanceCursor();
    }
  }

  createEffect(() => {
    document.addEventListener("keydown", keydownEventHandler);
    return () => { document.removeEventListener("keydown", keydownEventHandler) }
  });

  function advanceCursor() {
    setInputs(v => [...v, new UserInput("advance")]);
  }

  function clear() {
    setInputs([]);
  }

  return { get: inputs, clear, advanceCursor };
}