/* @flow */

import type { Entity } from './Entity'

import { BlasterAimState } from '../states/weapons/BlasterAimState'
import { BlasterCooldownState } from '../states/weapons/BlasterCooldownState'
import { BlasterFireState } from '../states/weapons/BlasterFireState'
import { Character } from './Character'
import { Enemy } from './Enemy'
import { PlayerIdleState } from '../states/entities/PlayerIdleState'
import { PlayerWalkState } from '../states/entities/PlayerWalkState'
import { CharacterDeathState } from '../states/entities/CharacterDeathState'
import { CharacterStunnedState } from '../states/entities/CharacterStunnedState'
import { StateMachine } from '../states/StateMachine'
import { Thing } from './Thing'
import { UnitVectors } from '../shared/constants'

type BlasterState =
  | 'aim'
  | 'cooldown'
  | 'fire'

export class Player extends Character {
  blasterWeapon: StateMachine<BlasterState>

  constructor (x?: number, y?: number) {
    super({
      character: 'player',

      x,
      y,
      width: 10,

      isCollidable: true,
      isSolid: true
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
    this.blasterWeapon.change('aim')

    console.log(this.stats)
    this.levelUp()
    // this.levelUp()
    // this.levelUp()
    console.log(this.stats)
  }

  update (dt: number) {
    this.blasterWeapon.update(dt)
    // handle state & position update
    super.update(dt)
  }

  /* helpers */

  collided (entity: Entity) {
    if (
      (entity instanceof Thing) &&
      entity.isSolid
    ) {
      // fix player position
      const unitVector = UnitVectors[this.direction]

      if (unitVector[0] !== 0) {
        this.x = entity.x + (unitVector[0] < 0 ? entity.width : -this.width)
      }
      if (unitVector[1] !== 0) {
        this.y = entity.y + (unitVector[1] < 0 ? entity.height : -this.height)
      }
    }

    if (entity instanceof Enemy) {
      // handle impact
    }
  }
}
