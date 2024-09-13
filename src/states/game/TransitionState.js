/* @flow */

import { BaseState } from '../BaseState'
import { Dimentions, rect, setColor } from '../../engine'

import { inCubic, outCubic } from '../../shared/easing'
import { emptyFunction } from '../../util'
import { gameStates } from '../../shared/game'

const color = '#28314A'
const duration = 0.4

type Props = $ReadOnly<{
  fadeIn: boolean,
  handler?: () => void,
}>

export class TransitionState extends BaseState {
  static transitionTo (state: BaseState) {
    gameStates[0].push(new TransitionState({
      fadeIn: true,
      handler: () => {
        gameStates[0].pop()
        gameStates[0].push(state)
        gameStates[0].push(new TransitionState({ fadeIn: false }))
      }
    }))
  }

  fadeIn: boolean
  easing: (number, number, number, number) => number
  opacity: number
  timer: number

  fn: () => void

  constructor (props: Props) {
    super()

    this.fadeIn = props.fadeIn
    this.easing = props.fadeIn ? inCubic : outCubic
    this.opacity = props.fadeIn ? 0 : 1
    this.timer = 0

    this.fn = props.handler ?? emptyFunction
  }

  render () {
    setColor(color, this.opacity)
    rect('fill', 0, 0, Dimentions.width, Dimentions.height)
  }

  update (dt: number) {
    this.timer += dt
    this.opacity = this.easing(
      this.timer,
      this.fadeIn ? 0 : 1,
      this.fadeIn ? 1 : -1,
      duration
    )

    if (this.timer >= duration) {
      // remove self from stack
      gameStates[0].pop()
      this.fn()
    }
  }
}
