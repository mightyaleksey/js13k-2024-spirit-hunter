/* @flow */

import type { Player } from '../../entities/Player'

import { CharacterIdleState } from './CharacterIdleState'
import { Keys } from '../../engine'
import { MovementKeys } from '../../shared/constants'

export class PlayerIdleState extends CharacterIdleState<Player> {
  entity: Player

  update (dt: number) {
    const joystick = this.entity.joystick
    const direction = joystick.direction > -1
      ? joystick.direction
      : MovementKeys.findIndex(key => Keys.wasPressed(key))

    if (direction > -1) {
      this.entity.direction = direction
      this.entity.changeState('walk')
    }

    super.update(dt)
  }
}
