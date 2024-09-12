/* @flow */

import { BaseWeaponState } from './BaseWeaponState'
import { CharacterStat } from '../../definitions'
import { Enemy } from '../../entities/Enemy'
import { Projectile } from '../../entities/Projectile'
import { playSound } from '../../shared/sound'

export class BlasterFireState extends BaseWeaponState {
  enter (target: mixed): void {
    const player = this.entity

    if (!(target instanceof Enemy)) {
      throw new Error('expected enemy')
    }

    const dx = target.centerX() - player.centerX()
    const dy = target.centerY() - player.centerY()
    const d = Math.max(Math.abs(dx), Math.abs(dy))

    player.entities.push(
      new Projectile({
        x: player.centerX(),
        y: player.centerY(),
        dx: dx / d * 240,
        dy: dy / d * 240,

        damage: player.stats[CharacterStat.Attack]
      })
    )

    player.blasterWeapon.change('cooldown')
    playSound('laser')
  }
}
