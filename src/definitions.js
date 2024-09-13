/* @flow */

export type CharacterStatsType = $ReadOnlyArray<number>
export type CharacterType = $ReadOnly<{
  frames: $ReadOnlyArray<$ReadOnlyArray<number>>,
  frameInterval: number,
  stats: CharacterStatsType
}>

export const CharacterStat = {
  Hp: 0,
  Speed: 1,
  SpeedDC: 2,
  HpMax: 3,
  HpDC: 4,
  Attack: 5,
  AttackDC: 6
}

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

    stats: [130, 60, 0, 130, 0, 50, 14]
  },

  princess: {
    frames: genFrames(87),
    frameInterval: 0.2,
    stats: [1000, 60, 0, 1000, 0, 0, 0]
  },

  spirit1: {
    frames: genFrames(60),
    frameInterval: 0.2,
    stats: [100, 30, 4, 100, 0, 7, 4]
  },

  spirit2: {
    frames: genFrames(63),
    frameInterval: 0.2,
    stats: [100, 25, 3, 100, 0, 11, 2]
  }
}
