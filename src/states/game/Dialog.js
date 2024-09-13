/* @flow */

import { Action } from '../../gui/Action'
import { BaseState } from '../BaseState'
import { Dimentions } from '../../engine'
import { Panel } from '../../gui/Panel'
import { Textbox } from '../../gui/Textbox'

import { emptyFunction } from '../../util'

type Props = $ReadOnly<{
  x?: number,
  y?: number,
  width?: number,
  height?: number,

  title: string,
  body: string | Array<string>,

  handler?: () => void,
}>

export class Dialog extends BaseState {
  panel: Panel
  textbox: Textbox

  fn: () => void

  constructor (props: Props) {
    super()

    const w = Math.min(200, 0.6 * Dimentions.width)
    const h = Math.min(100, 0.6 * Dimentions.height)
    const t = {
      x: 0.5 * (Dimentions.width - w),
      y: 0.5 * (Dimentions.height - h),
      width: w,
      height: h,
      ...props
    }
    console.info(t)

    // $FlowIgnore[prop-missing]
    this.panel = new Panel(t)
    // $FlowIgnore[prop-missing]
    this.textbox = new Textbox(t)

    this.fn = props.handler ?? emptyFunction
  }

  render () {
    this.panel.render()
    this.textbox.render()
  }

  update (dt: number) {
    if (Action.wasPressed()) {
      this.fn()
    }
  }
}
