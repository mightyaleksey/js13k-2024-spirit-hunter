/* @flow */

import type { CollidableType } from '../util'
import type { Entity } from '../entities/Entity'

import { Dimentions, rect, setColor } from '../engine'
import { Enemy } from '../entities/Enemy'
import { Obstacle } from '../entities/Obstacle'
import { TileSize } from '../shared/constants'

import { collides, forEachRight, random } from '../util'

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
  offsetX: number
  offsetY: number
  viewportWidth: number
  viewportHeight: number
  repeat: number

  level: number

  enemies: Array<Enemy>
  // rendered at the same level as characters
  obstacles: Array<Obstacle>
  // terain is static are rendered below characters
  terrain: Array<Obstacle>

  constructor () {
    this.setViewport()
    this.offsetX = this.startX()
    this.offsetY = this.startY()
    this.repeat = Math.ceil(Math.max(
      this.viewportWidth / patternWidth,
      this.viewportHeight / patternHeight
    ))

    this.level = 1

    this.enemies = []
    this.obstacles = []
    this.terrain = []

    for (let v = 0; v < this.repeat; v++) {
      for (let h = 0; h < this.repeat; h++) {
        for (let k = 0; k < pattern.length; k += 2) {
          const x = (Math.floor(pattern[k] / 100) + h * patternWidth) * TileSize
          const y = ((pattern[k] % 100) + v * patternHeight) * TileSize
          const tileID = pattern[k + 1]

          const tile = new Obstacle({ x, y, tileID })
          ;(tile.isSolid ? this.obstacles : this.terrain).push(tile)
        }
      }
    }

    this.updateMap()
  }

  render () {
    this.terrain.forEach(tile => tile.render())
  }

  update (dt: number) {
    this.setViewport()

    forEachRight(this.enemies, (entity, j) => {
      if (!entity.isDestroyed) return
      this.enemies.splice(j, 1)
    })
  }

  /* helpers */

  genEnemies (entities: Array<Entity>, playerX: number, playerY: number) {
    const maxEnemies = 2 * this.level * this.level + 10

    for (let k = maxEnemies; k--;) {
      const enemy = new Enemy(
        genEnemyPosition(playerX, 4),
        genEnemyPosition(playerY, 4),
        this.level
      )

      enemy.entities = entities
      this.enemies.push(enemy)
      entities.push(enemy)
    }
  }

  renderBg () {
    setColor('#000023')
    rect('fill', 0, 0, Dimentions.width, Dimentions.height)
  }

  setViewport () {
    this.viewportWidth = Math.ceil(Dimentions.width / TileSize)
    this.viewportHeight = Math.ceil(Dimentions.height / TileSize)
  }

  startX (): number {
    return 0.5 * (patternWidth - this.viewportWidth) * TileSize
  }

  startY (): number {
    return 0.5 * (patternHeight - this.viewportHeight) * TileSize + TileSize
  }

  updateEntities (entities: $ReadOnlyArray<Entity>, boundingBox: CollidableType) {
    const stepX = patternWidth * this.repeat * TileSize
    const stepY = patternHeight * this.repeat * TileSize

    entities.forEach(obstacle => {
      if (!collides(obstacle, boundingBox, TileSize)) {
        obstacle.x = updateCoordinate(obstacle.x, stepX, boundingBox.x, boundingBox.width)
        obstacle.y = updateCoordinate(obstacle.y, stepY, boundingBox.y, boundingBox.height)
      }
    })
  }

  updateMap () {
    const boundingBox = {
      x: this.offsetX,
      y: this.offsetY,
      width: this.viewportWidth * TileSize,
      height: this.viewportHeight * TileSize
    }

    this.updateEntities(this.enemies, boundingBox)
    this.updateEntities(this.obstacles, boundingBox)
    this.updateEntities(this.terrain, boundingBox)
  }

  updateViewpoint (cameraX: number, cameraY: number) {
    if (
      this.offsetX !== cameraX ||
      this.offsetY !== cameraY
    ) {
      this.offsetX = cameraX
      this.offsetY = cameraY
      this.updateMap()
    }
  }
}

function genEnemyPosition (origin: number, distance: number): number {
  const offset = (distance + random(5)) * TileSize
  const direction = random(9) > 5 ? 1 : -1
  return origin + direction * offset
}

function updateCoordinate (
  current: number,
  step: number,
  left: number,
  size: number
): number {
  if (current < left - TileSize) {
    return current + step
  } else if (current > left + size) {
    return current - step
  }

  return current
}
