/* @flow */

import type { Entity } from '../../entities/Entity'

import { BaseState } from '../BaseState'
import { Enemy } from '../../entities/Enemy'
import { Element } from '../../entities/Element'
import { Player } from '../../entities/Player'
import { TileSize } from '../../shared/constants'
import { collides, forEachRight } from '../../util'

export class GamePlayState extends BaseState {
  entities: Array<Entity>
  player: Player

  enter () {
    // keep player first, so we can render it after all entities
    this.entities = [new Player(32, 32)]
    this.genWalls()
    this.genEnemies()
  }

  render () {
    forEachRight(this.entities, entity => entity.render())
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
  }

  /* helpers */

  genEnemies () {
    this.entities.push(new Enemy())
  }

  genWalls () {
    const size = 20

    for (let k = 0; k < size; ++k) {
      this.entities.push(new Element({
        x: k * TileSize,
        y: 0
      }))
      this.entities.push(new Element({
        x: 0,
        y: k * TileSize
      }))
      this.entities.push(new Element({
        x: k * TileSize,
        y: (size - 1) * TileSize
      }))
      this.entities.push(new Element({
        x: (size - 1) * TileSize,
        y: k * TileSize
      }))
    }
  }
}
