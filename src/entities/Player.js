/* @flow */

import type { Entity } from './Entity'

import { BlasterAimState } from '../states/weapons/BlasterAimState'
import { BlasterCooldownState } from '../states/weapons/BlasterCooldownState'
import { BlasterFireState } from '../states/weapons/BlasterFireState'
import { Character } from './Character'
import { Enemy } from './Enemy'
import { PlayerIdleState } from '../states/entities/PlayerIdleState'
import { PlayerWalkState } from '../states/entities/PlayerWalkState'
import { StateMachine } from '../states/StateMachine'
import { Thing } from './Thing'
import { UnitVectors } from '../shared/constants'
import { rect, setColor } from '../engine'

type BlasterState =
  | 'aim'
  | 'cooldown'
  | 'fire'

export class Player extends Character {
  blasterWeapon: StateMachine<BlasterState>
  entities: Array<Entity>

  constructor (x?: number, y?: number) {
    super({
      x,
      y,
      width: 10,

      isCollidable: true,
      isSolid: true
    })

    this.state = new StateMachine({
      idle: () => new PlayerIdleState(this),
      walk: () => new PlayerWalkState(this)
    })
    this.state.change('idle')

    this.blasterWeapon = new StateMachine({
      aim: () => new BlasterAimState(this),
      cooldown: () => new BlasterCooldownState(this),
      fire: () => new BlasterFireState(this)
    })
    this.blasterWeapon.change('aim')
  }

  render () {
    setColor('blue')
    rect('fill', this.x, this.y, this.width, this.height, 2)
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
