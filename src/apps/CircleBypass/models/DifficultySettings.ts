export interface ObstaclePerRing {
  dynamicObstacles: number
  staticObstacles: number
}

export function nObst(dn: number, st: number): ObstaclePerRing {
  return {
    dynamicObstacles: dn,
    staticObstacles: st,
  }
}

export type DifficultySpecifier = [ObstaclePerRing, ObstaclePerRing, ObstaclePerRing, ObstaclePerRing];

export enum DifficultySettingsEnum {
  dummy,
  easy,
  medium,
  hard
}

export const difficultySettings: Record<DifficultySettingsEnum, DifficultySpecifier> = {
  [DifficultySettingsEnum.dummy]: [nObst(0, 0), nObst(0, 0), nObst(0, 0), nObst(0, 0)],
  [DifficultySettingsEnum.easy]: [nObst(2, 2), nObst(2, 1), nObst(4, 2), nObst(5, 4)],
  // TODO
  [DifficultySettingsEnum.medium]: [nObst(2, 2), nObst(2, 1), nObst(4, 2), nObst(5, 4)],
  [DifficultySettingsEnum.hard]: [nObst(2, 2), nObst(2, 1), nObst(4, 2), nObst(5, 4)],
}