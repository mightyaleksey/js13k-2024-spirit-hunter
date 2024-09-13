/* @flow */

import { BaseState } from '../BaseState'
import {
  Dimentions,
  Keys,
  Touch,
  printf,
  setColor,
  setFont
} from '../../engine'
import { GamePlayState } from './GamePlayState'
import { PortraitMode } from './PortraitMode'
import { TransitionState } from './TransitionState'

import { gameStates } from '../../shared/game'
import { toggleMusic } from '../../shared/sound'

export class GameStartState extends BaseState {
  page: number

  constructor () {
    super()
    this.page = 0
  }

  render () {
    setColor('#9F1D33')
    setFont(32)

    printf(
      'Ghost Hunter',
      10,
      0.5 * Dimentions.height - 32,
      Dimentions.width - 20,
      'center'
    )

    setColor('#fff')
    setFont(16)
    printf(
      'Press to ENTER start',
      10,
      0.5 * Dimentions.height + 16,
      Dimentions.width - 20,
      'center'
    )
  }

  update (dt: number) {
    PortraitMode.check()

    if (
      Keys.wasPressed(' ') ||
      Keys.wasPressed('Enter') ||
      Touch.wasTouched()
    ) {
      gameStates[0].push(new TransitionState({
        fadeIn: true,
        handler: () => {
          gameStates[0].pop()
          gameStates[0].push(new GamePlayState())
          gameStates[0].push(new TransitionState({ fadeIn: false }))
        }
      }))

      toggleMusic()
    }
  }
}
