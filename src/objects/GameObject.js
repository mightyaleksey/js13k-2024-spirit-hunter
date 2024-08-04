/* @flow */

import type { Enemy } from '../entities/Enemy'

export class GameObject {
  x: number
  y: number
  width: number
  height: number

  dx: number
  dy: number

  symbol: string

  remove: boolean

  constructor (symbol: string) {
    this.x = 0
    this.y = 0
    this.width = 7
    this.height = 7

    this.dx = 0
    this.dy = 0

    this.symbol = symbol

    this.remove = false
  }

  update (dt: number) {
    this.x = this.x + this.dx * dt
    this.y = this.y + this.dy * dt
  }

  render () {
    setFont('6px athelas, georgia, serif')
    printf(
      this.symbol,
      this.x,
      this.y + 1
    )
  }

  collides (enemy: Enemy) {
    enemy.changeState('hit')
    enemy.collidable = false
  }
}
