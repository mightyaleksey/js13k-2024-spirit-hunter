/* @flow */

import type { Entity } from './Entity'

import { Character } from './Character'
import { CharacterDeathState } from '../states/entities/CharacterDeathState'
import { CharacterStunnedState } from '../states/entities/CharacterStunnedState'
import { EnemyIdleState } from '../states/entities/EnemyIdleState'
import { EnemyWalkState } from '../states/entities/EnemyWalkState'
import { Player } from './Player'
import { StateMachine } from '../states/StateMachine'

// sequences: chase > impact > flee > repeat

export class Enemy extends Character {
  constructor (x: number, y: number) {
    super({
      character: 'spirit',

      x,
      y,
      width: 10,

      isCollidable: true
    })

    this.state = new StateMachine({
      death: () => new CharacterDeathState(this),
      idle: () => new EnemyIdleState(this),
      stunned: () => new CharacterStunnedState(this),
      walk: () => new EnemyWalkState(this)
    })
    this.state.change('idle')
  }

  /* helpers */

  collided (target: Entity) {
    if (target instanceof Player) {
      this.changeState('walk', 'flee')
    }
  }
}
