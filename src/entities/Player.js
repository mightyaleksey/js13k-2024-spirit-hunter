/* @flow */

import { Character } from './Character'
import { PlayerIdleState } from '../states/entities/PlayerIdleState'
import { PlayerWalkState } from '../states/entities/PlayerWalkState'
import { StateMachine } from '../states/StateMachine'
import { rect, setColor } from '../engine'

export class Player extends Character {
  constructor () {
    super({
      isCollidable: true,
      isSolid: true
    })

    this.state = new StateMachine({
      idle: () => new PlayerIdleState(this),
      walk: () => new PlayerWalkState(this)
    })
    this.state.change('idle')
  }

  render () {
    setColor('blue')
    rect('fill', this.x, this.y, this.width, this.height)
  }
}
