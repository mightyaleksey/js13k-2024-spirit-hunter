/* @flow */

import { Entity } from './Entity'
import { PlayerIdleState } from '../states/entities/PlayerIdleState'
import { PlayerWalkState } from '../states/entities/PlayerWalkState'
import { StateMachine } from '../states/StateMachine'

export class Player extends Entity {
  constructor () {
    super('player')

    this.state = new StateMachine({
      idle: () => new PlayerIdleState(this),
      walk: () => new PlayerWalkState(this)
    })
    this.state.change('idle')
  }
}
