/* @flow */

import type { Enemy } from '../../entities/Enemy'

import { CharacterWalkState } from './CharacterWalkState'
import { Direction, EnemyVelocity, EnemyWalkDuration, UnitVectors } from '../../shared/constants'

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
        entity.direction = dx > 0 ? Direction.Left : Direction.Right
      } else {
        entity.direction = dy > 0 ? Direction.Top : Direction.Bottom
      }

      const unitVector = UnitVectors[entity.direction]
      entity.dx = unitVector[0] * EnemyVelocity
      entity.dy = unitVector[1] * EnemyVelocity
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
