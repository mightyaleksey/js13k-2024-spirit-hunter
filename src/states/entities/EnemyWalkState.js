/* @flow */

import type { Enemy } from '../../entities/Enemy'

import {
  CharacterSpeed,
  DirectionBottom,
  DirectionLeft,
  DirectionRight,
  DirectionTop,
  EnemyWalkDuration,
  UnitVectors
} from '../../shared/constants'
import { CharacterWalkState } from './CharacterWalkState'

export class EnemyWalkState extends CharacterWalkState<Enemy> {
  timer: number

  enter (input: mixed) {
    this.timer = 0

    if (input !== 'flee') {
      const entity = this.entity
      const player = entity.entities[0]
      const dx = entity.x - player.x
      const dy = entity.y - player.y

      if (Math.abs(dx) > Math.abs(dy)) {
        entity.direction = dx > 0 ? DirectionLeft : DirectionRight
      } else {
        entity.direction = dy > 0 ? DirectionTop : DirectionBottom
      }

      const unitVector = UnitVectors[entity.direction]
      entity.dx = unitVector[0] * entity.stats[CharacterSpeed]
      entity.dy = unitVector[1] * entity.stats[CharacterSpeed]
    }

    // update animation
    super.enter(input)
  }

  update (dt: number) {
    this.timer += dt
    if (this.timer >= EnemyWalkDuration) {
      this.entity.changeState('idle')
    }
  }
}
