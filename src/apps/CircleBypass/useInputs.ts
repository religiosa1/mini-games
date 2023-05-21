import { Accessor, createEffect, createSignal } from "solid-js";
import { UserInput, UserInputTypeEnum } from "~/apps/CircleBypass/models/UserInputs";

enum KeyMovementEnum {
  none,
  left,
  right,
};

const moveKeys: Record<UserInputTypeEnum, string[]> = {
  [UserInputTypeEnum.advance]: ["Space", "KeyW", "Enter"],
  [UserInputTypeEnum.moveLeft]: ["KeyA", "ArrowLeft"],
  [UserInputTypeEnum.moveRight]: ["KeyD", "ArrowRight"],
};

export function useInputs(isRunning: Accessor<boolean>) {
  const [keyMovement, setKeyMovement] = createSignal<KeyMovementEnum>(KeyMovementEnum.none);
  const [advance, setAdvance] = createSignal(false);

  function keydownEventHandler(e: KeyboardEvent) {
    if (e.repeat) {
      return;
    }
    for (const [type, keys] of Object.entries(moveKeys)) {
      if (keys.includes(e.code)) {
        switch (type) {
          case UserInputTypeEnum.advance:
            advanceCursor()
            return;
          case UserInputTypeEnum.moveLeft:
            setKeyMovement(KeyMovementEnum.left);
            return;
          case UserInputTypeEnum.moveRight:
            setKeyMovement(KeyMovementEnum.right);
            return;
        }
      }
    }
  }

  function keyupEventHandler(e: KeyboardEvent) {
    if (keyMovement() === KeyMovementEnum.left && moveKeys[UserInputTypeEnum.moveLeft].includes(e.code)) {
      setKeyMovement(KeyMovementEnum.none);
    }
    if (keyMovement() === KeyMovementEnum.right && moveKeys[UserInputTypeEnum.moveRight].includes(e.code)) {
      setKeyMovement(KeyMovementEnum.none);
    }
  }

  createEffect(() => {
    if (isRunning()) {
      document.addEventListener("keydown", keydownEventHandler);
      document.addEventListener("keyup", keyupEventHandler);
    } else {
      document.removeEventListener("keydown", keydownEventHandler);
      document.removeEventListener("keyup", keyupEventHandler);
    }
    return () => {
      document.removeEventListener("keydown", keydownEventHandler);
      document.removeEventListener("keyup", keyupEventHandler);
    }
  });

  function advanceCursor(): void {
    setAdvance(true);
  }

  function clear(): void {
    setAdvance(false);
  }

  function get(): UserInput[] {
    const retval: UserInput[] = [];
    if (advance()) {
      retval.push(new UserInput("advance"));
    }
    const km = keyMovement();
    if (km === KeyMovementEnum.left) {
      retval.push(new UserInput("moveLeft"));
    }
    if (km === KeyMovementEnum.right) {
      retval.push(new UserInput("moveRight"));
    }
    return retval;
  }

  return { get, clear, advanceCursor };
}