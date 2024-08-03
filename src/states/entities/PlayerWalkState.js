/* @flow */

import { EntityWalkState } from './EntityWalkState'
import { Keys } from '../../engine'
import { MovementKeys } from '../../constants'

export class PlayerWalkState extends EntityWalkState {
  update (dt: number) {
    super.update(dt)

    MovementKeys.some((key, direction) => {
      if (Keys.wasHolding(key)) {
        this.entity.direction = direction
        this.entity.changeAnimation(direction + 4)
        return true
      }

      return false
    }) || this.entity.changeState('idle')
  }
}
