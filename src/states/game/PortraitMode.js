/* @flow */

import { BaseState } from '../BaseState'
import { Dimentions, printf, rect, setColor, setFont } from '../../engine'

import { gameStates } from '../../shared/game'

export class PortraitMode extends BaseState {
  static check () {
    if (checkPortrait()) {
      gameStates[0].push(new PortraitMode())
    }
  }

  render () {
    setColor('#322c7d')
    rect('fill', 0, 0, Dimentions.width, Dimentions.height)

    setColor('#fff')
    setFont(16)

    let dy = 0.5 * Dimentions.height - 60
    'Please use landscape mode'.split(' ').forEach(word =>
      printf(word, 8, (dy = dy + 20))
    )
  }

  update (dt: number) {
    if (!checkPortrait()) {
      gameStates[0].pop()
    }
  }
}

function checkPortrait (): boolean {
  return 0.6 * Dimentions.height > Dimentions.width
}
