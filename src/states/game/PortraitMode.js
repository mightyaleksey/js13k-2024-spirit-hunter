/* @flow */

import { BaseState } from '../BaseState'
import { Dimentions, rect, setColor } from '../../engine'

import { gameStates, print } from '../../shared/game'

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
    let dy = 0.5 * Dimentions.height - 60
    'Please use landscape mode'.split(' ').forEach(word => {
      print(word, 8, (dy = dy + 20), null, 'left', 1.4)
    })
  }

  update (dt: number) {
    if (!checkPortrait()) {
      gameStates[0].pop()
    }
  }
}

function checkPortrait (): boolean {
  return 0.64 * Dimentions.height > Dimentions.width
}
