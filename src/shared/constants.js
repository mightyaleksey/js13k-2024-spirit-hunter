/* @flow */

export const CharacterAttack = 5
export const CharacterAttackDC = 6
export const CharacterHp = 1
export const CharacterHpDC = 4
export const CharacterHpMax = 3
export const CharacterSpeed = 1
export const CharacterSpeedDC = 2

export const DirectionBottom = 2
export const DirectionLeft = 3
export const DirectionRight = 1
export const DirectionTop = 0

// array index reflects corresponding direction
// top, right, bottom, left
export const MovementKeys = ['w', 'd', 's', 'a']

// array index reflects corresponding direction
// top, right, bottom, left
export const UnitVectors = [[0, -1], [1, 0], [0, 1], [-1, 0]]

export const TileSize = 16

export const EnemySightRadius = 5

export const BlasterVelocity = 280

export const DamageDuration = 0.3
export const EnemyWalkDuration = 0.3
export const InvulnerabilityDuration = 0.4
export const LastMomentDuration = 0.2
export const StunDuration = 0.1

export const DebugBB = false
export const DebugConsole = false
export const NoSound = false
