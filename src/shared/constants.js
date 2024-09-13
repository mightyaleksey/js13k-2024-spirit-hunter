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

export const EnemySightRadius = 5

export const BlasterVelocity = 240
export const EnemyVelocity = 70
export const PlayerVelocity = 60

export const DamageDuration = 0.3
export const EnemyWalkDuration = 0.3
export const InvulnerabilityDuration = 0.4
export const LastMomentDuration = 0.2
export const StunDuration = 0.1

export const DebugBB = false
export const DebugConsole = false
export const NoSound = true
