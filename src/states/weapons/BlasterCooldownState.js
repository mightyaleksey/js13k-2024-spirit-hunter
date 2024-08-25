/* @flow */

import { BaseWeaponState } from './BaseWeaponState'

export class BlasterCooldownState extends BaseWeaponState {
  timer: number
  timerDuration: number

  enter () {
    this.timer = 0
    this.timerDuration = 0.5
  }

  update (dt: number) {
    this.timer += dt
    if (this.timer >= this.timerDuration) {
      this.entity.blasterWeapon.change('aim')
    }
  }
}
