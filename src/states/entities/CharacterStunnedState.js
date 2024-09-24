/* @flow */

import type { Character } from '../../entities/Character'

import { BaseState } from '../BaseState'
import { StunDuration } from '../../shared/constants'

export class CharacterStunnedState<T: Character> extends BaseState {
  entity: T
  timer: number

  constructor (entity: T) {
    super()
    this.entity = entity
    this.timer = 0
  }

  enter (input: mixed) {
    const entity = this.entity
    entity.dx = 0
    entity.dy = 0
    entity.changeAnimation(entity.direction + 4)

    // make slightly transparent
    entity.opacity = 0.7
  }

  update (dt: number) {
    this.timer += dt
    if (this.timer >= StunDuration) this.entity.changeState('idle')
  }
}
