/* @flow */

import { Character } from './Character'
import { rect, setColor } from '../engine'

export class Enemy extends Character {
  constructor () {
    super({
      x: 16,
      y: 16,

      isCollidable: true
    })
  }

  render () {
    setColor('green')
    rect('fill', this.x, this.y, this.width, this.height)
  }
}
