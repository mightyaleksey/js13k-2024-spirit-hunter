/* @flow */

import type { Player } from '../../entities/Player'

import { CharacterStat } from '../../definitions'
import { CharacterWalkState } from './CharacterWalkState'
import { Keys } from '../../engine'
import { MovementKeys, UnitVectors } from '../../shared/constants'

export class PlayerWalkState extends CharacterWalkState<Player> {
  update (dt: number) {
    const joystick = this.entity.joystick
    const direction = joystick.direction > -1
      ? joystick.direction
      : MovementKeys.findIndex(key => Keys.wasHolding(key))
    const entity = this.entity

    if (direction > -1) {
      entity.direction = direction
      entity.dx = UnitVectors[direction][0] * entity.stats[CharacterStat.Speed]
      entity.dy = UnitVectors[direction][1] * entity.stats[CharacterStat.Speed]
      entity.changeAnimation(entity.direction + 8)
    } else {
      entity.changeState('idle')
    }
  }
}
