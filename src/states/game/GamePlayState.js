/* @flow */

import type { GameObject } from '../../objects/GameObject'
import { BaseState } from '../BaseState'
import { Dimentions } from '../../engine'
import { Enemy } from '../../entities/Enemy'
import { Player } from '../../entities/Player'
import { TileMap } from '../../TileMap'
import { collides } from '../../util'

export class GamePlayState extends BaseState {
  enemies: Array<Enemy>
  particles: Array<GameObject>
  player: Player
  tileMap: TileMap

  constructor () {
    super()
    this.enemies = []
    this.particles = []
    this.player = new Player(this)
    this.tileMap = new TileMap()
  }

  enter () {
    this.enemies.push(new Enemy(this, 20, 20))
    this.enemies.push(new Enemy(this, 40, 40))
    this.enemies.push(new Enemy(this, 60, 60))
  }

  update (dt: number) {
    this.enemies.forEach(enemy => enemy.update(dt))
    this.player.update(dt)

    this.particles.forEach((particle, index) => {
      particle.update(dt)

      if (
        particle.x + particle.width < 0 ||
        particle.y + particle.height < 0 ||
        particle.x > Dimentions.width ||
        particle.y > Dimentions.height
      ) {
        particle.remove = true
      }

      this.enemies.forEach(enemy => {
        if (
          enemy.collidable &&
          collides(enemy, particle)
        ) {
          particle.collides(enemy)
          particle.remove = true
        }
      })

      if (particle.remove) {
        this.particles.splice(index, 1)
      }
    })
  }

  render () {
    this.tileMap.render()

    this.enemies.forEach(enemy => enemy.render())
    this.player.render()

    this.particles.forEach(particle => particle.render())
  }
}
