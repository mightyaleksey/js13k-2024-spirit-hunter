/* @flow */

export type DirectionType =
  | 'Bottom'
  | 'Left'
  | 'Right'
  | 'Top'

export type EntityStateType =
  | 'IdleBottom'
  | 'IdleLeft'
  | 'IdleRight'
  | 'IdleTop'
  | 'WalkBottom'
  | 'WalkLeft'
  | 'WalkRight'
  | 'WalkTop'

export const Direction: {[DirectionType]: number} = {
  Bottom: 2,
  Left: 3,
  Right: 1,
  Top: 0
}

export const EntityState: {[EntityStateType]: number} = {
  IdleBottom: 2,
  IdleLeft: 3,
  IdleRight: 1,
  IdleTop: 0,
  WalkBottom: 6,
  WalkLeft: 7,
  WalkRight: 5,
  WalkTop: 4
}

// array index reflects corresponding direction
export const MovementKeys = ['w', 'd', 's', 'a']
