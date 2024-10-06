/* @flow */

import { BaseWeaponState } from './BaseWeaponState'
import { ReloadDuration } from '../../shared/constants'

export class BlasterCooldownState extends BaseWeaponState {
  timer: number
  timerDuration: number

  enter () {
    this.timer = 0
  }

  update (dt: number) {
    this.timer += dt
    if (this.timer >= ReloadDuration) {
      this.entity.blasterWeapon.change('aim')
    }
  }
}
