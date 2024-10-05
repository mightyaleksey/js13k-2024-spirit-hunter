/* @flow */

import { Entity } from './Entity'

export class FirstAid extends Entity {
  originalX: number
  originalY: number

  constructor (x: number, y: number) {
    super({
      x,
      y,
      width: 7,
      height: 6,

      isCollidable: true,

      tileID: 108
    })
  }
}
