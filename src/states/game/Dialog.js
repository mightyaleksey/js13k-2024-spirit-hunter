/* @flow */

import { Action } from '../../gui/Action'
import { BaseState } from '../BaseState'
import { Panel } from '../../gui/Panel'
import { Textbox } from '../../gui/Textbox'

import { emptyFunction } from '../../util'
import { gameStates } from '../../shared/game'
import { playSound } from '../../shared/sound'

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

    // $FlowIgnore[prop-missing]
    this.panel = new Panel(props)
    // $FlowIgnore[prop-missing]
    this.textbox = new Textbox(props)

    this.fn = props.handler ?? emptyFunction
  }

  render () {
    this.panel.render()
    this.textbox.render()
  }

  update (dt: number) {
    if (Action.wasPressed()) {
      playSound('pickup')

      gameStates[0].pop()
      this.fn()
    }
  }
}
