/* @flow */

import { Thing } from './Thing'
import { draw } from '../engine'
import { gameTiles } from '../shared/game'
import { nullthrows } from '../util'

type Props = $ReadOnly<{
  x: number,
  y: number,
  tileID: number
}>

export class Obstacle extends Thing {
  constructor (props: Props) {
    const tileID = props.tileID

    super({
      x: props.x,
      y: props.y,
      tileID,

      isSolid: isSolid(tileID)
    })
  }

  render () {
    super.render()

    const tileID = nullthrows(this.tileID)

    // draw top part of the tree
    if (tileID >= 51 && tileID <= 53) {
      draw(gameTiles[tileID - 12], this.x, this.y - this.height)
    }
  }
}

function isSolid (tileID: number) {
  if ((tileID % 12) < 7) return true
  return false
}
