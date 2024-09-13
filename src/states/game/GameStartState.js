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

const title = 'Spirit Hunter'

export class GameStartState extends BaseState {
  page: number

  constructor (page?: number) {
    super()
    this.page = page ?? 0
  }

  render () {
    switch (this.page) {
      case 0: {
        setColor('#9F1D33')
        setFont(24)

        printf(
          title,
          0,
          0.5 * Dimentions.height - 32,
          null,
          'center'
        )

        setColor('#fff')
        setFont(12)
        printf(
          'Press to ENTER start',
          0,
          0.5 * Dimentions.height + 16,
          null,
          'center'
        )

        break
      }

      case 1: {
        setColor('#9F1D33')
        setFont(12)
        printf(title, 0, 4, null, 'center')

        setFont(8)
        setColor('#fff')
        ;[
          'Controls:',
          '',
          Dimentions.isMobile ? 'Use joystick to' : 'Use W,A,S,D keys to',
          'move the character'
        ].forEach((text, line) =>
          printf(text, 10, 10 * line + 30))

        break
      }
    }
  }

  update (dt: number) {
    PortraitMode.check()

    if (
      Keys.wasPressed(' ') ||
      Keys.wasPressed('Enter') ||
      Touch.wasTouched()
    ) {
      if (this.page < 1) {
        this.page++
      } else {
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
}
