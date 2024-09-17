/* @flow */

export type CharacterStatsType = $ReadOnlyArray<number>
export type CharacterType = $ReadOnly<{
  frames: $ReadOnlyArray<$ReadOnlyArray<number>>,
  frameInterval: number,
  stats: CharacterStatsType
}>

// top, right, bottom, left
const framesPattern = [19, 13, 1, 7]
function genFrames (offset: number) {
  return framesPattern.concat(framesPattern, framesPattern)
    .map((frame, index) => index < 8
      ? [frame + offset]
      : [frame + offset - 1, frame + offset, frame + offset + 1]
    )
}

export const Characters: $ReadOnly<{[string]: CharacterType}> = {
  player: {
    frames: genFrames(84),
    frameInterval: 0.2,

    // hp, speed, speeedDC, hpMax, hpDC, attack, attackDC
    stats: [130, 60, 0, 130, 0, 50, 3]
  },

  princess: {
    frames: genFrames(87),
    frameInterval: 0.2,
    stats: [1000, 60, 0, 1000, 0, 0, 0]
  },

  spirit1: {
    frames: genFrames(60),
    frameInterval: 0.2,
    stats: [100, 40, 3, 90, 3, 7, 2]
  },

  spirit2: {
    frames: genFrames(63),
    frameInterval: 0.2,
    stats: [100, 35, 3, 90, 3, 11, 2]
  }
}
