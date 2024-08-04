/* @flow */

export type EntityDefinitionType = $ReadOnly<{
  frames: $ReadOnlyArray<$ReadOnlyArray<number>>,
  frameTime: number,
}>

export const entityDefinitions: {[string]: EntityDefinitionType} = {
  player: {
    frames: [
      [25], // idle-top
      [26], // idle-right
      [24], // idle-bottom
      [23], // idle-left
      [52, 25, 79, 25], // walk-top
      [53, 26, 80, 26], // walk-right
      [51, 24, 78, 24], // walk-bottom
      [50, 23, 77, 23], // walk-left
      [25], // shooting-top
      [26], // shooting-right
      [24], // shooting-bottom
      [23] // shooting-left
    ],
    frameTime: 0.2
  },

  woman1: {
    frames: [
      [106], // idle-top
      [107], // idle-right
      [105], // idle-bottom
      [104], // idle-left
      [133, 106, 160, 106], // walk-top
      [134, 107, 161, 107], // walk-right
      [132, 105, 159, 105], // walk-bottom
      [131, 104, 158, 104] // walk-left
    ],
    frameTime: 0.2
  },

  woman2: {
    frames: [
      [430], // idle-top
      [431], // idle-right
      [429], // idle-bottom
      [428], // idle-left
      [457, 430, 484, 430], // walk-top
      [458, 431, 485, 431], // walk-right
      [456, 429, 483, 429], // walk-bottom
      [455, 428, 482, 428] // walk-left
    ],
    frameTime: 0.2
  }
}
