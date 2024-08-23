/* @flow */

import type { EntityProps } from './Entity'

import { Entity } from './Entity'
import { rect, setColor } from '../engine'

export class Element extends Entity {
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
