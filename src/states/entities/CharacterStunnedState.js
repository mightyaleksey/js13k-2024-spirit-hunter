/* @flow */

import type { Character } from '../../entities/Character'

import { BaseState } from '../BaseState'

export class CharacterStunnedState extends BaseState {
  entity: Character

  constructor (entity: Character) {
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
