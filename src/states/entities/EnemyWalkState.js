/* @flow */

import type { Entity } from '../../entities/Entity'
import { EntityWalkState } from './EntityWalkState'

export class EnemyWalkState extends EntityWalkState {
  entity: Entity
  walkTime: number
  timer: number

  constructor (entity: Entity) {
    super(entity)
    this.entity = entity
    this.walkTime = 1
    this.timer = 0
  }

  update (dt: number) {
    super.update(dt)

    this.timer += dt

    if (this.timer >= this.walkTime) {
      this.entity.changeState('idle')
    }
  }
}
