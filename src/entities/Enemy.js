/* @flow */

import { Character } from './Character'
import { CharacterStat } from '../definitions'
import { CharacterDeathState } from '../states/entities/CharacterDeathState'
import { CharacterStunnedState } from '../states/entities/CharacterStunnedState'
import { EnemyIdleState } from '../states/entities/EnemyIdleState'
import { EnemyWalkState } from '../states/entities/EnemyWalkState'
import { StateMachine } from '../states/StateMachine'

import { random } from '../util'

// sequences: chase > impact > flee > repeat

const defs = ['spirit1', 'spirit2']

export class Enemy extends Character {
  constructor (x: number, y: number, level?: number) {
    super({
      x,
      y,

      isCollidable: true,

      character: defs[random(defs.length)],
      level
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

  takeDamage (damage: number, x: number, y: number, color?: number) {
    super.takeDamage(damage, x, y, color)

    if (this.stats[CharacterStat.Hp] > 0) {
      this.changeState('stunned')
    }
  }
}
