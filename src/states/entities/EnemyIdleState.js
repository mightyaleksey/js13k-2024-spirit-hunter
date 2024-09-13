/* @flow */

import type { Enemy } from '../../entities/Enemy'

import { CharacterIdleState } from './CharacterIdleState'
import { EnemySightRadius, TileSize } from '../../shared/constants'

export class EnemyIdleState extends CharacterIdleState<Enemy> {
  enter (input: mixed) {
    // reset velocity
    super.enter(input)
  }

  update (dt: number) {
    const entity = this.entity
    const player = entity.entities[0]
    const r = EnemySightRadius * TileSize

    if (
      Math.abs(entity.x - player.x) < r &&
      Math.abs(entity.y - player.y) < r
    ) {
      this.entity.changeState('walk')
    }
  }
}
