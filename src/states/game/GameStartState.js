/* @flow */

import { Action } from '../../gui/Action'
import { BaseState } from '../BaseState'
import { Dimentions, printf, setColor, setFont } from '../../engine'
import { GamePlayState } from './GamePlayState'
import { PortraitMode } from './PortraitMode'
import { Textbox } from '../../gui/Textbox'
import { TransitionState } from './TransitionState'

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
        new Textbox({
          // x: 0.2 * Dimentions.width,
          // y: 0,
          // width: 0.6 * Dimentions.width,
          // height: 0.4 * Dimentions.width,

          title,
          body: [
            'Controls:',
            '',
            Dimentions.isMobile ? 'Use joystick to' : 'Use W,A,S,D keys to',
            'move the character'
          ],
          bodyColor: '#fff'
        }).render()
        // setColor('#9F1D33')
        // setFont(12)
        // printf(title, 0, 4, null, 'center')

        // setFont(8)
        // setColor('#fff')
        // ;[
        //   'Controls:',
        //   '',
        //   Dimentions.isMobile ? 'Use joystick to' : 'Use W,A,S,D keys to',
        //   'move the character'
        // ].forEach((text, line) =>
        //   printf(text, 10, 10 * line + 30))

        break
      }
    }
  }

  update (dt: number) {
    PortraitMode.check()

    if (Action.wasPressed()) {
      if (this.page < 1) {
        this.page++
      } else {
        TransitionState.transitionTo(new GamePlayState())
        toggleMusic()
      }
    }
  }
}
