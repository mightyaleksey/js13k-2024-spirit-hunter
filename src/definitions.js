/* @flow */

export type CharacterStatsType = $ReadOnlyArray<number>
export type CharacterType = $ReadOnly<{
  frames: $ReadOnlyArray<$ReadOnlyArray<number>>,
  frameInterval: number,
  stats: CharacterStatsType
}>

export const CharacterStat = {
  Speed: 0,
  SpeedDC: 1,
  Hp: 2,
  HpDC: 3,
  Attack: 4,
  AttackDC: 5
}

export const Characters: $ReadOnly<{[string]: CharacterType}> = {
  player: {
    frames: [
      [166], // death-top
      [151], // death-right
      [121], // death-bottom
      [136], // death-left
      [166], // idle-top
      [151], // idle-right
      [121], // idle-bottom
      [136], // idle-left
      [165, 166, 167, 166], // walk-top
      [150, 151, 152, 151], // walk-right
      [120, 121, 122, 121], // walk-bottom
      [135, 136, 137, 136] // walk-left
    ],
    frameInterval: 0.2,

    stats: [60, 0, 100, 3, 100, 3]
  },

  spirit1: {
    frames: [
      [178],
      [163],
      [148],
      [133],
      [178],
      [163],
      [148],
      [133],
      [177, 178, 179, 178],
      [162, 163, 164, 163],
      [132, 133, 134, 133],
      [147, 148, 149, 148]
    ],
    frameInterval: 0.2,
    stats: [60, 0, 100, 50, 20, 2]
  },

  spirit2: {
    frames: [
      [169],
      [154],
      [139],
      [124],
      [169],
      [154],
      [139],
      [124],
      [168, 169, 170, 169],
      [153, 154, 155, 154],
      [123, 124, 125, 124],
      [138, 139, 140, 139]
    ],
    frameInterval: 0.2,
    stats: [60, 0, 100, 50, 20, 2]
  },

  spirit3: {
    frames: [
      [118],
      [103],
      [88],
      [73],
      [118],
      [103],
      [88],
      [73],
      [117, 118, 119, 118],
      [102, 103, 104, 103],
      [72, 73, 74, 73],
      [87, 88, 89, 88]
    ],
    frameInterval: 0.2,
    stats: [60, 0, 100, 50, 20, 2]
  }
}

export const Doors: $ReadOnlyArray<number> = []
export const Floor: $ReadOnlyArray<number> = [
  126,
  127,
  128,
  129,
  130,
  131,
  132,
  145,
  146,
  147,
  148,
  150,
  151,
  164,
  165
]
export const Walls: $ReadOnlyArray<number> = [
  159,
  124,
  139,
  143,
  121,
  142,
  141,
  123
]
