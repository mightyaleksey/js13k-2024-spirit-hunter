/* @flow */

import type { Character } from '../../entities/Character'

import { BaseState } from '../BaseState'

export class CharacterWalkState extends BaseState {
  entity: Character

  constructor (entity: Character) {
    super()
    this.entity = entity
  }

  enter (input: mixed) {
    const entity = this.entity
    entity.changeAnimation(entity.direction + 8)
  }
}
