/* @flow */

import type { Entity } from '../../entities/Entity'
import { BaseState } from '../BaseState'
import { Dimentions } from '../../engine'
import { Direction } from '../../constants'

export class EntityWalkState extends BaseState {
  entity: Entity
  velocity: number

  constructor (entity: Entity) {
    super()
    this.entity = entity
    this.velocity = 60
  }

  update (dt: number) {
    this.entity.changeAnimation(this.entity.direction + 4)

    const direction = this.entity.direction

    switch (direction) {
      case Direction.Top:
        this.entity.y = Math.max(this.entity.y - this.velocity * dt, 0)
        break

      case Direction.Right:
        this.entity.x = Math.min(
          this.entity.x + this.velocity * dt,
          Dimentions.width - this.entity.width
        )
        break

      case Direction.Bottom:
        this.entity.y = Math.min(
          this.entity.y + this.velocity * dt,
          Dimentions.height - this.entity.height
        )
        break

      case Direction.Left:
        this.entity.x = Math.max(this.entity.x - this.velocity * dt, 0)
        break
    }
  }
}
