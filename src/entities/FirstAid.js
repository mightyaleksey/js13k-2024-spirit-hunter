/* @flow */

import { Entity } from './Entity'

export class FirstAid extends Entity {
  originalX: number
  originalY: number

  constructor (x: number, y: number) {
    super({
      x,
      y,
      width: 11,
      height: 10,

      isCollidable: true,

      tileOX: 2,
      tileOY: 2,
      tileID: 108
    })
  }
}
