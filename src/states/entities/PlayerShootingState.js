/* @flow */

import type { Player } from '../../entities/Player'
import { BaseState } from '../BaseState'
import { Direction } from '../../constants'
import { GameObject } from '../../objects/GameObject'
import { Keys } from '../../engine'

export class PlayerShootingState extends BaseState {
  entity: Player
  shootingTime: number
  timer: number

  constructor (entity: Player) {
    super()
    this.entity = entity
    this.shootingTime = 0.1
    this.timer = 0
  }

  enter () {
    this.entity.changeAnimation(this.entity.direction + 8)
    this.shoot()
  }

  update (dt: number) {
    this.timer += dt
    if (this.timer >= this.shootingTime) {
      this.timer -= this.shootingTime
      this.shoot()
    }

    if (!Keys.wasHolding(' ')) {
      this.entity.changeState('idle')
    }
  }

  shoot () {
    const particle = new GameObject('❤️')

    switch (this.entity.direction) {
      case Direction.Top:
        particle.x = this.entity.x + 4
        particle.y = this.entity.y - 7
        particle.dy = -90
        break

      case Direction.Right:
        particle.x = this.entity.x + 16
        particle.y = this.entity.y + 4
        particle.dx = 90
        break

      case Direction.Bottom:
        particle.x = this.entity.x + 4
        particle.y = this.entity.y + 16
        particle.dy = 90
        break

      case Direction.Left:
        particle.x = this.entity.x - 7
        particle.y = this.entity.y + 4
        particle.dx = -90
        break
    }

    this.entity.game.particles.push(particle)
  }
}
