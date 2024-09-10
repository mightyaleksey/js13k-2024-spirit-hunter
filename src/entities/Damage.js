/* @flow */

import { Thing } from './Thing'
import { TileSize } from '../shared/constants'
import { inCubic } from '../shared/easing'
import { printf, setColor } from '../engine'

type Props = {
  x: number,
  y: number,
  damage: number,
}

export class Damage extends Thing {
  damage: number
  timer: number
  timerInterval: number

  constructor (props: Props) {
    super({
      x: props.x,
      y: props.y
    })

    this.damage = props.damage
    this.timer = 0
    this.timerInterval = 0.3
  }

  render () {
    const y = inCubic(
      this.timer,
      this.y,
      -0.5 * TileSize,
      this.timerInterval
    )

    setColor('white')
    // todo center
    printf(String(this.damage), this.x, y)
  }

  update (dt: number) {
    this.timer += dt
    if (this.timer >= this.timerInterval) {
      this.isDestroyed = true
    }
  }
}
