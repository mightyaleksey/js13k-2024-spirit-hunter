/* @flow */

import { BaseWeaponState } from './BaseWeaponState'
import { Enemy } from '../../entities/Enemy'
import { TileSize, UnitVectors } from '../../shared/constants'

export class BlasterAimState extends BaseWeaponState {
  update (dt: number) {
    const player = this.entity
    const unitVector = UnitVectors[player.direction]
    const d = 1.6 * TileSize
    const x = player.centerX() + unitVector[0] * (0.5 * player.width + d)
    const y = player.centerY() + unitVector[1] * (0.5 * player.height + d)

    const targets = player.entities.filter(enemy => {
      if (!(enemy instanceof Enemy)) return false
      if (Math.abs(enemy.centerX() - x) > d) return false
      if (Math.abs(enemy.centerY() - y) > d) return false
      return true
    })

    if (targets.length > 0) {
      player.blasterWeapon.change('fire', targets[0])
    }
  }
}
