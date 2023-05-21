export const UserInputTypeEnum = Object.freeze({
  advance: "advance",
  moveLeft: "moveLeft",
  moveRight: "moveRight",
} as const);
export type UserInputTypeEnum = keyof typeof UserInputTypeEnum;

export class UserInput {
  constructor(
    public type: UserInputTypeEnum,
    public movement: number = 0,
  ) { }
}