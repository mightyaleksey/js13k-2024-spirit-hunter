/* @flow */

import { Dimentions, draw } from '../engine'
import { TileSize } from '../shared/constants'
import { gameTiles } from '../shared/game'
import { Obstacle } from './Obstacle'

/* eslint-disable indent, no-multi-spaces */
const pattern = [
                                                                          800, 21,                                                                      1700, 0,
                    201, 27,          401, 29,          601, 30,          801, 21,          1001, 27, 1101, 46, 1201, 29,           1401, 26,           1601, 11,
                    202, 58,                   502, 46,                   802, 21, 902, 47,                     1202, 58,
                    203, 30, 303, 45, 403, 26,                            803, 19,                              1203, 25, 1303, 47, 1403, 27, 1503, 58,
                                                                 704,  8, 804,  9, 904, 10,                               1304,  7, 1404, 21, 1504, 21, 1604, 21,
           105, 21, 205, 21, 305,  7, 405, 21, 505, 21,          705, 20, 805, 21, 905, 22,           1105, 21, 1205, 21,
           106, 58,                                              706, 32, 806, 33, 906, 34,                                                   1506, 11,
                    207, 28,          407, 26,                                              1007, 26,           1207, 28,           1407, 30,           1607, 45,
    8, 49,                                     508, 58,                   808, 21,                                                            1508, 53,
    9,  0, 109, 25, 209, 27, 309, 51, 409, 30,          609, 28,          809, 21, 909, 44, 1009, 25, 1109, 27, 1209, 30, 1309, 37, 1409, 26,           1609, 50, 1709, 51
]
/* eslint-enable indent */

const patternWidth = 18
const patternHeight = 10

export class TileMap {
  obstacles: Array<Obstacle>
  terrain: Array<Obstacle>

  constructor () {
    this.obstacles = []
    this.terrain = []

    const repeat = 2
    for (let v = 0; v < repeat; v++) {
      for (let h = 0; h < repeat; h++) {
        for (let k = 0; k < pattern.length; k += 2) {
          const x = (Math.floor(pattern[k] / 100) + h * patternWidth) * TileSize
          const y = ((pattern[k] % 100) + v * patternHeight) * TileSize
          const tileID = pattern[k + 1]

          const tile = new Obstacle({ x, y, tileID })

          if (tile.isSolid) {
            this.obstacles.push(tile)
          } else {
            this.terrain.push(tile)
          }
        }
      }
    }
  }

  render () {
    for (let y = 0; y < Dimentions.height; y += TileSize) {
      for (let x = 0; x < Dimentions.width; x += TileSize) {
        draw(gameTiles[59], x, y)
      }
    }

    this.terrain.forEach(tile => tile.render())
  }

  update (dt: number) {}
}
