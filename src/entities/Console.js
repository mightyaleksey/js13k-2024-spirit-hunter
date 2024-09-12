/* @flow */

import { Dimentions, printf, rect, setColor } from '../engine'

export class Console {
  metrics: Array<number | string>

  constructor () {
    this.metrics = []
  }

  render (cx: number, cy: number) {
    const rows = 0.5 * this.metrics.length

    setColor('rgba(255, 255, 255, 0.4)')
    rect('fill', 10 + cx, 10 + cy, 50, 10 * rows + 10, 5)
    setColor('#131313')

    for (let k = 0; k < this.metrics.length; k += 2) {
      printf(
        `${this.metrics[k]}: ${this.metrics[k + 1]}`,
        15 + cx,
        15 + 5 * k + cy
      )
    }
  }

  update (dt: number) {
    this.metrics = [
      'w', Dimentions.width,
      'h', Dimentions.height
    ]
  }
}
