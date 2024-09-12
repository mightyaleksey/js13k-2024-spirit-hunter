/* @flow */

import { rect, setColor } from '../engine'

type Props = $ReadOnly<{
  x: number,
  y: number,
  width: number,
  height: number,
}>

export class Panel {
  x: number
  y: number
  width: number
  height: number

  constructor (props: Props) {
    this.x = props.x
    this.y = props.y
    this.width = props.width
    this.height = props.height
  }

  render () {
    setColor('rgba(255, 255, 255, 0.4)')
    rect('fill', this.x, this.y, this.width, this.height, 5)
  }
}
