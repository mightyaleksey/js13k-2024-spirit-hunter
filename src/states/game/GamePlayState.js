/* @flow */

import type { Entity } from '../../entities/Entity'

import { BaseState } from '../BaseState'
import { Dimentions, translate } from '../../engine'
import { Enemy } from '../../entities/Enemy'
import { Player } from '../../entities/Player'
import { Projectile } from '../../entities/Projectile'
import { TileSize } from '../../shared/constants'
import { Wall } from '../../entities/Wall'
import { collides, forEachRight, random } from '../../util'

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

    const projectiles = []
    forEachRight(this.entities, entity => {
      if (entity instanceof Projectile) {
        projectiles.push(entity)
      } else {
        entity.render()
      }
    })

    projectiles.forEach(entity => entity.render())
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
    const size = 20

    for (let k = 0; k < size; ++k) {
      this.entities.push(new Wall({
        x: k * TileSize,
        y: 0
      }))
      this.entities.push(new Wall({
        x: 0,
        y: k * TileSize
      }))
      this.entities.push(new Wall({
        x: k * TileSize,
        y: (size - 1) * TileSize
      }))
      this.entities.push(new Wall({
        x: (size - 1) * TileSize,
        y: k * TileSize
      }))
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
