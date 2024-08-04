/* @flow */

import { TileSize } from './constants'

export class TileMap {
  mapWidth: number
  mapHeight: number

  constructor () {
    this.mapWidth = 40
    this.mapHeight = 30
  }

  render () {
    for (let y = 0; y < this.mapHeight; y++) {
      for (let x = 0; x < this.mapWidth; x++) {
        draw(
          gTextures.tiles[28],
          x * TileSize,
          y * TileSize
        )
      }
    }
  }
}
