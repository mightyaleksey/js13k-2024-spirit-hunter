/* @flow */

import { DamageDuration, TileSize } from '../shared/constants'
import { Entity } from './Entity'
import { inCubic } from '../shared/easing'

import { print } from '../shared/game'
import { setColor } from '../engine'

const colors = ['#fff', '#d72744', '#79c834']

export class Damage extends Entity {
  color: number
  timer: number
  value: number

  constructor (x: number, y: number, value: number, color?: number) {
    super({
      x,
      y
    })

    this.color = color ?? 0
    this.timer = 0
    this.value = value
  }

  render () {
    const y = inCubic(
      this.timer,
      this.y,
      -0.5 * TileSize,
      DamageDuration
    )

    setColor('#333')
    print(String(this.value), this.x, y - 1)
    setColor(colors[this.color])
    print(String(this.value), this.x, y)
  }

  update (dt: number) {
    this.timer += dt
    if (this.timer >= DamageDuration) this.isDestroyed = true
  }
}
