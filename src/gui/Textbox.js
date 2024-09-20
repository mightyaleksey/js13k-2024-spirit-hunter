/* @flow */

import type { Props as BoxProps } from './Box'

import { Box } from './Box'

import { print } from '../shared/game'
import { setColor } from '../engine'

type Props = $ReadOnly<{
  ...BoxProps,

  title: string,
  body: string | Array<string>,
  bodyColor?: string
}>

export class Textbox extends Box {
  title: string
  body: Array<string>
  bodyColor: string

  constructor (props: Props) {
    // $FlowIgnore[prop-missing]
    super(props)

    this.title = props.title
    this.body = Array.isArray(props.body) ? props.body : [props.body]
    this.bodyColor = props.bodyColor ?? '#000'
  }

  render () {
    const offsetY = 0.5 * (this.height - 10 * (this.body.length + 3))

    setColor('#9f1d33')
    print(
      this.title,
      this.x,
      this.y + offsetY,
      this.width,
      'center',
      1.4
    )

    setColor(this.bodyColor)
    this.body.forEach((text, line) =>
      print(
        text,
        this.x + 4,
        this.y + offsetY + 10 * line + 23,
        this.width - 8,
        this.body.length > 1 ? 'left' : 'center'
      ))
  }
}
