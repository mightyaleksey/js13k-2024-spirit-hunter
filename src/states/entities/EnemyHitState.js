/* @flow */

import type { Entity } from '../../entities/Entity'
import { BaseState } from '../BaseState'
import { GameObject } from '../../objects/GameObject'

export class EnemyHitState extends BaseState {
  entity: Entity
  status: GameObject
  statusTime: number
  timer: number

  constructor (entity: Entity) {
    super()
    this.entity = entity
    this.status = new GameObject('🙈')
    this.statusTime = 1
    this.timer = 0
  }

  enter () {
    this.entity.changeAnimation(this.entity.direction)
    this.status.x = this.entity.x + 4
    this.status.y = this.entity.y - 2
  }

  update (dt: number) {
    this.timer += dt

    if (this.timer >= this.statusTime) {
      this.entity.changeState('idle')
      this.entity.collidable = true
    }
  }

  render () {
    this.status.render()
  }
}
