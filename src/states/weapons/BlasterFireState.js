/* @flow */

import { BaseWeaponState } from './BaseWeaponState'
import { Enemy } from '../../entities/Enemy'
import { BlasterProjectile } from '../../entities/BlasterProjectile'

export class BlasterFireState extends BaseWeaponState {
  enter (target: mixed): void {
    const player = this.entity

    if (!(target instanceof Enemy)) {
      throw new Error('expected enemy')
    }

    player.entities.push(
      new BlasterProjectile({
        x: player.centerX(),
        y: player.centerY(),
        targetX: target.centerX(),
        targetY: target.centerY()
      })
    )

    player.blasterWeapon.change('cooldown')
    target.changeState('death')
  }
}
