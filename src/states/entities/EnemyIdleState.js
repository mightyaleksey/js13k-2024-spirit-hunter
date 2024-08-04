/* @flow */

import { Direction } from '../../constants'
import { EntityIdleState } from './EntityIdleState'
import { random } from '../../util'

const delta = 32

export class EnemyIdleState extends EntityIdleState {
  update (dt: number) {
    const player = this.entity.game.player
    const dx = this.entity.x - player.x
    const dy = this.entity.y - player.y

    if (dx > 0 && dx < delta) {
      this.entity.direction = [Direction.Top, Direction.Bottom, Direction.Left][random(3)]
      this.entity.changeState('walk')
    } else if (dx < 0 && dx > -delta) {
      this.entity.direction = [Direction.Top, Direction.Right, Direction.Bottom][random(3)]
      this.entity.changeState('walk')
    } else if (dy > 0 && dy < delta) {
      this.entity.direction = [Direction.Top, Direction.Right, Direction.Left][random(3)]
      this.entity.changeState('walk')
    } else if (dy < 0 && dy > -delta) {
      this.entity.direction = [Direction.Right, Direction.Bottom, Direction.Left][random(3)]
      this.entity.changeState('walk')
    }
  }
}
