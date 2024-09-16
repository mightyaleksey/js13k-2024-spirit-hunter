/* @flow */

import { Entity } from './Entity'

import { printf, setColor } from '../engine'

export class FirstAid extends Entity {
  originalX: number
  originalY: number

  constructor (x: number, y: number) {
    super({
      x,
      y,
      width: 10,
      height: 10,

      isCollidable: true
    })
  }

  render () {
    setColor('#fff')
    printf('💚', this.x, this.y)
  }
}
