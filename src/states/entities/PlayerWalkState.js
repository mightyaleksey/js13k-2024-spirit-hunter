/* @flow */

import { CharacterWalkState } from './CharacterWalkState'
import { Keys } from '../../engine'
import {
  MovementKeys,
  PlayerVelocity,
  UnitVectors
} from '../../shared/constants'

export class PlayerWalkState extends CharacterWalkState {
  update (dt: number) {
    const direction = MovementKeys.findIndex(key => Keys.wasHolding(key))
    const entity = this.entity

    if (direction > -1) {
      entity.direction = direction
      entity.dx = UnitVectors[direction][0] * PlayerVelocity
      entity.dy = UnitVectors[direction][1] * PlayerVelocity
      entity.changeAnimation(entity.direction + 8)
    } else {
      entity.changeState('idle')
    }
  }
}
