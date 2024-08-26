/* @flow */

import { CharacterWalkState } from './CharacterWalkState'
import { EnemyVelocity } from '../../shared/constants'
import { unit } from '../../util'

// try to locate player and collide with him
export class EnemyChaseState extends CharacterWalkState {
  timer: number
  timerDuration: number

  enter () {
    this.timer = 0
    this.timerDuration = 0.2
  }

  update (dt: number) {
    // make a decision where to go
    if (this.timer === 0) {
      const player = this.entity.entities[0]
      const dx = this.entity.x - player.x
      const dy = this.entity.y - player.y

      if (Math.abs(dx) > Math.abs(dy)) {
        this.entity.dx = -unit(dx) * EnemyVelocity
        this.entity.dy = 0
      } else {
        this.entity.dx = 0
        this.entity.dy = -unit(dy) * EnemyVelocity
      }
    }

    this.timer += dt
    if (this.timer >= this.timerDuration) this.timer = 0

    // update animation
    super.update(dt)
  }
}
