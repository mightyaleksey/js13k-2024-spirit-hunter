/* @flow */

import { Action } from '../../gui/Action'
import { BaseState } from '../BaseState'
import { Dimentions, printf, setColor, setFont } from '../../engine'
import { GamePlayState } from './GamePlayState'
import { PortraitMode } from './PortraitMode'
import { Textbox } from '../../gui/Textbox'
import { TransitionState } from './TransitionState'

import { playSound, toggleMusic } from '../../shared/sound'

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
        setTimeout(toggleMusic, 100)
      }
    }
  }
}
