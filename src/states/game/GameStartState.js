/* @flow */

import { Action } from '../../gui/Action'
import { BaseState } from '../BaseState'
import { Dimentions, setColor } from '../../engine'
import { GamePlayState } from './GamePlayState'
import { PortraitMode } from './PortraitMode'
import { Textbox } from '../../gui/Textbox'
import { TransitionState } from './TransitionState'

import { playMusic, playSound } from '../../shared/sound'
import { print } from '../../shared/game'

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
        print(
          'Spirit Hunter',
          0,
          0.5 * Dimentions.height - 12,
          null,
          'center',
          2
        )

        setColor('#fff')
        print(
          'Press to ENTER start',
          0,
          0.5 * Dimentions.height + 6,
          null,
          'center'
        )

        break
      }

      case 1: {
        new Textbox({
          title,
          body: [
            'Controls:',
            '',
            Dimentions.isMobile ? 'Use joystick to' : 'Use W,A,S,D keys to',
            'move the character'
          ],
          bodyColor: '#fff'
        }).render()

        break
      }
    }
  }

  update (dt: number) {
    PortraitMode.check()

    if (Action.wasPressed()) {
      playSound('pickup')

      if (this.page < 1) {
        this.page++
      } else {
        TransitionState.transitionTo(new GamePlayState())
        setTimeout(playMusic, 100)
      }
    }
  }
}
