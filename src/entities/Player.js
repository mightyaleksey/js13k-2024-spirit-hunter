/* @flow */

import type { Entity } from './Entity'
import type { Joystick } from '../elements/Joystick'

import { BlasterAimState } from '../states/weapons/BlasterAimState'
import { BlasterCooldownState } from '../states/weapons/BlasterCooldownState'
import { BlasterFireState } from '../states/weapons/BlasterFireState'
import { Character } from './Character'
import { CharacterDeathState } from '../states/entities/CharacterDeathState'
import { CharacterStunnedState } from '../states/entities/CharacterStunnedState'
import { Damage } from './Damage'
import { Enemy } from './Enemy'
import { FirstAid } from '../entities/FirstAid'
import {
  CharacterAttack,
  CharacterHp,
  CharacterHpMax,
  InvulnerabilityDuration
} from '../shared/constants'
import { PlayerIdleState } from '../states/entities/PlayerIdleState'
import { PlayerWalkState } from '../states/entities/PlayerWalkState'
import { StateMachine } from '../states/StateMachine'

import { inOutSine } from '../shared/easing'
import { setColor } from '../engine'
import { playSound } from '../shared/sound'

type BlasterState =
  | 'aim'
  | 'cooldown'
  | 'fire'

export class Player extends Character {
  blasterWeapon: StateMachine<BlasterState>
  invulnerableTimer: number

  joystick: Joystick

  constructor (x?: number, y?: number) {
    super({
      x,
      y,

      isCollidable: true,
      isSolid: true,

      character: 'player'
    })

    this.state = new StateMachine({
      death: () => new CharacterDeathState(this),
      idle: () => new PlayerIdleState(this),
      stunned: () => new CharacterStunnedState(this),
      walk: () => new PlayerWalkState(this)
    })
    this.state.change('idle')

    this.blasterWeapon = new StateMachine({
      aim: () => new BlasterAimState(this),
      cooldown: () => new BlasterCooldownState(this),
      fire: () => new BlasterFireState(this)
    })
    this.blasterWeapon.change('cooldown')

    this.invulnerableTimer = 0
  }

  render () {
    const opacity = inOutSine(
      InvulnerabilityDuration - this.invulnerableTimer,
      0,
      1,
      InvulnerabilityDuration
    )
    setColor('#fff', opacity)
    super.render()
    setColor('#fff')
  }

  update (dt: number) {
    this.invulnerableTimer = Math.max(0, this.invulnerableTimer - dt)
    this.blasterWeapon.update(dt)
    // handle state & position update
    super.update(dt)
  }

  /* helpers */

  collided (entity: Entity) {
    if (entity instanceof Enemy) {
      if (this.invulnerableTimer === 0) {
        const damage = new Damage(
          this.centerX(),
          this.centerY(),
          entity.stats[CharacterAttack],
          1
        )

        this.invulnerableTimer = InvulnerabilityDuration
        this.takeDamage(damage)

        playSound('hit')
      }
    }

    if (entity instanceof FirstAid) {
      entity.isDestroyed = true
      this.stats[CharacterHp] = Math.min(
        this.stats[CharacterHp] + 20,
        this.stats[CharacterHpMax]
      )

      playSound('pickup')
    }
  }

  getExp (exp: number) {
    super.getExp(exp)
    console.log(this.exp, this.expToLevel)
    playSound('powerup')
  }
}
