/* @flow */

import { nullthrows } from './util'

export class StateMachine {
  constructor (states) {
    this.empty = {
      enter () {},
      exit () {},
      render () {},
      update () {}
    }

    this.states = states
    this.current = this.empty
  }

  change (stateName: string, input) {
    this.current.exit()
    this.current = new nullthrows(this.states[stateName])()
    this.current.enter(input)
  }

  render () {
    this.current.render()
  }

  update () {
    this.current.update()
  }
}
