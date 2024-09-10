/* @flow */

import type { Entity } from '../../entities/Entity'

import { BaseState } from '../BaseState'
import { Character } from '../../entities/Character'
import { Damage } from '../../entities/Damage'
import { Dimentions, translate, draw } from '../../engine'
import { Enemy } from '../../entities/Enemy'
import { Floor } from '../../definitions'
import { Player } from '../../entities/Player'
import { Projectile } from '../../entities/Projectile'
import { TileSize } from '../../shared/constants'
import { Wall } from '../../entities/Wall'

import { collides, forEachRight, random } from '../../util'
import { gameTiles } from '../../shared/game'

export class GamePlayState extends BaseState {
  cameraX: number
  cameraY: number
  maxX: number
  maxY: number

  entities: Array<Entity>

  enter () {
    this.cameraX = 0
    this.cameraY = 0
    this.maxX = 0
    this.maxY = 0

    // keep player first, so we can render it after all entities
    this.entities = [new Player(32, 32)]
    this.genWalls()
    this.genEnemies()

    // $FlowFixMe[prop-missing]: find a way to pass entities in
    this.entities[0].entities = this.entities
  }

  render () {
    // emulate camera effect
    translate(-this.cameraX, -this.cameraY)

    for (let y = 0; y < this.maxY; y += TileSize) {
      for (let x = 0; x < this.maxX; x += TileSize) {
        draw(gameTiles[Floor[(x * y + 1) % Floor.length]], x, y)
      }
    }

    sortEntities(this.entities).forEach(entity => entity.render())
  }

  update (dt: number) {
    forEachRight(this.entities, (entity, j) => {
      entity.update(dt)

      if (entity.isDestroyed) {
        this.entities.splice(j, 1)
      }
    })

    // check collision (time complexity O(n*n))
    // (try Spatial Partition if any perf issues)
    // https://gameprogrammingpatterns.com/spatial-partition.html
    const collidable = this.entities.filter(entity => entity.isCollidable)
    collidable.forEach((left, j) => {
      for (let k = j + 1; k < collidable.length; ++k) {
        const right = collidable[k]
        if (!collides(left, right, 1)) continue

        left.collided(right)
        right.collided(left)
      }
    })

    const player = this.entities[0]
    // update camera position
    this.cameraX = this.updateCamera(
      this.cameraX,
      player.x,
      0.3 * Dimentions.width,
      0.7 * Dimentions.width,
      this.maxX - Dimentions.width
    )
    this.cameraY = this.updateCamera(
      this.cameraY,
      player.y,
      0.3 * Dimentions.height,
      0.7 * Dimentions.height,
      this.maxY - Dimentions.height
    )
  }

  /* helpers */

  genEnemies () {
    for (let i = 0; i < 10; ++i) {
      const enemy = new Enemy(
        random(TileSize, this.maxX - TileSize),
        random(TileSize, this.maxY - TileSize)
      )
      enemy.entities = this.entities
      this.entities.push(enemy)
    }
  }

  genWalls () {
    const entities = this.entities
    const size = 20

    for (let k = 0; k < size; ++k) {
      entities.push(new Wall({
        x: k * TileSize,
        y: 0,
        wallID: k === 0 ? 7 : k === size - 1 ? 1 : 0
      }))

      entities.push(new Wall({
        x: k * TileSize,
        y: (size - 1) * TileSize,
        wallID: k === 0 ? 5 : k === size - 1 ? 3 : 4
      }))

      if (k !== 0 && k !== size - 1) {
        entities.push(new Wall({
          x: 0,
          y: k * TileSize,
          wallID: 6
        }))

        entities.push(new Wall({
          x: (size - 1) * TileSize,
          y: k * TileSize,
          wallID: 2
        }))
      }
    }

    this.maxX = size * TileSize
    this.maxY = size * TileSize
  }

  updateCamera (
    currentValue: number,
    movingPoint: number,
    leftEdge: number,
    rightEdge: number,
    rightMax: number
  ): number {
    // move camera left
    if (movingPoint < currentValue + leftEdge) {
      return Math.max(movingPoint - leftEdge, 0)
    }

    // move camera right
    if (movingPoint > currentValue + rightEdge) {
      return Math.min(movingPoint - rightEdge, rightMax)
    }

    return currentValue
  }
}

// higher value, last render
function genEntityLayer (entity: Entity): number {
  if (entity instanceof Character) return 1
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
    return left.y - right.y
  })
}
