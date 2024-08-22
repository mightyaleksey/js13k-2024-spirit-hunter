/* @flow */

import type { Entity } from '../../entities/Entity'

import { BaseState } from '../BaseState'
import { Enemy } from '../../entities/Enemy'
import { Player } from '../../entities/Player'

export class GamePlayState extends BaseState {
  entities: Array<Entity>
  player: Player

  enter () {
    this.entities = [new Enemy()]
    this.player = new Player()
  }

  render () {
    this.entities.forEach(entity => entity.render())
    this.player.render()
  }

  update (dt: number) {
    for (let id = this.entities.length; id--;) {
      const entity = this.entities[id]
      entity.update(dt)

      if (entity.isDestroyed) {
        this.entities.splice(id, 1)
      }
    }

    this.player.update(dt)
  }
}
