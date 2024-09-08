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
      [106], // death-top
      [91], // death-right
      [61], // death-bottom
      [76], // death-left
      [106], // idle-top
      [91], // idle-right
      [61], // idle-bottom
      [76], // idle-left
      [105, 106, 107, 106], // walk-top
      [90, 91, 92, 91], // walk-right
      [60, 61, 62, 61], // walk-bottom
      [75, 76, 77, 76] // walk-left
    ],
    frameInterval: 0.2,

    stats: [60, 0, 100, 3, 100, 3]
  },

  spirit1: {
    frames: [
      [118], // death-top
      [103], // death-right
      [88], // death-bottom
      [73], // death-left
      [118], // idle-top
      [103], // idle-right
      [88], // idle-bottom
      [73], // idle-left
      [117, 118, 119, 118], // walk-top
      [102, 103, 104, 103], // walk-right
      [72, 73, 74, 73], // walk-bottom
      [87, 88, 89, 88] // walk-left
    ],
    frameInterval: 0.2,
    stats: [60, 0, 100, 50, 20, 2]
  },

  spirit2: {
    frames: [
      [109],
      [94],
      [79],
      [64],
      [109],
      [94],
      [79],
      [64],
      [108, 109, 110, 109],
      [93, 94, 95, 94],
      [63, 64, 65, 64],
      [78, 79, 80, 79]
    ],
    frameInterval: 0.2,
    stats: [60, 0, 100, 50, 20, 2]
  },

  spirit3: {
    frames: [
      [58],
      [43],
      [28],
      [13],
      [58],
      [43],
      [28],
      [13],
      [57, 58, 59, 58],
      [42, 43, 44, 43],
      [12, 13, 14, 13],
      [27, 28, 29, 28]
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
