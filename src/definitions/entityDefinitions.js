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
      [50, 23, 77, 23] // walk-left
    ],
    frameTime: 0.3
  }
}
