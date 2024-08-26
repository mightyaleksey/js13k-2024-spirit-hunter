/* @flow */

import type { EntityProps } from './Entity'

import { Animation } from './Animation'
import { CharacterIdleState } from '../states/entities/CharacterIdleState'
import { CharacterDeathState } from '../states/entities/CharacterDeathState'
import { CharacterWalkState } from '../states/entities/CharacterWalkState'
import { Entity } from './Entity'
import { StateMachine } from '../states/StateMachine'

export type CharacterState =
  | 'death'
  | 'idle'
  | 'walk'

export class Character extends Entity {
  animations: $ReadOnlyArray<Animation>
  currentAnimation: Animation
  direction: number
  entities: Array<Entity>
  state: StateMachine<CharacterState>

  constructor (props: EntityProps) {
    super(props)

    this.animations = [] // generate
    this.currentAnimation = this.animations[2]
    this.direction = 2

    this.state = new StateMachine({
      death: () => new CharacterDeathState(this),
      idle: () => new CharacterIdleState(this),
      walk: () => new CharacterWalkState(this)
    })
    this.state.change('idle')
  }

  update (dt: number) {
    // handle i/o
    this.state.update(dt)
    // update position
    super.update(dt)
  }

  /* helpers */

  changeAnimation (animationID: number) {
    this.currentAnimation = this.animations[animationID]
  }

  changeState (stateName: CharacterState, input: mixed) {
    this.state.change(stateName, input)
  }
}
