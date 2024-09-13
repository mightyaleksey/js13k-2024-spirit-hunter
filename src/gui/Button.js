/* @flow */

type Props = $ReadOnly<{
  x: number,
  y: number,
  width: number,
  height: number,
}>

export class Button {
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

  render () {}

  update (dt: number) {}
}
