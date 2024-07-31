/* @flow */

import { Direction } from '../../constants'
import { EntityIdleState } from './EntityIdleState'
import { Keys } from '../../engine'

export class PlayerIdleState extends EntityIdleState {
  update () {
    if (Keys.wasPressed('w')) {
      this.entity.direction = Direction.Top
      this.entity.changeState('walk')
    } else if (Keys.wasPressed('d')) {
      this.entity.direction = Direction.Right
      this.entity.changeState('walk')
    } else if (Keys.wasPressed('s')) {
      this.entity.direction = Direction.Bottom
      this.entity.changeState('walk')
    } else if (Keys.wasPressed('a')) {
      this.entity.direction = Direction.Left
      this.entity.changeState('walk')
    }
  }
}
