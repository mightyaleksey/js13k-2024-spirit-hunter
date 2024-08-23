/* @flow */

import { Character } from './Character'
import { rect, setColor } from '../engine'

export class Enemy extends Character {
  constructor (x?: number, y?: number) {
    super({
      x: x ?? 16,
      y: y ?? 16,
      width: 10,

      isCollidable: true
    })
  }

  render () {
    setColor('green')
    rect('fill', this.x, this.y, this.width, this.height, 2)
  }
}
