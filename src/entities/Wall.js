/* @flow */

import type { EntityProps } from './Entity'

import { Thing } from './Thing'
import { rect, setColor } from '../engine'

export class Wall extends Thing {
  constructor (props: EntityProps) {
    super({
      x: props.x,
      y: props.y,

      isCollidable: true,
      isSolid: true
    })
  }

  render () {
    setColor('gray')
    rect('fill', this.x, this.y, this.width, this.height)
  }
}
