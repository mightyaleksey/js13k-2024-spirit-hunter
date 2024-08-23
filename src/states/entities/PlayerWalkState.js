/* @flow */

import { CharacterWalkState } from './CharacterWalkState'
import { Keys } from '../../engine'
import { MovementKeys, UnitVectors } from '../../shared/constants'

export class PlayerWalkState extends CharacterWalkState {
  update (dt: number) {
    const direction = MovementKeys.findIndex(key => Keys.wasHolding(key))
    const velocity = 60

    if (direction > -1) {
      this.entity.direction = direction
      this.entity.dx = UnitVectors[direction][0] * velocity
      this.entity.dy = UnitVectors[direction][1] * velocity
    } else {
      this.entity.changeState('idle')
    }
  }
}
