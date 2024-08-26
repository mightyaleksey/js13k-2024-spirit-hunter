/* @flow */

import { CharacterIdleState } from './CharacterIdleState'
import { Keys } from '../../engine'
import { MovementKeys } from '../../shared/constants'

export class PlayerIdleState extends CharacterIdleState {
  update (dt: number) {
    const direction = MovementKeys.findIndex(key => Keys.wasPressed(key))

    if (direction > -1) {
      this.entity.direction = direction
      this.entity.changeState('walk')
    }

    super.update(dt)
  }
}
