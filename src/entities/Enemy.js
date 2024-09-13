/* @flow */

import type { Entity } from './Entity'

import { Character } from './Character'
import { CharacterDeathState } from '../states/entities/CharacterDeathState'
import { CharacterStat } from '../definitions'
import { CharacterStunnedState } from '../states/entities/CharacterStunnedState'
import { EnemyIdleState } from '../states/entities/EnemyIdleState'
import { EnemyWalkState } from '../states/entities/EnemyWalkState'
import { FirstAid } from '../entities/FirstAid'
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

  collided (entity: Entity) {
    if (entity instanceof FirstAid) {
      entity.isDestroyed = true
      this.stats[CharacterStat.Hp] = Math.min(
        this.stats[CharacterStat.Hp] + 20,
        this.stats[CharacterStat.HpMax]
      )
    }
  }

  takeDamage (damage: number, x: number, y: number, color?: number) {
    super.takeDamage(damage, x, y, color)

    if (this.stats[CharacterStat.Hp] > 0) {
      this.changeState('stunned')
    }
  }
}
