/* @flow */

import { BaseWeaponState } from './BaseWeaponState'
import { CharacterAttack, BlasterVelocity } from '../../shared/constants'
import { Enemy } from '../../entities/Enemy'
import { Projectile } from '../../entities/Projectile'

import { playSound } from '../../shared/sound'

// character box 10x14
const StartPosition = [
  [2, -7],
  [5, 3],
  [-2, 7],
  [-5, 3]
]

export class BlasterFireState extends BaseWeaponState {
  enter (target: mixed): void {
    const player = this.entity

    if (!(target instanceof Enemy)) {
      throw new Error('expected enemy')
    }

    const dx = target.centerX() - player.centerX()
    const dy = target.centerY() - player.centerY()
    const d = Math.max(Math.abs(dx), Math.abs(dy))
    const p = StartPosition[player.direction]

    player.entities.push(
      new Projectile({
        x: player.centerX() + p[0],
        y: player.centerY() + p[1],
        dx: dx / d * BlasterVelocity,
        dy: dy / d * BlasterVelocity,

        damage: player.stats[CharacterAttack]
      })
    )

    player.blasterWeapon.change('cooldown')
    playSound('laser')
  }
}
