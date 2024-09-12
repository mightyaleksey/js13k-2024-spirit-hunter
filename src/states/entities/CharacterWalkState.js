/* @flow */

import type { Character } from '../../entities/Character'

import { BaseState } from '../BaseState'

export class CharacterWalkState<T: Character> extends BaseState {
  entity: T

  constructor (entity: T) {
    super()
    this.entity = entity
  }

  enter (input: mixed) {
    const entity = this.entity
    entity.changeAnimation(entity.direction + 8)
  }
}
