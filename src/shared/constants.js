/* @flow */

export const Direction = {
  Bottom: 2,
  Left: 3,
  Right: 1,
  Top: 0
}

// array index reflects corresponding direction
// top, right, bottom, left
export const MovementKeys = ['w', 'd', 's', 'a']

// array index reflects corresponding direction
// top, right, bottom, left
export const UnitVectors = [[0, -1], [1, 0], [0, 1], [-1, 0]]

export const TileSize = 16

export const EnemyVelocity = 70
export const PlayerVelocity = 60

export const DebugBB = false
export const DebugConsole = true
export const NoSound = false
