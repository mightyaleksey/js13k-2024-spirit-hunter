/* @flow */

import { Dimentions } from '../engine'

export type Props = $ReadOnly<{
  x?: number,
  y?: number,
  width?: number,
  height?: number,
}>

export class Box {
  x: number
  y: number
  width: number
  height: number

  constructor (props: Props) {
    const w = Math.min(200, 0.6 * Dimentions.width)
    const h = Math.min(100, 0.6 * Dimentions.height)

    this.x = props.x ?? 0.5 * (Dimentions.width - w)
    this.y = props.y ?? 0.5 * (Dimentions.height - h)
    this.width = props.width ?? w
    this.height = props.height ?? h
  }
}
