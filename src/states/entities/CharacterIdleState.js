/* @flow */

import type { Character } from '../../entities/Character'

import { BaseState } from '../BaseState'

export class CharacterIdleState<T: Character> extends BaseState {
  entity: T

  constructor (entity: T) {
    super()
    this.entity = entity
  }

  enter (input: mixed) {
    const entity = this.entity
    entity.dx = 0
    entity.dy = 0
    entity.changeAnimation(entity.direction + 4)
  }
}
