/* @flow */

import type { CollidableType } from '../util'
import type { Entity } from '../entities/Entity'

import {
  CharacterAttackDC,
  CharacterHpDC,
  CharacterSpeedDC,
  TileSize
} from '../shared/constants'
import { Character } from '../entities/Character'
import { Damage } from '../entities/Damage'
import { Dimentions, rect, setColor, translate } from '../engine'
import { Enemy } from '../entities/Enemy'
import { FirstAid } from '../entities/FirstAid'
import { Obstacle } from '../entities/Obstacle'
import { Player } from '../entities/Player'
import { Projectile } from '../entities/Projectile'

import { collides, forEachRight, createRandom, random } from '../util'

const patternWidth = 18
const patternHeight = 10
const random10 = createRandom(10)

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

export class TileMap {
  cameraX: number
  cameraY: number
  viewportWidth: number
  viewportHeight: number
  patternRepeat: number

  enemies: number
  level: number

  entities: Array<Entity>
  terrain: Array<Obstacle>
  player: Player

  constructor () {
    this.updateViewport()
    this.cameraX = this.centerX()
    this.cameraY = this.centerY()
    this.patternRepeat = Math.ceil(Math.max(
      this.viewportWidth / patternWidth,
      this.viewportHeight / patternHeight
    ))

    this.enemies = 0
    this.level = 1

    this.entities = [new Player(8 * TileSize + 3, 5 * TileSize)]
    this.terrain = []

    this.player = this.entities[0]
    this.player.entities = this.entities

    this.genMap()
    this.updateMap()
  }

  render () {
    setColor('#000023')
    rect('fill', 0, 0, Dimentions.width, Dimentions.height)

    // emulate camera effect
    translate(-this.cameraX, -this.cameraY)

    this.terrain.forEach(entity => entity.render())
    sortEntities(this.entities).forEach(entity => entity.render())

    // restore camera
    translate(this.cameraX, this.cameraY)
  }

  update (dt: number) {
    this.updateViewport()

    forEachRight(this.entities, (entity, j) => {
      entity.update(dt)

      if (!entity.isDestroyed) return
      this.entities.splice(j, 1)

      if (entity instanceof Enemy) {
        this.enemies--

        const exp = this.level * (
          entity.stats[CharacterAttackDC] +
          entity.stats[CharacterHpDC] +
          entity.stats[CharacterSpeedDC]
        )

        this.player.getExp(exp)

        if (random10() > 7) {
          this.entities.push(
            new FirstAid(
              entity.x + 3,
              entity.y + 3
            )
          )
        }
      }
    })
  }

  /* helpers */

  centerX (): number {
    return 0.5 * (patternWidth - this.viewportWidth) * TileSize
  }

  centerY (): number {
    return 0.5 * (patternHeight - this.viewportHeight) * TileSize
  }

  genEnemies (playerX: number, playerY: number) {
    const maxEnemies = this.enemies = 2 * this.level * this.level + 10

    for (let k = maxEnemies; k--;) {
      const enemy = new Enemy(
        genEnemyPosition(playerX, 4),
        genEnemyPosition(playerY, 4),
        this.level
      )

      enemy.entities = this.entities
      this.entities.push(enemy)
    }
  }

  genMap () {
    for (let v = 0; v < this.patternRepeat; v++) {
      for (let h = 0; h < this.patternRepeat; h++) {
        for (let k = 0; k < pattern.length; k += 2) {
          const x = (Math.floor(pattern[k] / 100) + h * patternWidth) * TileSize
          const y = ((pattern[k] % 100) + v * patternHeight) * TileSize
          const tileID = pattern[k + 1]

          const tile = new Obstacle({ x, y, tileID })
          ;(tile.isSolid ? this.entities : this.terrain).push(tile)
        }
      }
    }
  }

  remapEntities (entities: $ReadOnlyArray<Entity>, boundingBox: CollidableType) {
    const stepX = patternWidth * this.patternRepeat * TileSize
    const stepY = patternHeight * this.patternRepeat * TileSize

    entities.forEach(entity => {
      if (!collides(entity, boundingBox, TileSize)) {
        entity.x = updateCoordinate(
          entity.x,
          stepX,
          boundingBox.x,
          boundingBox.width
        )
        entity.y = updateCoordinate(
          entity.y,
          stepY,
          boundingBox.y,
          boundingBox.height
        )
      }
    })
  }

  updateCamera (cameraX: number, cameraY: number) {
    if (
      this.cameraX !== cameraX ||
      this.cameraY !== cameraY
    ) {
      this.cameraX = cameraX
      this.cameraY = cameraY
      this.updateMap()
    }
  }

  updateMap () {
    const boundingBox = {
      x: this.cameraX,
      y: this.cameraY,
      width: this.viewportWidth * TileSize,
      height: this.viewportHeight * TileSize
    }

    this.remapEntities(this.entities, boundingBox)
    this.remapEntities(this.terrain, boundingBox)
  }

  updateViewport () {
    this.viewportWidth = Math.ceil(Dimentions.width / TileSize)
    this.viewportHeight = Math.ceil(Dimentions.height / TileSize)
  }
}

function genEnemyPosition (origin: number, distance: number): number {
  const offset = (distance + random(5)) * TileSize
  const direction = random(9) > 5 ? 1 : -1
  return origin + direction * offset
}

// higher value, last render
function genEntityLayer (entity: Entity): number {
  if (entity instanceof Character) return 1
  if (entity instanceof Obstacle) return 1
  if (entity instanceof Projectile) return 2
  if (entity instanceof Damage) return 3
  return 0
}

function sortEntities (
  entities: $ReadOnlyArray<Entity>
): $ReadOnlyArray<Entity> {
  return entities.slice().sort((left, right) => {
    const leftLayer = genEntityLayer(left)
    const rightLayer = genEntityLayer(right)
    if (leftLayer !== rightLayer) return leftLayer - rightLayer
    if (left.y !== right.y) return left.y - right.y
    return left.x - right.x
  })
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
