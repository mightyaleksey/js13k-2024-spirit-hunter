/* @flow */

import { CharacterWalkState } from './CharacterWalkState'

// try to locate player and collide with him
export class EnemyFleeState extends CharacterWalkState {
  timer: number
  timerDuration: number

  enter () {
    this.timer = 0
    this.timerDuration = 0.3
  }

  update (dt: number) {
    this.timer += dt
    if (this.timer >= this.timerDuration) this.entity.changeState('chase')

    // update animation
    super.update(dt)
  }
}
