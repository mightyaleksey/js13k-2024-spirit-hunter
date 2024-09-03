/* @flow */

import type { CharacterType } from '../definitions'
import type { EntityProps } from './Entity'

import { Animation } from './Animation'
import { Characters } from '../definitions'
import { CharacterIdleState } from '../states/entities/CharacterIdleState'
import { CharacterDeathState } from '../states/entities/CharacterDeathState'
import { CharacterStunnedState } from '../states/entities/CharacterStunnedState'
import { CharacterWalkState } from '../states/entities/CharacterWalkState'
import { Entity } from './Entity'
import { StateMachine } from '../states/StateMachine'

export type CharacterState =
  | 'death'
  | 'idle'
  | 'stunned'
  | 'walk'

export type CharacterProps = $ReadOnly<{
  ...EntityProps,
  character: string
}>

export class Character extends Entity {
  animations: $ReadOnlyArray<Animation>
  currentAnimation: Animation
  direction: number
  entities: Array<Entity>
  state: StateMachine<CharacterState>

  constructor (props: CharacterProps) {
    // $FlowFixMe[prop-missing]
    super(props)

    this.animations = this.genAnimations(Characters[props.character])
    this.currentAnimation = this.animations[6]
    this.direction = 2

    this.state = new StateMachine({
      death: () => new CharacterDeathState(this),
      idle: () => new CharacterIdleState(this),
      stunned: () => new CharacterStunnedState(this),
      walk: () => new CharacterWalkState(this)
    })
    this.state.change('idle')
  }

  update (dt: number) {
    // update frame
    this.currentAnimation?.update(dt)
    this.tileID = this.currentAnimation?.getCurrentFrame()
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

  genAnimations (characterDef: CharacterType): $ReadOnlyArray<Animation> {
    return characterDef.frames.map(frames =>
      new Animation(frames, characterDef.interval))
  }
}
