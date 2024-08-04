/* @flow */

import type { GamePlayState } from '../states/game/GamePlayState'
import { Entity } from './Entity'
import { PlayerIdleState } from '../states/entities/PlayerIdleState'
import { PlayerShootingState } from '../states/entities/PlayerShootingState'
import { PlayerWalkState } from '../states/entities/PlayerWalkState'
import { StateMachine } from '../states/StateMachine'

export class Player extends Entity {
  game: GamePlayState

  constructor (game: GamePlayState) {
    super('player')

    this.state = new StateMachine({
      idle: () => new PlayerIdleState(this),
      shooting: () => new PlayerShootingState(this),
      walk: () => new PlayerWalkState(this)
    })
    this.state.change('idle')

    this.game = game
  }
}
