/* @flow */

import { Projectile } from './Projectile'
import { line, setColor } from '../engine'

type Props = {
  x: number,
  y: number,
  targetX: number,
  targetY: number,
}

export class BlasterProjectile extends Projectile {
  targetX: number
  targetY: number
  timer: number
  timerInterval: number

  constructor (props: Props) {
    super({ x: props.x, y: props.y, width: 1, height: 1 })

    this.targetX = props.targetX
    this.targetY = props.targetY
    this.timer = 0
    this.timerInterval = 0.1
  }

  render () {
    setColor('red')
    line(this.x, this.y, this.targetX, this.targetY)
  }

  update (dt: number) {
    this.timer += dt
    if (this.timer >= this.timerInterval) this.isDestroyed = true
  }
}
