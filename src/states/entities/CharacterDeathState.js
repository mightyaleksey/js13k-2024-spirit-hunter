/* @flow */

import type { Character } from '../../entities/Character'

import { BaseState } from '../BaseState'
import { LastMomentDuration } from '../../shared/constants'

import { playSound } from '../../shared/sound'

export class CharacterDeathState<T: Character> extends BaseState {
  entity: T
  timer: number

  constructor (entity: T) {
    super()
    this.entity = entity
  }

  enter (input: mixed) {
    const entity = this.entity
    // stop movement
    entity.dx = 0
    entity.dy = 0
    // stop collision
    entity.isCollidable = false
    entity.isSolid = false
    entity.changeAnimation(entity.direction)

    this.timer = 0

    playSound('death')
  }

  update (dt: number) {
    this.timer += dt
    if (this.timer > LastMomentDuration) this.entity.isDestroyed = true
  }
}
