/* @flow */

import { Box } from './Box'

import { rect, setColor } from '../engine'

export class Panel extends Box {
  render () {
    setColor('#fff', 0.7)
    rect('fill', this.x, this.y, this.width, this.height, 5)
  }
}
