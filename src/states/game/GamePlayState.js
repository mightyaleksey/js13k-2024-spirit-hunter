/* @flow */

import type { Entity } from '../../entities/Entity'

import { BaseState } from '../BaseState'
import { Character } from '../../entities/Character'
import { Console } from '../../entities/Console'
import { Damage } from '../../entities/Damage'
import { DebugConsole, TileSize } from '../../shared/constants'
import { Dimentions, translate } from '../../engine'
import { Enemy } from '../../entities/Enemy'
import { MobileControl } from '../../entities/MobileControl'
import { Obstacle } from '../../entities/Obstacle'
import { Player } from '../../entities/Player'
import { Projectile } from '../../entities/Projectile'
import { TileMap } from '../../entities/TileMap'

import { collides, forEachRight, random } from '../../util'

export class GamePlayState extends BaseState {
  tileMap: TileMap
  cameraX: number
  cameraY: number

  console: Console
  mobileControl: MobileControl

  entities: Array<Entity>

  enter () {
    this.tileMap = new TileMap()
    this.cameraX = this.tileMap.startX()
    this.cameraY = this.tileMap.startY()

    if (DebugConsole) this.console = new Console()

    const player = new Player(8 * TileSize + 3, 5 * TileSize)

    this.entities = [player].concat(this.tileMap.obstacles)
    this.genEnemies()

    player.entities = this.entities
  }

  render () {
    this.tileMap.renderBg()
    // emulate camera effect
    translate(-this.cameraX, -this.cameraY)

    this.tileMap.render()
    sortEntities(this.entities).forEach(entity => entity.render())
    if (DebugConsole) this.console.render(this.cameraX, this.cameraY)
  }

  update (dt: number) {
    if (DebugConsole) this.console.update(dt)
    this.tileMap.update(dt)

    forEachRight(this.entities, (entity, j) => {
      entity.update(dt)

      if (entity.isDestroyed) {
        this.entities.splice(j, 1)
      }
    })

    // check collision (time complexity O(n*n))
    // (try Spatial Partition if any perf issues)
    // https://gameprogrammingpatterns.com/spatial-partition.html
    const collidableEntities = this.entities.filter(entity =>
      entity.isCollidable ||
      entity.isSolid)

    collidableEntities.forEach((left, j) => {
      for (let k = j + 1; k < collidableEntities.length; ++k) {
        const right = collidableEntities[k]
        if (!collides(left, right, 1)) continue

        if (left.isSolid && right.isSolid) {
          left.retreate(dt)
          right.retreate(dt)
        }

        if (left.isCollidable && right.isCollidable) {
          left.collided(right)
          right.collided(left)
        }
      }
    })

    const player = this.entities[0]
    // update camera position
    this.cameraX = this.updateCamera(
      this.cameraX,
      player.x,
      0.3 * Dimentions.width,
      0.7 * Dimentions.width
    )
    this.cameraY = this.updateCamera(
      this.cameraY,
      player.y,
      0.3 * Dimentions.height,
      0.7 * Dimentions.height
    )
    this.tileMap.updateViewpoint(
      this.cameraX,
      this.cameraY
    )
  }

  /* helpers */

  genEnemies () {
    for (let i = 0; i < 10; ++i) {
      const enemy = new Enemy(
        random(TileSize, 18 * TileSize),
        random(TileSize, 9 * TileSize)
      )
      enemy.entities = this.entities
      this.entities.push(enemy)
    }
  }

  updateCamera (
    currentValue: number,
    movingPoint: number,
    leftEdge: number,
    rightEdge: number
  ): number {
    // move camera left
    if (movingPoint < currentValue + leftEdge) {
      return movingPoint - leftEdge
    }

    // move camera right
    if (movingPoint > currentValue + rightEdge) {
      return movingPoint - rightEdge
    }

    return currentValue
  }
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
    return left.y - right.y
  })
}
