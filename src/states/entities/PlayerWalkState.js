/* @flow */

import { Direction, EntityState } from '../../constants'
import { EntityWalkState } from './EntityWalkState'
import { Keys } from '../../engine'

export class PlayerWalkState extends EntityWalkState {
  update (dt: number) {
    super.update(dt)

    if (Keys.wasHolding('w')) {
      this.entity.direction = Direction.Top
      this.entity.changeAnimation(EntityState.WalkTop)
    } else if (Keys.wasHolding('d')) {
      this.entity.direction = Direction.Right
      this.entity.changeAnimation(EntityState.WalkRight)
    } else if (Keys.wasHolding('s')) {
      this.entity.direction = Direction.Bottom
      this.entity.changeAnimation(EntityState.WalkBottom)
    } else if (Keys.wasHolding('a')) {
      this.entity.direction = Direction.Left
      this.entity.changeAnimation(EntityState.WalkLeft)
    } else {
      this.entity.changeState('idle')
    }
  }
}
