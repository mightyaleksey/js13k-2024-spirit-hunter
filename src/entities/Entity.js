/* @flow */

import { Debug, TileSize } from '../shared/constants'

import { draw, rect, setColor } from '../engine'
import { gameTiles } from '../shared/game'

export type EntityProps = $ReadOnly<{
  x?: number,
  y?: number,
  width?: number,
  height?: number,

  isCollidable?: boolean,
  isSolid?: boolean,

  tileOX?: number,
  tileOY?: number,
  tileID?: number
}>

export class Entity {
  // dimentions
  x: number
  y: number
  width: number
  height: number

  // movement
  dx: number
  dy: number

  // states
  isCollidable: boolean
  isDestroyed: boolean
  isSolid: boolean

  // add extra offset to bounding box for tile rendering
  // (might be useful if tile have a lot of space around)
  tileOX: number
  tileOY: number
  // tile id to render
  tileID: ?number

  constructor (props: EntityProps) {
    this.x = props.x ?? 0
    this.y = props.y ?? 0
    this.width = props.width ?? TileSize
    this.height = props.height ?? TileSize

    this.dx = 0
    this.dy = 0

    this.isCollidable = Boolean(props.isCollidable)
    this.isDestroyed = false
    this.isSolid = Boolean(props.isSolid)

    this.tileOX = props.tileOX ?? 0
    this.tileOY = props.tileOY ?? 0
    this.tileID = props.tileID
  }

  render () {
    if (this.tileID != null) {
      draw(
        gameTiles[this.tileID],
        this.x + this.tileOX,
        this.y + this.tileOY
      )

      if (Debug) {
        setColor(this.isSolid ? 'red' : 'green')
        rect('line', this.x, this.y, this.width, this.height)
      }
    }
  }

  update (dt: number) {
    this.x += this.dx * dt
    this.y += this.dy * dt
  }

  /* helpers */

  centerX (): number {
    return this.x + 0.5 * this.width
  }

  centerY (): number {
    return this.y + 0.5 * this.height
  }

  collided (target: Entity) {
    /* abstract */
  }

  retreate (dt: number) {
    this.x -= this.dx * dt
    this.y -= this.dy * dt
  }
}
