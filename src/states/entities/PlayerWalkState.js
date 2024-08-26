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

    if (direction > -1) {
      this.entity.direction = direction
      this.entity.dx = UnitVectors[direction][0] * PlayerVelocity
      this.entity.dy = UnitVectors[direction][1] * PlayerVelocity
    } else {
      this.entity.changeState('idle')
    }
  }
}
