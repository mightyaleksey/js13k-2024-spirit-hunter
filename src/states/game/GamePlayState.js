/* @flow */

import type { Entity } from '../../entities/Entity'

import { BaseState } from '../BaseState'
import { Enemy } from '../../entities/Enemy'
import { Player } from '../../entities/Player'
import { collides, forEachRight } from '../../util'

export class GamePlayState extends BaseState {
  entities: Array<Entity>
  player: Player

  enter () {
    // keep player first, so we can render it after all entities
    this.entities = [new Player(), new Enemy()]
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
        if (!collides(left, right)) continue

        left.collided(right)
        right.collided(left)

        if (left.isSolid && right.isSolid) {
          // fix position
        }
      }
    })
  }
}
