/* @flow */

import type { GamePlayState } from '../states/game/GamePlayState'
import { Entity } from './Entity'
import { EnemyHitState } from '../states/entities/EnemyHitState'
import { EnemyIdleState } from '../states/entities/EnemyIdleState'
import { EnemyWalkState } from '../states/entities/EnemyWalkState'
import { StateMachine } from '../states/StateMachine'
import { random } from '../util'

const defs = ['woman1', 'woman2']

export class Enemy extends Entity {
  game: GamePlayState

  constructor (game: GamePlayState, x: number, y: number) {
    super(defs[random(defs.length)])

    this.state = new StateMachine({
      idle: () => new EnemyIdleState(this),
      hit: () => new EnemyHitState(this),
      walk: () => new EnemyWalkState(this)
    })
    this.state.change('idle')

    this.x = x
    this.y = y

    this.game = game
  }

  enter () {
    this.state.change('walk')
  }
}
