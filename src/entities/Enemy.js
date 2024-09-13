/* @flow */

import type { Entity } from './Entity'

import { Character } from './Character'
import { CharacterDeathState } from '../states/entities/CharacterDeathState'
import { CharacterStunnedState } from '../states/entities/CharacterStunnedState'
import { EnemyIdleState } from '../states/entities/EnemyIdleState'
import { EnemyWalkState } from '../states/entities/EnemyWalkState'
import { StateMachine } from '../states/StateMachine'

import { random } from '../util'

// sequences: chase > impact > flee > repeat

const defs = ['spirit1', 'spirit2']

export class Enemy extends Character {
  constructor (x: number, y: number) {
    super({
      x,
      y,
      height: 14,
      width: 10,

      isCollidable: true,

      tileOX: -3,
      tileOY: -2,

      character: defs[random(defs.length)]
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

  collided (target: Entity) {}
}
