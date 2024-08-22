/* @flow */

import type { Character } from '../../entities/Character'

import { BaseState } from '../BaseState'

export class CharacterIdleState extends BaseState {
  entity: Character

  constructor (entity: Character) {
    super()
    this.entity = entity
  }

  enter () {
    this.entity.changeAnimation(0)
  }
}
