/* @flow */

import { Thing } from './Thing'
import { Walls } from '../definitions'

type WallProps = $ReadOnly<{
  x: number,
  y: number,
  wallID: number,
}>

export class Wall extends Thing {
  constructor (props: WallProps) {
    super({
      x: props.x,
      y: props.y,

      isCollidable: true,
      isSolid: true,

      tileID: Walls[props.wallID]
    })
  }
}
