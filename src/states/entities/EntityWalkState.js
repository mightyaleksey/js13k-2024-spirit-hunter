/* @flow */

import type { Entity } from '../../entities/Entity'
import { BaseState } from '../BaseState'
import { Direction } from '../../constants'

export class EntityWalkState extends BaseState {
  entity: Entity
  velocity: number

  constructor (entity: Entity) {
    super()
    this.entity = entity
    this.velocity = 30
  }

  enter () {
    this.entity.changeAnimation(this.entity.direction + 4)
  }

  update (dt: number) {
    const direction = this.entity.direction

    switch (direction) {
      case Direction.Top:
        this.entity.y -= this.velocity * dt
        break

      case Direction.Right:
        this.entity.x += this.velocity * dt
        break

      case Direction.Bottom:
        this.entity.y += this.velocity * dt
        break

      case Direction.Left:
        this.entity.x -= this.velocity * dt
        break
    }
  }
}
