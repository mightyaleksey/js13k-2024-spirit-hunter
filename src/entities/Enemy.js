/* @flow */

import type { Entity } from './Entity'

import { Character } from './Character'
import { CharacterDeathState } from '../states/entities/CharacterDeathState'
import { CharacterIdleState } from '../states/entities/CharacterIdleState'
import { CharacterWalkState } from '../states/entities/CharacterWalkState'
import { EnemyChaseState } from '../states/entities/EnemyChaseState'
import { EnemyFleeState } from '../states/entities/EnemyFleeState'
import { Player } from './Player'
import { StateMachine } from '../states/StateMachine'
import { rect, setColor } from '../engine'

// sequences: chase > impact > flee > repeat

type EnemyState =
  | 'chase'
  | 'death'
  | 'idle'
  | 'flee'
  | 'walk'

export class Enemy extends Character {
  // $FlowFixMe[incompatible-extend]
  state: StateMachine<EnemyState>

  constructor (x?: number, y?: number) {
    super({
      x: x ?? 16,
      y: y ?? 16,
      width: 10,

      isCollidable: true
    })

    this.state = new StateMachine({
      chase: () => new EnemyChaseState(this),
      death: () => new CharacterDeathState(this),
      flee: () => new EnemyFleeState(this),
      idle: () => new CharacterIdleState(this),
      walk: () => new CharacterWalkState(this)
    })
    this.state.change('chase')
  }

  render () {
    setColor('green')
    rect('fill', this.x, this.y, this.width, this.height, 2)
  }

  /* helpers */

  changeState (state: EnemyState, input: mixed) {
    // $FlowFixMe[incompatible-call]
    super.changeState(state, input)
  }

  collided (target: Entity) {
    if (target instanceof Player) {
      this.changeState('flee')
    }
  }
}
