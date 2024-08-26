/* @flow */

import type { Character } from '../../entities/Character'

import { BaseState } from '../BaseState'

export class CharacterDeathState extends BaseState {
  entity: Character
  timer: number
  timerDuration: number

  constructor (entity: Character) {
    super()
    this.entity = entity
  }

  enter () {
    const entity = this.entity
    // stop movement
    entity.dx = 0
    entity.dy = 0
    // stop collision
    entity.isCollidable = false
    entity.isSolid = false

    this.timer = 0
    this.timerDuration = 0.1
  }

  update (dt: number) {
    this.timer += dt
    if (this.timer > this.timerDuration) this.entity.isDestroyed = true
  }
}
