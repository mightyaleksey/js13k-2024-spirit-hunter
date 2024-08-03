/* @flow */

import type { EntityDefinitionType } from '../definitions/entityDefinitions'
import type { GameEntity } from '../engine'
import { Animation } from './Animation'
import { Direction } from '../constants'
import { StateMachine } from '../states/StateMachine'
import { entityDefinitions } from '../definitions/entityDefinitions'
import { EntityIdleState } from '../states/entities/EntityIdleState'
import { EntityWalkState } from '../states/entities/EntityWalkState'

export class Entity implements GameEntity {
  animations: $ReadOnlyArray<Animation>
  currentAnimation: Animation

  direction: number
  state: StateMachine

  x: number
  y: number
  width: number
  height: number

  constructor (entityName: string) {
    this.animations = this.genAnimations(
      entityDefinitions[entityName].frames,
      entityDefinitions[entityName].frameTime
    )
    this.currentAnimation = this.animations[2]

    this.direction = Direction.Bottom
    this.state = new StateMachine({
      idle: () => new EntityIdleState(this),
      walk: () => new EntityWalkState(this)
    })
    this.state.change('idle')

    this.x = 0
    this.y = 0
    this.width = 16
    this.height = 16
  }

  changeAnimation (animation: number) {
    this.currentAnimation = this.animations[animation]
  }

  changeState (stateName: string) {
    this.state.change(stateName)
  }

  genAnimations (
    animations: EntityDefinitionType['frames'],
    frameTime: number
  ): $ReadOnlyArray<Animation> {
    return animations.map(frames => new Animation(frames, frameTime))
  }

  render () {
    this.state.render()
    draw(
      gTextures.tiles[this.currentAnimation.getCurrentFrame()],
      this.x,
      this.y
    )
  }

  update (dt: number) {
    this.state.update(dt)
    this.currentAnimation.update(dt)
  }
}
