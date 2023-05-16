import type { Fish } from "./Fish"

export type GameResult = {
  success: false,
} | {
  success: true,
  prize: Fish
}