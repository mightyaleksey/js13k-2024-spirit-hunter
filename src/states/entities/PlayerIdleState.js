/* @flow */

import { EntityIdleState } from './EntityIdleState'
import { Keys } from '../../engine'
import { MovementKeys } from '../../constants'

export class PlayerIdleState extends EntityIdleState {
  update (dt: number) {
    super.update(dt)

    MovementKeys.some((key, direction) => {
      if (Keys.wasPressed(key)) {
        this.entity.direction = direction
        this.entity.changeState('walk')
        return true
      }

      return false
    })
  }
}
