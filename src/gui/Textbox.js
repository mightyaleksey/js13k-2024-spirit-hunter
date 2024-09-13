/* @flow */

import { printf, setColor, setFont } from '../engine'

type Props = $ReadOnly<{
  x: number,
  y: number,
  width: number,
  height: number,

  title: string,
  body: string | Array<string>,
}>

export class Textbox {
  x: number
  y: number
  width: number
  height: number

  title: string
  body: Array<string>

  constructor (props: Props) {
    this.x = props.x
    this.y = props.y
    this.width = props.width
    this.height = props.height

    this.title = props.title
    this.body = Array.isArray(props.body) ? props.body : [props.body]
  }

  render () {
    const offsetY = 0.5 * (this.height - 10 * (this.body.length + 3))

    setColor('#9f1d33')
    setFont(12)
    printf(
      this.title,
      this.x,
      this.y + offsetY,
      this.width,
      'center'
    )

    setFont(8)
    setColor('#000')
    this.body.forEach((text, line) =>
      printf(
        text,
        this.x + 4,
        this.y + offsetY + 10 * line + 20,
        this.width - 8,
        this.body.length > 1 ? 'left' : 'center'
      ))
  }
}
