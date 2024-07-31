/* @flow */

import type { Entity } from '../../entities/Entity'
import { BaseState } from '../BaseState'

export class EntityIdleState extends BaseState {
  entity: Entity

  constructor (entity: Entity) {
    super()
    this.entity = entity
  }

  enter () {
    this.entity.changeAnimation(this.entity.direction)
  }
}
