/* @flow */

import { Dimentions, printf, setColor, setFont } from '../engine'
import { Panel } from '../gui/Panel'

export class Console {
  metrics: Array<number | string>
  panel: Panel

  constructor () {
    this.metrics = []
    this.panel = new Panel({
      x: 10,
      y: 30,
      width: 60,
      height: 10
    })
  }

  render () {
    const rows = 0.5 * this.metrics.length

    this.panel.height = 10 * rows + 10
    this.panel.render()

    setColor('#131313')
    setFont(8)

    for (let k = 0; k < this.metrics.length; k += 2) {
      printf(
        `${this.metrics[k]}: ${this.metrics[k + 1]}`,
        15,
        15 + 5 * k
      )
    }
  }

  update (dt: number) {
    this.metrics = [
      'vw', Dimentions.width,
      'vh', Dimentions.height
    ]
  }
}
